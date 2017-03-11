# node-key-sender

Use this lib to send keyboard events to the operational system. 

It uses a jar file (Java), so Java Run Time is required on the operational system you are running your node project.

# Main features

- Send raw keyboard key codes to the operational system;
- Send one key;
- Send multiple keys pressed one after the other;
- Send multiple keys pressed together (combination);
- Delay between keys;
- Delay for each pressed key or each combination;
- Possibility to map key codes;
- Multi platform (it will work in all operation systems that Java can run);
- It will send the key to the current focused application in the operational system.

# How it works

Each key in your keyboard is mapped with a key code. Although a physical keyboard key may have printed above its surface more than one key (for example ':' and ';'), both generate the same key code. So, do not confuse key codes with ASCII or UNICODE values, they are different things.

To make it clear, lets see an example: In american keyboard, the 16 value is the key code for Shift and the 59 value is the key code for the key ":;". So, in this scenario, to send ':' to the operational system, you should use key code 56. To send ';' you should send 16 + 56 as a combination (pressed together). 

In languages that have accents (for example: portuguese and spanish), usually more than one key must be pressed one after another to make the letter with an accent. So 'õ' is the result of sending '~' and 'o'.

While you can send the key codes as numbers, the lib also have labels mapped for most of the keys. So, for key A you may send 'a' or 65. For Shift key you may send 'shift' or 16.

It is possible to change this mapping to convert accents automatically (if you are using a keyboard that supports it). Later in this doc I show how to do that.
