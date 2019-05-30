export default function Loader() {


    let count = 0;
    let count2 = 0;
    let direction = false;
    let iteration = 0;

    let timerId = 0;

    function getDirection(canvas, context) {
        if ((Math.abs(count - count2).toFixed(1)) === (2 * Math.PI).toFixed(1)) {
            count = count2;
            direction = !(iteration % 2);
            iteration++;
        }

        draw(canvas, context);
    }

    function addCount() {
        if ((Math.abs(count - count2).toFixed(1)) < (2 * Math.PI).toFixed(1) && Math.abs(count - count2).toFixed(1) > (1.5 * Math.PI).toFixed(1)
            || (Math.abs(count - count2).toFixed(1)) > 0 && Math.abs(count - count2).toFixed(1) < (0.5 * Math.PI).toFixed(1)) {
            count += 0.025;
        }
        else {
            count += 0.03;
        }
        count2 += 0.015;
    }

    function draw(canvas, context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = "#fff";
        context.lineWidth = 6;
        context.lineCap = "round";
        context.beginPath();
        context.arc(50, 50, 40, count2, count, direction);
        context.stroke();
        addCount();
    }

    function startLoader() {
        count = 0;
        count2 = 0;
        direction = false;
        iteration = 0;

        const root = document.getElementById('root');
        const loaderLayout = document.createElement('div');
        loaderLayout.id = 'loader-layout';
        root.appendChild(loaderLayout);

        let canvas = document.createElement('canvas');
        canvas.id = 'loader';
        loaderLayout.appendChild(canvas);

        let context = canvas.getContext("2d");

        const width = 100;
        const height = 100;

        canvas.width = width;
        canvas.height = height;

        timerId = setInterval(() => {
            getDirection(canvas, context)
        }, 1);
    }

    function stopLoader() {
        const loaderLayout = document.getElementById('loader-layout');
        loaderLayout.style.opacity = '0';
        loaderLayout.style.visibility = 'hidden';
        setTimeout(() => {
            clearInterval(timerId);
            timerId = 0;
            loaderLayout.remove();
        }, 1000);
    }

    return{
        start: startLoader,
        stop: stopLoader
    }
}


