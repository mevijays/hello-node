/**
 * @jest-environment jsdom
 */

describe('Greeting Form Functionality', () => {
  // Store original Date implementation
  const OriginalDate = global.Date;
  
  beforeEach(() => {
    // Reset the DOM for each test
    document.body.innerHTML = `
      <form id="greeting-form">
        <input id="name" type="text">
        <input id="dob" type="date">
        <button type="submit">Greet Me!</button>
      </form>
      <div id="greeting-message"></div>
    `;
    
    // Mock alert
    global.alert = jest.fn();
  });

  afterEach(() => {
    // Restore original Date after each test
    global.Date = OriginalDate;
  });

  // Helper function to load script into DOM
  function loadScript() {
    // Create a script element
    const script = document.createElement('script');
    // Add event listener function manually
    script.textContent = `
      document.getElementById('greeting-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const dob = new Date(document.getElementById('dob').value);
        const today = new Date();

        if (!name || isNaN(dob.getTime())) {
          alert('Please enter a valid name and date of birth.');
          return;
        }

        const ageInMilliseconds = today - dob;
        const ageDate = new Date(ageInMilliseconds);
        const years = ageDate.getUTCFullYear() - 1970;
        const months = ageDate.getUTCMonth();

        const greetingMessage = \`Hello \${name}, you are today \${years} years and \${months} months old.\`;
        document.getElementById('greeting-message').innerText = greetingMessage;
      });
    `;
    document.body.appendChild(script);
  }

  test('should show alert when name is missing', () => {
    loadScript();
    
    // Set only DOB
    document.getElementById('dob').value = '2000-01-01';
    
    // Trigger form submission
    const form = document.getElementById('greeting-form');
    const event = new Event('submit');
    event.preventDefault = jest.fn();
    form.dispatchEvent(event);
    
    // Check if alert was called
    expect(global.alert).toHaveBeenCalledWith('Please enter a valid name and date of birth.');
  });

  test('should show alert when DOB is invalid', () => {
    loadScript();
    
    // Set only name
    document.getElementById('name').value = 'John';
    document.getElementById('dob').value = '';
    
    // Trigger form submission
    const form = document.getElementById('greeting-form');
    const event = new Event('submit');
    event.preventDefault = jest.fn();
    form.dispatchEvent(event);
    
    // Check if alert was called
    expect(global.alert).toHaveBeenCalledWith('Please enter a valid name and date of birth.');
  });

  test('should display correct age message when form is submitted with valid data', () => {
    // Mock the Date constructor
    const mockDate = new Date('2025-01-01');
    global.Date = jest.fn(() => mockDate);
    
    // Make Date work like normal when given arguments
    global.Date.UTC = OriginalDate.UTC;
    global.Date.parse = OriginalDate.parse;
    global.Date.now = OriginalDate.now;
    global.Date.prototype = OriginalDate.prototype;
    
    // Allow passing strings to constructor
    const mockDateConstructor = function(...args) {
      if (args.length) {
        return new OriginalDate(...args);
      }
      return mockDate;
    };
    
    global.Date = jest.fn(mockDateConstructor);
    
    loadScript();
    
    // Set form values
    document.getElementById('name').value = 'John Doe';
    document.getElementById('dob').value = '2000-01-01';
    
    // Trigger form submission
    const form = document.getElementById('greeting-form');
    const event = new Event('submit');
    event.preventDefault = jest.fn();
    form.dispatchEvent(event);
    
    // Check greeting message
    const messageElement = document.getElementById('greeting-message');
    expect(messageElement.innerText).toBe('Hello John Doe, you are today 25 years and 0 months old.');
  });
});