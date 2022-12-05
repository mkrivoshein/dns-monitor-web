export default {
    plugins: [],
    theme: {
        extend: {},
        colors: {
            'white': '#ffffff',
            'red' : {
                0: '#fdecea',
                100: '#fcd9d6',
                200: '#fbc6c2',
                300: '#fab3ae',
                400: '#f9a19a',
                500: '#f88e86',
                600: '#f77b72',
                700: '#f6685e',
                800: '#f5554a',
                900: '#f44336',
            },
            'blueGray': {
                0: '#f0f2f3',
                100: '#e2e5e8',
                200: '#d4d8dd',
                300: '#c5ccd2',
                400: '#b7bfc7',
                500: '#a9b2bc',
                600: '#9aa6b1',
                700: '#8c99a6',
                800: '#7e8c9b',
                900: '#708090',
            },
            'blue':{
                400: '#0D5AAA',
                500: '#09417B',

            },
            'gray':{
           500: '#6B7280',
            }   
        }
        },
    
    content: ["./index.html", "./src/**/*.{svelte,js,ts}"], // for unused CSS
    variants: {
        extend: {},
    },
    darkMode: 'media', // or 'media' or 'class'
}