/**================================================== CLOCK ====================================================== */

function updateClock(){
   const now = new Date();
   const hours = now.getHours().toString().padStart(2, '0');
   const minutes = now.getMinutes().toString().padStart(2, '0');
   const seconds = now.getSeconds().toString().padStart(2, '0');
   const day = now.getDate();
   const month = now.getMonth();
   const year = now.getFullYear();
   
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

   
   const timeString = `${hours}:${minutes}:${seconds}, ${day} ${months[month]} ${year}`;
   document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock, 1000)

/**===================================================================================================================== */