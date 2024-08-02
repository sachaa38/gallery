document.addEventListener('DOMContentLoaded', (event) => {
    let modal = null;
    let modal2 = null;

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
        e.preventDefault(); 
        const target2 = document.querySelector(e.target.getAttribute("data-target"));
        if (target2) {
            target2.style.display = "flex";
            target2.removeAttribute("aria-hidden");
            target2.setAttribute("aria-modal", "true");
            modal2 = target2;  
            modal2.addEventListener("click", closeModal2);
            modal2.querySelector(".js-modal-close").addEventListener("click", closeModal2);  
        }
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
            modal.removeEventListener("click", closeModal);
            modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
            modal = null;
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
        
    const closeModal2 = function(e) {
        if(modal2 === null) return;
        e.preventDefault();
        modal2.style.display = "none";
        modal2.setAttribute("aria-hidden", "true");
        modal2.removeAttribute("aria-modal");
        modal2.removeEventListener("click", closeModal2);
        modal2.querySelector(".js-modal-close").removeEventListener("click", closeModal2);
        modal2 = null;
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
    /**const boxBtn = document.querySelector(".box-btn")
    const btnAdd = document.createElement("button");
    btnAdd.innerText = "Ajouter une photo";

    btnAdd.classList.add("btn-ajouter", "js-modal-close");
    btnAdd.setAttribute("data-target", "#modal2");
    boxBtn.appendChild(btnAdd);**/

    
};

function ajouterPhoto() {
        const sectionmodal = document.querySelector(".modal-content");
        const graySquare = document.createElement("div");
        const projetImg = document.createElement("img");
        projetImg.src = "./assets/icons/picture-svgrepo-com.png";
        const btnPlus = document.createElement("button");
        btnPlus.innerText = "+ ajouter photo";
        const sizeDoc = document.createElement("p");
        sizeDoc.innerText = "jpg, png : 4mo max";
        const divTitle = document.createElement("div");
        const titleDoc = document.createElement("h2");
        titleDoc.innerText ="Titre";
        const inputTitle = document.createElement("input")
        const divCat = document.createElement("div");
        const catDoc = document.createElement("h2");
        catDoc.innerText = "Catégorie"
        const inputCat = document.createElement("input");
        const divBtn = document.createElement("div");
        const btnValider = document.createElement("button");
        btnValider.innerText = "Valider";      

        /**contenerImage.classList.add("contener-image")
        projetImg.classList.add("imgModal");
        iconeDel.classList.add("buttonDel");
        fond_icone.classList.add("fond-btn"); **/

        sectionmodal.appendChild(graySquare);
        sectionmodal.appendChild(divTitle);
        sectionmodal.appendChild(divCat);
        sectionmodal.appendChild(divBtn);
        graySquare.appendChild(projetImg);
        graySquare.appendChild(btnPlus);
        graySquare.appendChild(sizeDoc);
        divTitle.appendChild(titleDoc);
        divTitle.appendChild(inputTitle);
        divCat.appendChild(catDoc);
        divCat.appendChild(inputCat);
        divBtn.appendChild(btnValider);
        
        
    };



    document.querySelectorAll(".js-modal").forEach(a => {
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
        }) ;
        a.addEventListener("click", openModal);
        
    });

    document.querySelectorAll(".btn-ajouter").forEach(button => {
        button.addEventListener("click", (e) => {
            ajouterPhoto();
            openModal2(e);
            
        });
    
    });

     document.querySelectorAll(".js-modal-close").forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            closeModal2(e);
        });
    });

    document.querySelectorAll(".modal").forEach(modalElement => {
        modalElement.addEventListener("click", (e) => {
            closeModal();
            closeModal2();
    });
        modalElement.querySelector(".modal-wrapper").addEventListener("click", (e) => {
            e.stopPropagation();
        });
    });
    /**document.querySelectorAll(".modal").forEach(modalElement => {
        modalElement.addEventListener("click", closeModal2);
        modalElement.querySelector(".modal-wrapper").addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }); **/
});

