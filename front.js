
function generergallery(projects){
  for(let i=0; i < projects.length; i++){

    const card = projects[i];
    const sectiongallery = document.querySelector(".gallery");
    const projetElement = document.createElement("figure");
    const projetImg = document.createElement("img");
    projetImg.src = card.imageUrl;
    const projetTitle = document.createElement("figcaption");
    projetTitle.innerText = card.title;

    sectiongallery.appendChild(projetElement);
    projetElement.appendChild(projetImg);
    projetElement.appendChild(projetTitle);
  }
}





fetch('http://localhost:5678/api/works', {
  method: "GET",
    headers: { "Accept": "application/json","Content-Type": "application/json" },
})
  .then(response => {
    return response.json();
  })
  .then(projects => {
    console.log(projects); 
  generergallery(projects);

const btnTous = document.querySelector(".tous");

btnTous.addEventListener("click", function(){
  const projectTous = projects
  console.log(projectTous);
  document.querySelector(".gallery").innerHTML= "";
  generergallery(projectTous);
  return projectTous;
    
  })
  
  const btnobjets = document.querySelector(".objets");

btnobjets.addEventListener("click", function(){
  const projectfiltre = projects.filter(function(project){
    return project.category.id === 1;
  })
  document.querySelector(".gallery").innerHTML= "";
  generergallery(projectfiltre);
   console.log(projectfiltre);
  })

  const btnAppartement = document.querySelector(".appartements");

btnAppartement.addEventListener("click", function () {
   const projectfiltre = projects.filter(function (project) {
       return project.category.id === 2;
  });
  document.querySelector(".gallery").innerHTML= "";
  generergallery(projectfiltre);
    console.log(projectfiltre);
  });

  const btnHotel = document.querySelector(".hotels");

  btnHotel.addEventListener("click", function () {
     const projectfiltre = projects.filter(function (project) {
         return project.category.id === 3;
    });
    document.querySelector(".gallery").innerHTML= "";
    generergallery(projectfiltre);
      console.log(projectfiltre);
    });
});