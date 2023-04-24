var score = 0, circles=[], colors = ["#E9967A","#90EE90","#BA55D3","#8B0000"];
var canvas = document.getElementById('canvas');
var paint = canvas.getContext('2d');

canvas.height = window.innerHeight-17;
canvas.width = window.innerWidth-17;

function MoveCircle(crcl)
{
    paint.beginPath();
    paint.fillStyle=crcl.Color;
    paint.arc(crcl.X, crcl.Y, 30, 0, Math.PI*2);
    paint.fill();
}

function SpawnCircle(index)
{
    circles[index] = {
        X: 50 + Math.random() * (canvas.width - 100), 
        Y: -10 + Math.random() * 10, 
        Color: getRandomColor()
    };
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function Update()
{
    paint.clearRect(0, 0, canvas.width, canvas.height);
    paint.fillRect(0, canvas.height-5, canvas.width, 5);
    document.getElementById("Count").textContent = "Score: " + score;
    var index = circles.length;

    if (Math.random() * 50 < 1) {
        SpawnCircle(index)
    }

    for(var i = 0; i < circles.length; i++)
    {
        if(++circles[i].Y < innerHeight - 100)
        {       
            MoveCircle(circles[i]);
        }
        else
        {
            window.location.href='index.html'
        }
    }
    window.requestAnimationFrame(Update);
}

canvas.addEventListener("mousedown",(click)=>
{
    circles.forEach(cir => 
    {
        let rect = canvas.getBoundingClientRect();
        let x = click.clientX - rect.left;
        let y = click.clientY - rect.top;
        let result = Math.sqrt(((x - cir.X) ** 2) + ((y - cir.Y) ** 2));

        if (result <= 30) 
        {
            score ++;
            circles.splice(circles.indexOf(cir), 1);
        }    
    });
});

Update(true);