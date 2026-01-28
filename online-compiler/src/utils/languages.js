/**
 * Language Configuration for Judge0 API
 * Maps language names to their Judge0 language IDs and Monaco editor modes
 */

export const LANGUAGES = [
  {
    id: 71,
    name: 'Python',
    label: 'Python (3.10)',
    monacoMode: 'python',
    defaultCode: `# Python Code
def greet(name):
    return f"Hello, {name}!"

# Take input from user
name = input()
result = greet(name)
print(result)
`,
  },
  {
    id: 50,
    name: 'C',
    label: 'C (GCC 9.2.0)',
    monacoMode: 'c',
    defaultCode: `// C Code
#include <stdio.h>

int main() {
    char name[100];
    
    // Take input from user
    scanf("%s", name);
    printf("Hello, %s!\\n", name);
    
    return 0;
}
`,
  },
  {
    id: 54,
    name: 'C++',
    label: 'C++ (GCC 9.2.0)',
    monacoMode: 'cpp',
    defaultCode: `// C++ Code
#include <iostream>
#include <string>
using namespace std;

int main() {
    string name;
    
    // Take input from user
    cin >> name;
    cout << "Hello, " << name << "!" << endl;
    
    return 0;
}
`,
  },
  {
    id: 62,
    name: 'Java',
    label: 'Java (OpenJDK 13.0.1)',
    monacoMode: 'java',
    defaultCode: `// Java Code
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Take input from user
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
        
        scanner.close();
    }
}
`,
  },
  {
    id: 63,
    name: 'JavaScript',
    label: 'JavaScript (Node.js 12.14.0)',
    monacoMode: 'javascript',
    defaultCode: `// JavaScript Code
// Note: For input, use the stdin input box below

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (name) => {
  console.log(\`Hello, \${name}!\`);
  rl.close();
});
`,
  },
];

/**
 * Get language configuration by ID
 */
export const getLanguageById = (id) => {
  return LANGUAGES.find((lang) => lang.id === id);
};

/**
 * Get language configuration by name
 */
export const getLanguageByName = (name) => {
  return LANGUAGES.find((lang) => lang.name === name);
};