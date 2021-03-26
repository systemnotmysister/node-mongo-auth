const nry = document.querySelector('.nry');
const popup = document.querySelector('.popup')
const animate_form = document.querySelector('.animate-form')
const reg_fin = document.querySelector('.reg_fin')
const cncl_reg = document.querySelector('.cncl-reg')
const wws_div = document.querySelector('.wws_div')




document.addEventListener("click", function (e) {  // условие открытие попапа
  popup.classList.add('active')
  animate_form.classList.add('animate_dark')
  nry.classList.add('button_remove')
  wws_div.classList.add('wwsi')

  console.log("works!")
}
)


document.addEventListener("click", function (e) {
  if (e.target !== popup && !popup.contains(e.target) && e.target !== nry) {  // условие закрытия попапа
    popup.classList.remove("active");
    animate_form.classList.remove('animate_dark')
    nry.classList.remove('button_remove')
    wws_div.classList.remove('wwsi')

  }
  
})




// export  function displayBlock() {
//  document.getElementById('pid').style.display='block'
// }


// export  function colorChange() {
// document.getElementById('login').style.background='#c5c5c5'
// }


// export  function displayNone() {
//   onclick=document.getElementById('pid').style.display='none'
//   }
