

const link = `
    <style>
        .main{
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .a{
            background-color: #090580;
            padding: 2em;
            color: #fff;
            font-size: 2em;
            transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
        }
        .a:hover{
            color: #FFF4F4;
            background-color: #40128B;
        }
    </style>

    <main class="main">
        <a class="https://movies-6u2k.onrender.com/api/v1/movies" href="#" title="Go to api"><strong>Welcome to the API movies🎥🎬</strong></a>
    </main>
`;

module.exports = link;