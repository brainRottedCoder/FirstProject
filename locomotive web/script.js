var loco =function(){
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


// gsap.from("#bic",{
//     scale:0,
//     duration:2,
//     opacity:0,
//     rotate:360,
// })
// gsap.from("#box",{
//       scale:0,
//     duration:2,
//     opacity:0,
//     rotate:360,
//     scrollTrigger:{
//         trigger:"#box",
//         scroller:"#main",
//         start:"top 50%",
//         markers:true
//     }
// })

// var tex=document.querySelectorAll("#page3 h1")
// tex.forEach(function(elem){
//   var sp= elem.textContent.split("")
//   console.log(elem)
//   var clutter=""
//   sp.forEach(function(el){
//     clutter+=`<span>${el}</span>`
//   })
//   elem.innerHTML= clutter
// })

// gsap.to("#page3 h1 span",{
//   color:"#e3e2c3",
//   stagger:0.2,
//   duration:5,
//   scrollTrigger:{
//     trigger:"#page3 h1",
//     scroller:"#main",
//     markers:true,
//     start:"top 50%",
//     scrub:5
//   }
// })
}
loco()


var tl= gsap.timeline()
tl.from(".line h1",{
  y:100,
  stagger:0.2,
  duration:0.7,
  opacity:0,
  delay:0.4
})
tl.from(".line h2",{
  y:200,
  opacity:0
  
})
tl.from("#part1,.line h2",{
  opacity:0,
  duration:0.4,
  // delay:0.5,
  onStart:function(){
    // var load= document.querySelector('#loader');
     var h5 = document.querySelector('#part1 h5');
      var count=0;

var int =setInterval(function(){
    if(count===99){
        clearInterval(int);
    }
    count++;
    h5.textContent=count;
    h5.style.fontFamily='sans-serif';
    h5.style.fontStyle = "italic";
    h5.style.fontSize='3vw'
},15)
  }
})

tl.to("#loader",{
  opacity:0,
  duration:0.5,
  delay:2
})
tl.from("#page1",{
  y:1200,
  opacity:0,
  duration:0.5,
  delay:0.2,
  ease:Power4
})
tl.to("#loader",{
  display:'none'
})
