// ⚡ Canvas البرق الثابت
const canvas = document.getElementById('lightningCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max){ return Math.random() * (max - min) + min; }

function drawLightning(x1, y1, x2, y2, displace, branch){
    if(displace < 2){
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = branch ? 2 : 3;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 20;
        ctx.stroke();
        return;
    }
    let mid_x = (x1 + x2) / 2 + (random(-1,1) * displace);
    let mid_y = (y1 + y2) / 2 + (random(-1,1) * displace);
    drawLightning(x1, y1, mid_x, mid_y, displace / 2, branch);
    drawLightning(mid_x, mid_y, x2, y2, displace / 2, branch);
}

function generateStaticLightning(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let strikes = 40; // كثافة عالية جدا
    for(let s=0; s<strikes; s++){
        let startX = random(50, canvas.width - 50);
        let startY = 0;
        let endX = startX + random(-150,150);
        let endY = canvas.height;
        drawLightning(startX, startY, endX, endY, 140, false);

        for(let i=0; i<6; i++){
            let branchX = startX + random(-100,100);
            let branchY = canvas.height * random(0.2,0.8);
            drawLightning(branchX, 0, branchX + random(-80,80), branchY, 70, true);
        }
    }
}
generateStaticLightning();

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    generateStaticLightning();
});

// فتح لوحات DX
function openPanel(type){
    const overlay = document.getElementById("overlay");
    const title = document.getElementById("panel-title");
    const content = document.getElementById("panel-content");

    overlay.style.display = "flex";
    overlay.style.opacity = 0;
    overlay.style.transform = "scale(0.8)";
    setTimeout(() => {
        overlay.style.transition = "all 0.3s ease";
        overlay.style.opacity = 1;
        overlay.style.transform = "scale(1)";
    }, 10);

    if(type === 'owners'){
        title.innerText = "أصحاب السيرفر";
        content.innerHTML = `<span style="color: gold; text-shadow:0 0 12px gold;">Lionardo<br>Gomz<br>Yuri</span>`;
    }
    if(type === 'devs'){
        title.innerText = "المبرمجين";
        content.innerHTML = `<span style="color: darkred; text-shadow:0 0 12px red;">NexT<br>7 RB</span>`;
    }
    if(type === 'members'){
        title.innerText = "عدد الأعضاء";
        content.innerHTML = `<span style="color: white; text-shadow:0 0 12px white;">366 عضو</span>`;
    }
}

function closePanel(){
    const overlay = document.getElementById("overlay");
    overlay.style.transition = "all 0.3s ease";
    overlay.style.opacity = 0;
    overlay.style.transform = "scale(0.8)";
    setTimeout(()=> overlay.style.display = "none", 300);
}

// ===== القصة: زر السهم =====
let currentStoryIndex = 0;
const storySections = document.querySelectorAll('.story-section');
storySections.forEach((s,i)=>{ if(i!==0) s.style.display='none'; });

function nextStory(){
    storySections[currentStoryIndex].style.display='none';
    currentStoryIndex++;
    if(currentStoryIndex >= storySections.length) currentStoryIndex = 0;
    storySections[currentStoryIndex].style.display='block';
}
