document.addEventListener('DOMContentLoaded', (event) => {
    let modal = null;

    const openModal = function(e) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute("href"));
        if (target) {
            target.style.display = "flex";
            target.removeAttribute("aria-hidden");
            target.setAttribute("aria-modal", "true");
            modal = target;  
            modal.addEventListener("click", closeModal);
            modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
            
        }
    };

    const openModal2 = function(e) {
        console.log(modal);
        e.preventDefault();       
        const target = document.querySelector(e.target.getAttribute("data-target"));
        if (target) {
            target.style.display = "flex";
            target.removeAttribute("aria-hidden");
            target.setAttribute("aria-modal", "true");
            modal = target;  
            modal.addEventListener("click", closeModal);
            modal.querySelector(".js-modal-close").addEventListener("click", closeModal);  
        }
    };

    const closeModal = function(e) {
        if (modal === null) return;
        e.preventDefault();
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
        modal.removeEventListener("click", closeModal);
        modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
        modal = null;
    };


const stopPropagation = function(e) {
        e.stopPropagation()
};


function genererModal(projects) {
    for(let i=0; i < projects.length; i++){

        const card = projects[i];
        const sectionmodal = document.querySelector(".modal-content");
        const projetImg = document.createElement("img");
        projetImg.src = card.imageUrl;
        const contenerImage = document.createElement("div");
        const fond_icone = document.createElement("a");
        const iconeDel = document.createElement("img");
        iconeDel.src = "./assets/icons/supprimer.png";        

        contenerImage.classList.add("contener-image")
        projetImg.classList.add("imgModal");
        iconeDel.classList.add("buttonDel");
        fond_icone.classList.add("fond-btn");

        sectionmodal.appendChild(contenerImage);
        contenerImage.appendChild(projetImg);
        contenerImage.appendChild(fond_icone);
        fond_icone.appendChild(iconeDel);
        
    }
    const boxBtn = document.querySelector(".box-btn")
    const btnAdd = document.createElement("button");
    btnAdd.innerText = "Ajouter une photo";

    btnAdd.classList.add("btn-ajouter", "js-modal-close");
    btnAdd.setAttribute("data-target", "#modal2");

    boxBtn.appendChild(btnAdd);

    btnAdd.addEventListener("click", openModal2);
};

/**function color(e) {
    e.preventDefault(); // Assurez-vous que l'événement 'e' est passé en paramètre
    const test = document.querySelector(".btn-ajouter");
    test.style.color = "blue";
}**/


fetch('http://localhost:5678/api/works', {
    method: "GET",
    headers: { "Accept": "application/json","Content-Type": "application/json" },
  })
    .then(response => {
      return response.json();
    })
    .then(projects => {
      console.log(projects); 

    genererModal(projects);
 
});
    document.querySelectorAll(".js-modal").forEach(a => {
        a.addEventListener("click", openModal);
        
    });

    document.querySelectorAll(".btn-ajouter").forEach(button => {
        button.addEventListener("click", openModal2);
    
    });

     document.querySelectorAll(".js-modal-close").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal(e);
        });
    });

    document.querySelectorAll(".modal").forEach(modalElement => {
        modalElement.addEventListener("click", closeModal);
        modalElement.querySelector(".modal-wrapper").addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });
});

