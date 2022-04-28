//Use an array to hold the value of the quotes
const arrayOfQuotes = [
    {
        'author': 'Mahatma Gandhi',
        'quote': 'Live as if you were to die tomorrow. Learn as if you were to live forever.'
    },
    {
        'author': 'Marthe Troly-Curtin',
        'quote': 'Time you enjoy wasting is not wasted time.'
    },
    {
        'author': 'John Steinbeck',
        'quote': 'And now that you don\'t have to be perfect, you can be good.'
    },
    {
        'author': 'Wayne Gretzy',
        'quote': 'You miss 100% of the shots you don\'t take.'
    },
    {
        'author': 'Nelson Mandela',
        'quote': 'Resentment is like drinking poison and waiting for your enemies to die.'
    },
    {
        'author': 'Dr. Seuss',
        'quote': 'Don\'t cry because it\'s over. Smile because it happened.'
    },
    {
        'author': 'Robert Ingersoll',
        'quote': 'We rise by lifting others.'
    },
    {
        'author': 'Rumi',
        'quote': 'As you start to walk on the way, the way appears.'
    },
    {
        'author': 'Mark Twain',
        'quote': 'Challenges make life interesting, however overcoming them is what makes life meaningful.'
    },
    {
        'author': 'Steven Pressfield',
        'quote': 'Start before you\'re ready.'
    },
    {
        'author': 'Jim Thompson',
        'quote': 'Say something positive, and you\'ll see something positive.'
    },
    {
        'author': 'Thomas S. Monson',
        'quote': 'You do not find the happy life. You make it.'
    },
    {
        'author': 'George Wells',
        'quote': 'The next choice is the most important choice.'
    },
    {
        'author': 'Buckminster Fuller',
        'quote': 'There is nothing in a caterpillar that tells you it\'s going to be a butterfly.'
    },
    {
        'author': 'Oprah Winfrey',
        'quote': 'You get in life what you have the courage to ask for.'
    },
    {
        'author': 'William James',
        'quote': 'Act as if what you do makes a difference. It does.'
    },
    {
        'author': 'Theodore Roosevelt',
        'quote': 'Believe you can and you\'re halfway there.'
    },
    {
        'author': 'George Eliot',
        'quote': 'It is never too late to be what you might have been.'
    },
    {
        'author': 'Jim Rohn',
        'quote': 'Happiness is not by chance, but by choice.'
    },
    {
        'author': 'Kahlil Gibran',
        'quote': 'Walk to your goal firmly and with bold steps.'
    },
];

function generateQuote() {
    const random = Number.parseInt(Math.random() * arrayOfQuotes.length + 1);
    document.querySelector('#quoteOutput').textContent = `\"${arrayOfQuotes[random].quote}\"`;
    document.querySelector('#authorOutput').textContent = `--${arrayOfQuotes[random].author}`;

}
