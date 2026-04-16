// ============================================
// LIBRARY - BetterScripts Debug Console
// ============================================
// A comprehensive debug tool for testing BetterScripts.
// Use : commands in Do actions to control widgets.
//
// WIDGET COMMANDS (all 9 types):
//   :stat <id> <label> <val> [color] [order]
//   :bar <id> <val> <max> [label] [color] [order]
//   :badge <id> <text> [icon] [color] [variant]
//   :counter <id> <val> [delta] [icon] [color]
//   :text <id> <msg> [color]
//   :icon <id> <emoji> [tooltip] [color]
//   :panel <id> <title>
//   :list <id> <title>
//   :custom <id> <html>
//
// PROTOCOL COMMANDS:
//   :help              - Show all commands
//   :ping              - Test connection
//   :register          - Register a test script
//   :clear             - Remove all widgets
//   :update <id> <prop> <val>
//   :destroy <id>
//
// TESTING COMMANDS:
//   :demo              - Show all 9 widget types
//   :stress <count>    - Stress test with N widgets
//   :test              - Start sequential test suite (1 step/turn)
//   :test skip         - Skip current test step
//   :test stop         - Stop running test suite
//
// All widgets appear in the top bar

state.bd = state.bd ?? {
  lastCommand: null,
  lastResult: null,
  testRunning: false,
  testStep: 0,
  testResults: []
};

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

// All helpers: create, destroy, clearAll, ping, register
function bdMsg(m) { return `[[BD:\${JSON.stringify(m)}:BD]]`; }
function bdWidget(id, cfg) { return bdMsg({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }
function bdDestroy(id) { return bdMsg({ type: 'widget', widgetId: id, action: 'destroy' }); }
function bdClearAll() { return bdMsg({ type: 'clearAll' }); }
function bdPing(data) { return bdMsg({ type: 'ping', timestamp: Date.now(), data: data || 'debug' }); }
function bdRegister(id, name, ver) { return bdMsg({ type: 'register', scriptId: id, scriptName: name, version: ver || '1.0', capabilities: ['widgets'] }); }

// ============================================
// COMMAND PARSER
// ============================================

function parseCommand(input) {
  // Match : commands - handle quoted strings
  const match = input.match(/^:([\w-]+)(?:\s+(.*))?$/);
  if (!match) return null;
  
  const command = match[1].toLowerCase();
  const argsStr = match[2] || '';
  
  // Parse arguments (support quoted strings)
  const args = [];
  const regex = /"([^"]+)"|'([^']+)'|(\S+)/g;
  let m;
  while ((m = regex.exec(argsStr)) !== null) {
    args.push(m[1] || m[2] || m[3]);
  }
  
  return { command, args, raw: argsStr };
}

// ============================================
// SEQUENTIAL TEST SUITE
// ============================================
// Each step returns { name, output, widgets }
// Steps run one per turn when :test is active

const TEST_STEPS = [
  // --- Step 0: Register script ---
  {
    name: 'Register Script',
    run: () => {
      const widgets = bdRegister('debug-console', 'Debug Console', '2.0');
      return { output: '📝 Registering test script...', widgets };
    }
  },
  // --- Step 1: Ping ---
  {
    name: 'Ping',
    run: () => {
      const widgets = bdPing('test-suite');
      return { output: '🏓 Sending ping...', widgets };
    }
  },
  // --- Step 2: Stat widget ---
  {
    name: 'Create Stat Widget',
    run: () => {
      const widgets = bdWidget('test-stat', {
        type: 'stat', label: 'Gold', value: '1,250',
        color: '#fbbf24', align: 'right', order: 1
      });
      return { output: '📊 Creating stat widget (Gold)...', widgets };
    }
  },
  // --- Step 3: Bar widget ---
  {
    name: 'Create Bar Widget',
    run: () => {
      const widgets = bdWidget('test-bar', {
        type: 'bar', label: 'HP', value: 75, max: 100,
        color: '#22c55e', showValue: true, align: 'center', order: 1
      });
      return { output: '📈 Creating bar widget (HP 75/100)...', widgets };
    }
  },
  // --- Step 4: Badge widget (subtle) ---
  {
    name: 'Create Badge Widget',
    run: () => {
      const widgets = bdWidget('test-badge', {
        type: 'badge', text: 'Poisoned', icon: '☠️',
        color: '#a855f7', variant: 'subtle', align: 'center', order: 2
      });
      return { output: '🏷️ Creating badge widget (Poisoned)...', widgets };
    }
  },
  // --- Step 5: Counter widget ---
  {
    name: 'Create Counter Widget',
    run: () => {
      const widgets = bdWidget('test-counter', {
        type: 'counter', icon: '⚔️', value: 24, delta: 3,
        color: '#60a5fa', align: 'center', order: 3
      });
      return { output: '🔢 Creating counter widget (24, +3)...', widgets };
    }
  },
  // --- Step 6: Text widget ---
  {
    name: 'Create Text Widget',
    run: () => {
      const widgets = bdWidget('test-text', {
        type: 'text', text: '⚡ Quest Active',
        style: { color: '#fbbf24', fontWeight: 'bold' },
        align: 'center', order: 4
      });
      return { output: '💬 Creating text widget...', widgets };
    }
  },
  // --- Step 7: Icon widget ---
  {
    name: 'Create Icon Widget',
    run: () => {
      const widgets = bdWidget('test-icon', {
        type: 'icon', icon: '❤️', color: '#ef4444',
        tooltip: 'Health Status', align: 'center', order: 5
      });
      return { output: '🎯 Creating icon widget (❤️)...', widgets };
    }
  },
  // --- Step 8: Panel widget ---
  {
    name: 'Create Panel Widget',
    run: () => {
      const widgets = bdWidget('test-panel', {
        type: 'panel', title: 'Character', align: 'left', order: 1,
        items: [
          { label: 'Level', value: '12', color: '#a855f7' },
          { label: 'Class', value: 'Warrior', color: '#60a5fa' },
          { label: 'XP', value: '4500/5000', color: '#22c55e' }
        ]
      });
      return { output: '📋 Creating panel widget (Character)...', widgets };
    }
  },
  // --- Step 9: List widget ---
  {
    name: 'Create List Widget',
    run: () => {
      const widgets = bdWidget('test-list', {
        type: 'list', title: 'Inventory', align: 'right', order: 2,
        items: [
          { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
          { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
          { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' },
          'Health Potion'
        ]
      });
      return { output: '📝 Creating list widget (Inventory)...', widgets };
    }
  },
  // --- Step 10: Custom HTML widget ---
  {
    name: 'Create Custom Widget',
    run: () => {
      const widgets = bdWidget('test-custom', {
        type: 'custom', align: 'center', order: 6,
        html: '<div style="display:flex;gap:6px;align-items:center;"><strong style="color:#f472b6;">Custom</strong><span style="color:#94a3b8;">HTML Widget</span></div>'
      });
      return { output: '🎨 Creating custom HTML widget...', widgets };
    }
  },
  // --- Step 11: Update stat value ---
  {
    name: 'Update Stat Value',
    run: () => {
      const widgets = bdWidget('test-stat', {
        type: 'stat', label: 'Gold', value: '2,500',
        color: '#fbbf24', align: 'right', order: 1
      });
      return { output: '✏️ Updating stat widget (Gold → 2,500)...', widgets };
    }
  },
  // --- Step 12: Update bar value ---
  {
    name: 'Update Bar Value',
    run: () => {
      const widgets = bdWidget('test-bar', {
        type: 'bar', label: 'HP', value: 30, max: 100,
        color: '#ef4444', showValue: true, align: 'center', order: 1
      });
      return { output: '✏️ Updating bar widget (HP → 30/100, red)...', widgets };
    }
  },
  // --- Step 13: Update badge variant ---
  {
    name: 'Update Badge Variant',
    run: () => {
      const widgets = bdWidget('test-badge', {
        type: 'badge', text: 'Shielded', icon: '🛡️',
        color: '#3b82f6', variant: 'solid', align: 'center', order: 2
      });
      return { output: '✏️ Updating badge (Poisoned → Shielded, solid)...', widgets };
    }
  },
  // --- Step 14: Update counter delta ---
  {
    name: 'Update Counter Delta',
    run: () => {
      const widgets = bdWidget('test-counter', {
        type: 'counter', icon: '💔', value: 18, delta: -6,
        color: '#f472b6', align: 'center', order: 3
      });
      return { output: '✏️ Updating counter (24 → 18, delta -6)...', widgets };
    }
  },
  // --- Step 15: Update panel items ---
  {
    name: 'Update Panel Items',
    run: () => {
      const widgets = bdWidget('test-panel', {
        type: 'panel', title: 'Character (Updated)', align: 'left', order: 1,
        items: [
          { label: 'Level', value: '13', color: '#a855f7' },
          { label: 'Class', value: 'Knight', color: '#fbbf24' },
          { label: 'XP', value: '500/6000', color: '#22c55e' },
          { label: 'STR', value: '18', color: '#ef4444' }
        ]
      });
      return { output: '✏️ Updating panel (new items, title)...', widgets };
    }
  },
  // --- Step 16: Test alignment zones ---
  {
    name: 'Test Alignment Zones',
    run: () => {
      let widgets = '';
      widgets += bdWidget('zone-left', {
        type: 'stat', label: 'Left', value: '←',
        color: '#3b82f6', align: 'left', order: 10
      });
      widgets += bdWidget('zone-center', {
        type: 'stat', label: 'Center', value: '●',
        color: '#22c55e', align: 'center', order: 10
      });
      widgets += bdWidget('zone-right', {
        type: 'stat', label: 'Right', value: '→',
        color: '#a855f7', align: 'right', order: 10
      });
      return { output: '↔️ Testing alignment zones (left/center/right)...', widgets };
    }
  },
  // --- Step 17: Test ordering within zone ---
  {
    name: 'Test Widget Ordering',
    run: () => {
      let widgets = '';
      widgets += bdWidget('order-c', {
        type: 'badge', text: 'Third (order:3)', color: '#ef4444',
        variant: 'outline', align: 'center', order: 13
      });
      widgets += bdWidget('order-a', {
        type: 'badge', text: 'First (order:1)', color: '#22c55e',
        variant: 'outline', align: 'center', order: 11
      });
      widgets += bdWidget('order-b', {
        type: 'badge', text: 'Second (order:2)', color: '#3b82f6',
        variant: 'outline', align: 'center', order: 12
      });
      return { output: '🔢 Testing widget ordering (should appear 1,2,3)...', widgets };
    }
  },
  // --- Step 18: Destroy individual widgets ---
  {
    name: 'Destroy Individual Widgets',
    run: () => {
      let widgets = '';
      widgets += bdDestroy('test-text');
      widgets += bdDestroy('test-icon');
      widgets += bdDestroy('test-custom');
      widgets += bdDestroy('zone-left');
      widgets += bdDestroy('zone-center');
      widgets += bdDestroy('zone-right');
      widgets += bdDestroy('order-a');
      widgets += bdDestroy('order-b');
      widgets += bdDestroy('order-c');
      return { output: '🗑️ Destroying text, icon, custom, zone, and order widgets...', widgets };
    }
  },
  // --- Step 19: Clear all ---
  {
    name: 'Clear All Widgets',
    run: () => {
      const widgets = bdClearAll();
      return { output: '🧹 Clearing ALL remaining widgets...', widgets };
    }
  },
  // --- Step 20: Final summary ---
  {
    name: 'Test Complete',
    run: () => {
      const total = TEST_STEPS.length;
      const passed = state.bd.testResults.filter(r => r === 'pass').length;
      let summary = '\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      summary += '🏁 TEST SUITE COMPLETE\n';
      summary += `   Steps run: \${total}\n`;
      summary += `   All steps executed successfully.\n`;
      summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      summary += '\nCheck browser console (F12) for detailed BetterScripts logs.';
      state.bd.testRunning = false;
      state.bd.testStep = 0;
      state.bd.testResults = [];
      return { output: summary, widgets: '' };
    }
  }
];

// Run the current test step and advance
function runTestStep() {
  if (!state.bd.testRunning) return null;
  
  const stepIndex = state.bd.testStep;
  if (stepIndex >= TEST_STEPS.length) {
    state.bd.testRunning = false;
    return null;
  }
  
  const step = TEST_STEPS[stepIndex];
  const result = step.run();
  
  // Record result and advance
  state.bd.testResults.push('pass');
  state.bd.testStep = stepIndex + 1;
  
  const progress = `[\${stepIndex + 1}/\${TEST_STEPS.length}]`;
  const output = `\n🧪 \${progress} \${step.name}\n\${result.output}`;
  
  // Show next step preview if not the last step
  let nextHint = '';
  if (stepIndex + 1 < TEST_STEPS.length) {
    nextHint = `\n\n⏭️ Next: \${TEST_STEPS[stepIndex + 1].name} (continue story to proceed)`;
  }
  
  return { output: output + nextHint, widgets: result.widgets };
}

// ============================================
// COMMAND HANDLERS
// ============================================

const COMMANDS = {
  help: {
    desc: 'Show all available commands',
    usage: ':help',
    handler: () => {
      let helpText = '\n📖 **BetterScripts Debug Console**\n';
      helpText += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      helpText += '\n🔧 WIDGET COMMANDS (all 9 types):\n';
      for (const name of ['stat','bar','badge','counter','text','icon','panel','list','custom']) {
        const cmd = COMMANDS[name];
        helpText += `  \${cmd.usage}\n`;
      }
      helpText += '\n📡 PROTOCOL COMMANDS:\n';
      for (const name of ['ping','register','update','destroy','clear']) {
        const cmd = COMMANDS[name];
        helpText += `  \${cmd.usage} - \${cmd.desc}\n`;
      }
      helpText += '\n🧪 TESTING COMMANDS:\n';
      for (const name of ['demo','stress','test']) {
        const cmd = COMMANDS[name];
        helpText += `  \${cmd.usage} - \${cmd.desc}\n`;
      }
      return { output: helpText, widgets: '' };
    }
  },
  
  ping: {
    desc: 'Test BetterScripts connection',
    usage: ':ping',
    handler: () => {
      const widgets = bdPing();
      return { 
        output: '\n🏓 Ping sent! Check browser console for pong event.', 
        widgets 
      };
    }
  },
  
  register: {
    desc: 'Register a test script',
    usage: ':register [scriptId] [name] [version]',
    handler: (args) => {
      const id = args[0] || 'debug-console';
      const name = args[1] || 'Debug Console';
      const ver = args[2] || '2.0';
      const widgets = bdRegister(id, name, ver);
      return { 
        output: `\n📝 Registered script "\${name}" (id: \${id}, v\${ver}). Check console.`, 
        widgets 
      };
    }
  },
  
  clear: {
    desc: 'Remove all widgets',
    usage: ':clear',
    handler: () => {
      const widgets = bdClearAll();
      state.bd.lastResult = 'Cleared all widgets';
      return { output: '\n🧹 All widgets cleared.', widgets };
    }
  },
  
  stat: {
    desc: 'Create a stat widget',
    usage: ':stat <id> <label> <value> [color] [order]',
    handler: (args) => {
      const id = args[0] || 'test-stat';
      const label = args[1] || 'Test';
      const value = args[2] || '42';
      const color = args[3] || '#60a5fa';
      const order = args[4] ? parseInt(args[4]) : undefined;
      
      const config = {
        type: 'stat', label: label, value: value,
        color: color, align: 'center'
      };
      if (order !== undefined) config.order = order;
      
      const widgets = bdWidget(id, config);
      return { 
        output: `\n📊 Created stat "\${id}": \${label} = \${value}`, 
        widgets 
      };
    }
  },
  
  bar: {
    desc: 'Create a bar widget',
    usage: ':bar <id> <value> <max> [label] [color] [order]',
    handler: (args) => {
      const id = args[0] || 'test-bar';
      const value = parseInt(args[1]) || 75;
      const max = parseInt(args[2]) || 100;
      const label = args[3] || 'Progress';
      const color = args[4] || '#22c55e';
      const order = args[5] ? parseInt(args[5]) : undefined;
      
      const config = {
        type: 'bar', label: label, value: value, max: max,
        color: color, showValue: true, align: 'center'
      };
      if (order !== undefined) config.order = order;
      
      const widgets = bdWidget(id, config);
      return { 
        output: `\n📈 Created bar "\${id}": \${label} \${value}/\${max}`, 
        widgets 
      };
    }
  },
  
  badge: {
    desc: 'Create a badge widget',
    usage: ':badge <id> <text> [icon] [color] [variant]',
    handler: (args) => {
      const id = args[0] || 'test-badge';
      const text = args[1] || 'Status';
      const icon = args[2] || '';
      const color = args[3] || '#a855f7';
      const variant = args[4] || 'subtle';
      
      const config = {
        type: 'badge', text: text, color: color,
        variant: variant, align: 'center'
      };
      if (icon) config.icon = icon;
      
      const widgets = bdWidget(id, config);
      return { 
        output: `\n🏷️ Created badge "\${id}": \${icon ? icon + ' ' : ''}\${text} (\${variant})`, 
        widgets 
      };
    }
  },
  
  counter: {
    desc: 'Create a counter widget',
    usage: ':counter <id> <value> [delta] [icon] [color]',
    handler: (args) => {
      const id = args[0] || 'test-counter';
      const value = parseInt(args[1]) || 0;
      const delta = args[2] ? parseInt(args[2]) : 0;
      const icon = args[3] || '';
      const color = args[4] || '#60a5fa';
      
      const config = {
        type: 'counter', value: value, delta: delta,
        color: color, align: 'center'
      };
      if (icon) config.icon = icon;
      
      const widgets = bdWidget(id, config);
      const deltaStr = delta !== 0 ? ` (\${delta > 0 ? '+' : ''}\${delta})` : '';
      return { 
        output: `\n🔢 Created counter "\${id}": \${value}\${deltaStr}`, 
        widgets 
      };
    }
  },
  
  text: {
    desc: 'Create a text widget',
    usage: ':text <id> <message> [color]',
    handler: (args) => {
      const id = args[0] || 'test-text';
      const message = args[1] || 'Hello BetterScripts!';
      const color = args[2] || '#fbbf24';
      
      const widgets = bdWidget(id, {
        type: 'text', text: message,
        style: { color: color, fontWeight: 'bold' },
        align: 'center'
      });
      return { 
        output: `\n💬 Created text "\${id}": "\${message}"`, 
        widgets 
      };
    }
  },
  
  icon: {
    desc: 'Create an icon widget',
    usage: ':icon <id> <emoji> [tooltip] [color]',
    handler: (args) => {
      const id = args[0] || 'test-icon';
      const emoji = args[1] || '❤️';
      const tooltip = args[2] || '';
      const color = args[3] || '#ef4444';
      
      const config = {
        type: 'icon', icon: emoji, color: color, align: 'center'
      };
      if (tooltip) config.tooltip = tooltip;
      
      const widgets = bdWidget(id, config);
      return { 
        output: `\n🎯 Created icon "\${id}": \${emoji}\${tooltip ? ' (' + tooltip + ')' : ''}`, 
        widgets 
      };
    }
  },
  
  panel: {
    desc: 'Create a panel widget with sample items',
    usage: ':panel <id> <title>',
    handler: (args) => {
      const id = args[0] || 'test-panel';
      const title = args[1] || 'Test Panel';
      
      const widgets = bdWidget(id, {
        type: 'panel', title: title, align: 'center',
        items: [
          { label: 'Item 1', value: 'Value A', color: '#60a5fa' },
          { label: 'Item 2', value: 'Value B', color: '#22c55e' },
          { label: 'Item 3', value: 'Value C', color: '#fbbf24' }
        ]
      });
      return { 
        output: `\n📋 Created panel "\${id}": "\${title}"`, 
        widgets 
      };
    }
  },
  
  list: {
    desc: 'Create a list widget with sample items',
    usage: ':list <id> <title>',
    handler: (args) => {
      const id = args[0] || 'test-list';
      const title = args[1] || 'Test List';
      
      const widgets = bdWidget(id, {
        type: 'list', title: title, align: 'center',
        items: [
          { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
          { icon: '🛡️', text: 'Wooden Shield', color: '#22c55e' },
          'Health Potion'
        ]
      });
      return { 
        output: `\n📝 Created list "\${id}": "\${title}"`, 
        widgets 
      };
    }
  },
  
  custom: {
    desc: 'Create a custom HTML widget',
    usage: ':custom <id> <html>',
    handler: (args) => {
      const id = args[0] || 'test-custom';
      const html = args[1] || '<div style="display:flex;gap:6px;align-items:center;"><strong style="color:#f472b6;">Custom</strong> <span style="color:#94a3b8;">HTML Widget</span></div>';
      
      const widgets = bdWidget(id, {
        type: 'custom', html: html, align: 'center'
      });
      return { 
        output: `\n🎨 Created custom widget "\${id}"`, 
        widgets 
      };
    }
  },
  
  update: {
    desc: 'Update a widget property',
    usage: ':update <id> <property> <value>',
    handler: (args) => {
      const id = args[0];
      const prop = args[1];
      const value = args[2];
      
      if (!id || !prop) {
        return { output: '\n❌ Usage: :update <id> <property> <value>', widgets: '' };
      }
      
      // Parse value (handle numbers)
      let parsedValue = value;
      if (!isNaN(value) && value !== '') {
        parsedValue = parseFloat(value);
      }
      
      const config = {};
      config[prop] = parsedValue;
      
      const widgets = bdMsg({ type: 'widget', widgetId: id, action: 'update', config });
      return { 
        output: `\n✏️ Updated "\${id}".\${prop} = \${parsedValue}`, 
        widgets 
      };
    }
  },
  
  destroy: {
    desc: 'Destroy a specific widget',
    usage: ':destroy <id>',
    handler: (args) => {
      const id = args[0];
      if (!id) {
        return { output: '\n❌ Usage: :destroy <id>', widgets: '' };
      }
      
      const widgets = bdDestroy(id);
      return { output: `\n🗑️ Destroyed widget "\${id}"`, widgets };
    }
  },
  
  demo: {
    desc: 'Show all 9 widget types at once',
    usage: ':demo',
    handler: () => {
      let widgets = '';
      
      // === CENTER ZONE: Core HUD ===
      
      // Bar: HP (order 1)
      widgets += bdWidget('demo-hp', {
        type: 'bar', label: 'HP', value: 75, max: 100,
        color: '#ef4444', showValue: true, align: 'center', order: 1
      });
      
      // Bar: MP (order 2)
      widgets += bdWidget('demo-mp', {
        type: 'bar', label: 'MP', value: 50, max: 80,
        color: '#3b82f6', showValue: true, align: 'center', order: 2
      });
      
      // Badge: Poisoned (order 3)
      widgets += bdWidget('demo-badge', {
        type: 'badge', text: 'Poisoned', icon: '☠️',
        color: '#a855f7', variant: 'subtle', align: 'center', order: 3
      });
      
      // Counter: Kills (order 4)
      widgets += bdWidget('demo-counter', {
        type: 'counter', icon: '⚔️', value: 24, delta: 3,
        color: '#60a5fa', align: 'center', order: 4
      });
      
      // Text: Quest (order 5)
      widgets += bdWidget('demo-status', {
        type: 'text', text: '⚡ Quest Active',
        style: { color: '#fbbf24', fontWeight: 'bold' },
        align: 'center', order: 5
      });
      
      // Icon: Night indicator (order 6)
      widgets += bdWidget('demo-icon', {
        type: 'icon', icon: '🌙', color: '#94a3b8',
        tooltip: 'Night Time', align: 'center', order: 6
      });
      
      // Custom HTML (order 7)
      widgets += bdWidget('demo-custom', {
        type: 'custom', align: 'center', order: 7,
        html: '<div style="display:flex;gap:4px;align-items:center;"><strong style="color:#f472b6;">LVL</strong><span style="color:#e2e8f0;">12</span></div>'
      });
      
      // === LEFT ZONE: Character Panel ===
      
      widgets += bdWidget('demo-panel', {
        type: 'panel', title: 'Character', align: 'left', order: 1,
        items: [
          { label: 'Class', value: 'Warrior', color: '#60a5fa' },
          { label: 'XP', value: '4500/5000', color: '#22c55e' }
        ]
      });
      
      // === RIGHT ZONE: Inventory + Gold ===
      
      // Stat: Gold (order 1)
      widgets += bdWidget('demo-gold', {
        type: 'stat', label: 'Gold', value: '1,250',
        color: '#fbbf24', align: 'right', order: 1
      });
      
      // List: Inventory (order 2)
      widgets += bdWidget('demo-list', {
        type: 'list', title: 'Inventory', align: 'right', order: 2,
        items: [
          { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
          { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
          { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' }
        ]
      });
      
      return { 
        output: '\n🎮 Demo: All 9 widget types created!\n  Center: bar, badge, counter, text, icon, custom\n  Left: panel\n  Right: stat, list', 
        widgets 
      };
    }
  },
  
  stress: {
    desc: 'Stress test with N widgets',
    usage: ':stress <count>',
    handler: (args) => {
      const count = Math.min(parseInt(args[0]) || 10, 50);
      let widgets = '';
      
      for (let i = 0; i < count; i++) {
        widgets += bdWidget('stress-' + i, {
          type: 'stat',
          label: 'W' + i,
          value: Math.floor(Math.random() * 100),
          color: `hsl(\${(i * 360 / count)}, 70%, 60%)`,
          align: 'center', order: i
        });
      }
      
      return { 
        output: `\n🔥 Created \${count} stress test widgets`, 
        widgets 
      };
    }
  },
  
  test: {
    desc: 'Run sequential test suite (1 step/turn)',
    usage: ':test [skip|stop]',
    handler: (args) => {
      const subcommand = (args[0] || '').toLowerCase();
      
      // :test stop - abort running test
      if (subcommand === 'stop') {
        if (!state.bd.testRunning) {
          return { output: '\n❌ No test suite is running.', widgets: '' };
        }
        const step = state.bd.testStep;
        state.bd.testRunning = false;
        state.bd.testStep = 0;
        state.bd.testResults = [];
        const widgets = bdClearAll();
        return { output: `\n🛑 Test suite stopped at step \${step}/\${TEST_STEPS.length}. Widgets cleared.`, widgets };
      }
      
      // :test skip - skip current step
      if (subcommand === 'skip') {
        if (!state.bd.testRunning) {
          return { output: '\n❌ No test suite is running.', widgets: '' };
        }
        const skippedName = TEST_STEPS[state.bd.testStep]?.name || '?';
        state.bd.testResults.push('skip');
        state.bd.testStep += 1;
        if (state.bd.testStep >= TEST_STEPS.length) {
          state.bd.testRunning = false;
          return { output: `\n⏭️ Skipped "\${skippedName}". Suite complete.`, widgets: '' };
        }
        const nextName = TEST_STEPS[state.bd.testStep].name;
        return { output: `\n⏭️ Skipped "\${skippedName}". Next: \${nextName}`, widgets: '' };
      }
      
      // :test - start a new test suite
      if (state.bd.testRunning) {
        return { output: `\n⚠️ Test already running (step \${state.bd.testStep + 1}/\${TEST_STEPS.length}). Use :test stop to abort.`, widgets: '' };
      }
      
      state.bd.testRunning = true;
      state.bd.testStep = 0;
      state.bd.testResults = [];
      
      // Clear any existing widgets before starting
      let widgets = bdClearAll();
      
      let output = '\n🧪 **BetterScripts Test Suite Started**\n';
      output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      output += `Total steps: \${TEST_STEPS.length}\n`;
      output += 'Each turn runs the next test step.\n';
      output += 'Commands: :test skip | :test stop\n';
      output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
      output += `\n⏭️ Next: \${TEST_STEPS[0].name} (continue story to begin)`;
      
      return { output, widgets };
    }
  }
};

// ============================================
// EXECUTE COMMAND
// ============================================

function executeCommand(input) {
  const parsed = parseCommand(input);
  if (!parsed) return null;
  
  const handler = COMMANDS[parsed.command];
  if (!handler) {
    return { 
      output: `\n❌ Unknown command: "\${parsed.command}". Type :help for commands.`,
      widgets: ''
    };
  }
  
  state.bd.lastCommand = parsed;
  const result = handler.handler(parsed.args);
  state.bd.lastResult = result.output;
  return result;
}