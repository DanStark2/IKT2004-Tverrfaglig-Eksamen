// Enkel frontend-logikk: ping backend og vis respons
document.addEventListener('DOMContentLoaded', function(){
  const btn = document.getElementById('pingBtn');
  const out = document.getElementById('output');
  btn.addEventListener('click', async ()=>{
    out.textContent = 'Sender forespørsel...';
    try{
      const res = await fetch('/api/ping');
      const data = await res.json();
      out.textContent = JSON.stringify(data, null, 2);
    }catch(err){
      out.textContent = 'Feil: ' + err.message;
    }
  });
});

// Tips: Bytt URL til backend om du kjører frontend separat (f.eks. http://localhost:3000/api/ping)