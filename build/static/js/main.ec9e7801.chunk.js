(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{79:function(e,t,n){e.exports=n(95)},83:function(e,t,n){},84:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),o=n(25),i=n.n(o),c=(n(83),n(84),n(6)),l=n(96),s=n(31),u=n(0),m=function(){var e=Object(c.i)().scene,t=(new u.CubeTextureLoader).load(["https://i.imgur.com/z4BOzwJ.png","https://i.imgur.com/z4BOzwJ.png","https://i.imgur.com/z4BOzwJ.png","https://i.imgur.com/z4BOzwJ.png","https://i.imgur.com/z4BOzwJ.png","https://i.imgur.com/z4BOzwJ.png"]);return e.background=t,null},d=n(5),p=function(){var e=Object(l.e)((function(){return{type:"Static",rotation:[0,0,0],position:[0,0,-10]}})),t=Object(d.a)(e,1)[0];return r.a.createElement("mesh",{ref:t})},f=n(41),g=n(67),h=n(51),b=Object(h.b)({name:"scene",initialState:{currentScene:1,dragging:!1,sceneEnum:{1:[-20,10],2:[100,100],3:[-200,200]},centered:!0},reducers:{updateScene:function(e,t){var n=t.payload;e.currentScene=n},centre:function(e){e.centered=!0},decentre:function(e){e.centered=!1},toogleDragging:function(e){e.dragging=!e.dragging}}}),E=b.actions,v=E.updateScene,x=(E.centre,E.decentre,E.toogleDragging,function(e){var t=e.scene,n=t.sceneEnum,a=t.currentScene;return[n[a],a]}),y=b.reducer;Object(c.e)({OrbitControls:f.b});var w,j=window.screen,O=j.width,k=j.height;w=O>k?20:45;var M=function(){var e=Object(s.c)(x),t=Object(d.a)(e,1)[0],n=Object(s.b)(),o="ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0,i=Object(a.useState)(!1),l=Object(d.a)(i,2),u=l[0],m=l[1],p=Object(a.useRef)();p.current=u;var f=Object(a.useRef)(),h=Object(c.i)(),b=h.camera,E=h.gl,y=Object(g.a)((function(){return{to:{x:0,y:0,z:0,standX:0,standY:0}}})),j=Object(d.a)(y,2),O=j[0],k=O.x,M=O.y,z=O.standX,P=O.standY,S=j[1],N=Object(a.useCallback)((function(){if(t){var e=Object(d.a)(t,2),n=e[0],a=e[1];S({standX:n,standY:a}),f.current.target.y=w}}),[t,S]);return Object(a.useEffect)((function(){document.addEventListener("pointerdown",(function(e){"CANVAS"===e.target.nodeName&&m(!0)})),document.addEventListener("pointerup",(function(e){"CANVAS"===e.target.nodeName&&(m(!1),n(v(0)))}))}),[]),Object(a.useEffect)((function(){N()}),[N]),Object(c.g)((function(e){var t=e.mouse;p.current?(z.value=f.current.target.x,P.value=f.current.target.y,S({standX:f.current.target.x,standY:f.current.target.y,x:z.value-b.position.x,y:P.value-b.position.y})):(b.position.x=z.value-k.value,b.position.y=P.value-M.value,f.current.target.x=z.value,f.current.target.y=P.value),o||S({x:t.x,y:t.y}),f.current.update()})),r.a.createElement("orbitControls",{ref:f,args:[b,E.domElement],enablePan:!0,enableRotate:!1})},z=Object(h.a)({reducer:{scene:y}}),P=n(37),S=n(42),N=n(21),C=n(22);function Y(){var e=Object(N.a)(["\n  list-style: none;\n  border-top: 1px solid #08fdd8;\n  display: flex;\n  flex-direction: column;\n  i{\n    cursor: pointer;\n    text-align :center;\n    margin: 1rem;\n    background: none;\n    border: none;\n    font-size: 1.3rem;\n    transform: scale(1);\n    transition: transform 300ms ease-in-out;\n    &:hover{\n    transform: scale(2)\n    }\n  }\n  a{\n    color: #08fdd8;\n    transform: scale(1) rotate(0deg);\n    transition: transform 300ms ease-in-out, color 300ms ease-in-out;\n    @media only screen and (orientation: portrait){\n      margin: 0 1rem;\n    }\n  }\n  @media only screen and (orientation: portrait){\n  border-top: none;\n  border-left: 1px solid #08fdd8;\n  flex-direction: row;\n  margin: 0 1rem;\n  i{\n    margin: 0;\n  }\n  }\n"]);return Y=function(){return e},e}function q(){var e=Object(N.a)(["\n  font-weight: bold;\n  text-align :center;\n  margin: 1rem;\n  background: none;\n  border: none;\n  &:focus{\n      outline: none;\n    }\n  i{\n    cursor: pointer;\n    color: #08fdd8;\n    font-size: 1.3rem;\n    transform: scale(1) rotate(0deg);\n    transition: transform 300ms ease-in-out, color 300ms ease-in-out;\n    &:focus{\n      outline: none;\n    }\n    &:after{\n      position: absolute;\n      content: '","';\n      font-family: Roboto, serif;\n      letter-spacing: 1px;\n      transform: scale(0);\n    }\n    &:hover{\n      transform: scale(2) rotate(365deg);\n      color: #fff;\n      &:after{\n        animation: "," 500ms forwards;\n        @media only screen and (orientation: portrait){\n        display: none;\n        }\n      }\n    }\n  }\n"]);return q=function(){return e},e}function B(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  list-style: none;\n  flex-grow: 1;\n  padding: 0.4rem;\n  @media only screen and (orientation: portrait){\n    flex-direction: row;\n  }\n"]);return B=function(){return e},e}function F(){var e=Object(N.a)(["\n  background: #181818;\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items:center;\n  justify-content: center;\n  @media only screen and (orientation: portrait){\n    flex-direction: row;\n    height: 70px;\n    width: 100vw;\n  }\n"]);return F=function(){return e},e}function I(){var e=Object(N.a)(["\n  50%,\n  0% {\n    transform: scale(0) translate(0.7rem,0px);\n  }\n  100%{\n    transform: scale(1) translate(0.7rem,0px);\n  }\n"]);return I=function(){return e},e}var J=Object(C.b)(I()),T=C.a.section(F()),R=Object(C.a)(S.a.ul)(B()),X=Object(C.a)(S.a.button)(q(),(function(e){return e.title}),J),L=C.a.ul(Y()),V=function(){var e=Object(S.b)((function(){return{mouseX:0}})),t=Object(d.a)(e,2),n=t[0].mouseX,a=t[1],o=Object(s.b)();Object(c.g)((function(e){var t=e.mouse;a({mouseX:t.x})}));var i={transform:n.interpolate((function(e){return"rotate3d(0,1,0,".concat(25*e,"deg)")}))},l=function(e){o(v(+e.target.dataset.scene))};return r.a.createElement(P.a,null,r.a.createElement(T,null,r.a.createElement(R,null,r.a.createElement("li",null,r.a.createElement(X,{"data-scene":1,type:"button",style:i,title:"Home",onClick:l},r.a.createElement("i",{className:"fas fa-home","data-scene":1}))),r.a.createElement("li",null,r.a.createElement(X,{"data-scene":2,type:"button",style:i,title:"Portfolio",onClick:l},r.a.createElement("i",{className:"fas fa-folder","data-scene":2}))),r.a.createElement("li",null,r.a.createElement(X,{"data-scene":3,type:"button",style:i,title:"Portfolio",onClick:l},r.a.createElement("i",{className:"fas fa-envelope-open","data-scene":3})))),r.a.createElement(L,null,r.a.createElement("li",null,r.a.createElement("a",{href:"https://www.linkedin.com/in/joseph-flores-vega/"},r.a.createElement("i",{className:"fab fa-linkedin"}))),r.a.createElement("li",null,r.a.createElement("a",{href:"https://github.com/YoseptF"},r.a.createElement("i",{className:"fab fa-github-square"}))),r.a.createElement("li",null,r.a.createElement("a",{href:"https://twitter.com/Yosept__"},r.a.createElement("i",{className:"fab fa-twitter-square"}))))))},_=function(e){var t=e.position,n=e.texture,a=Object(c.h)(u.TextureLoader,"cubes/".concat(n,".png")),o=Object(l.c)((function(){return{mass:3e3,position:t,rotation:[Math.PI/(2*Math.random()),Math.PI/(2*Math.random()),Math.PI/(2*Math.random())]}})),i=Object(d.a)(o,2),s=i[0],m=i[1];return r.a.createElement("mesh",{ref:s,onPointerUp:function(){m.velocity.set(0,0,35),m.angularVelocity.set(20*Math.random()-10,20*Math.random()-10,20*Math.random()-10)}},r.a.createElement("boxBufferGeometry",{attach:"geometry",args:[5,5,5]}),r.a.createElement("meshPhongMaterial",{attach:"material",map:a}))};_.defaultProps={position:[0,0,0],texture:"placeholder"};var A=_;function D(){var e=Object(N.a)(["\n  background: white;\n  animation: "," 500ms forwards ease-in-out;\n  display: flex;\n  padding: 10px;\n  border-radius: 11px;\n  a{\n    background: red;\n  }\n  i{\n    font-size: 2.5vmax;\n    margin: 10px;\n    color: #1d1d1d;\n    transform: scale(1);\n    transition: transform 300ms ease-in-out;\n    &:hover{\n      transform: scale(2);\n      color: gold;\n    }\n  }\n"]);return D=function(){return e},e}function G(){var e=Object(N.a)(["\n  0%{\n    transform: scale(0);\n  }\n  100%{\n    transform: scale(1);\n  }\n"]);return G=function(){return e},e}var K=Object(C.b)(G()),U=C.a.article(D(),K),W=function(e){var t=e.demo,n=e.github;return r.a.createElement(U,null,r.a.createElement("div",null,r.a.createElement("i",{className:"fas fa-external-link-alt cardI","data-link":t})),r.a.createElement("div",null,r.a.createElement("i",{className:"fab fa-github cardI","data-link":n})))};W.defaultProps={demo:"https://www.google.com",github:"https://www.google.com"};var H=W,$=function(e){var t=e.texture,n=e.position,o=e.vertical,i=e.double,s=e.demo,m=e.github,p=e.layer,f=(e.random,e.size),g=Object(c.h)(u.TextureLoader,"cards/".concat(t,".png")),h=Object(a.useState)(!1),b=Object(d.a)(h,2),E=b[0],v=b[1],x=Object(l.c)((function(){return{mass:1e4,position:n,rotation:[0,0,o?Math.PI/(.4*Math.random()+1.8):Math.PI/(.006*Math.random()+.247)]}})),y=Object(d.a)(x,2),w=y[0],j=y[1];return r.a.createElement("mesh",{ref:w,onPointerUp:function(e){var t=Object.values(e.target),n=Object(d.a)(t,2),a=n[0].type,r=n[1],o=r["data-link"],i=r.className;(void 0===i?"":i).includes("cardI")&&window.open(o,"_blank"),"canvas"===a&&(j.velocity.set(0,0,25),j.angularVelocity.set(0,0,2*Math.random()-1),v(!E))},layers:p,onPointerOver:function(){j.velocity.set(0,0,7),j.angularVelocity.set(1*Math.random()-.5,1*Math.random()-.5,0)}},r.a.createElement("boxBufferGeometry",{attach:"geometry",args:f}),r.a.createElement("meshPhongMaterial",{attach:"material",map:g}),E&&i&&r.a.createElement(P.b,{center:!0},r.a.createElement(H,{demo:s,github:m})))};$.defaultProps={texture:"placeholder",position:[0,0,0],vertical:!1,double:!1,demo:"https://google.com",github:"https://github.com/YoseptF",random:!1,size:[43,20,0]};var Q=$,Z=n(49),ee=function(e){var t=e.position,n=Object(l.c)((function(){return{mass:1e4,args:[1,1,1],rotation:[Math.PI/2,Math.PI/.9,0],position:t}})),a=Object(d.a)(n,2),o=a[0],i=a[1],s=Object(c.h)(Z.a,"/objects/Keyboard.glb"),u=s.materials,m=s.nodes;return r.a.createElement("mesh",{ref:o,onPointerUp:function(){i.angularVelocity.set(0,0,1*Math.random()-.5),i.velocity.set(0,0,25)}},r.a.createElement("group",{scale:[25,1,11]},r.a.createElement("mesh",{material:u.TextKey,geometry:m.whole_5.geometry}),r.a.createElement("mesh",{geometry:m.whole_0.geometry},r.a.createElement("meshBasicMaterial",{attach:"material",color:"#675959"}))))};ee.defaultProps={position:[-45,30,0]};var te=ee,ne=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(te,null),r.a.createElement(Q,{texture:"presentation"}),r.a.createElement(Q,{texture:"happy",size:[20,20,0],position:[0,40,0]}),r.a.createElement(A,{position:[-30,0,0],texture:"react"}),r.a.createElement(A,{position:[-45,-10,0],texture:"javascript"}),r.a.createElement(A,{position:[-40,10,0],texture:"rails"}))},ae=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(Q,{position:[120,110,0],texture:"myeat",double:!0,demo:"https://my-eat-list.netlify.app/",github:"https://github.com/YoseptF/my-eat-list-frontend"}),r.a.createElement(Q,{texture:"workout",size:[20,20,0],position:[165,120,0]}),r.a.createElement(Q,{position:[130,80,0],texture:"twitch",double:!0,demo:"https://twitch-points-suite.netlify.app/",github:"https://github.com/YoseptF/Twitch-Points-Song-Request"}),r.a.createElement(Q,{position:[110,50,0],texture:"lifestyle",double:!0,demo:"https://aqueous-springs-55430.herokuapp.com/",github:"https://github.com/YoseptF/lifestyle"}),r.a.createElement(Q,{texture:"coffe",size:[20,20,0],position:[165,30,0]}),r.a.createElement(Q,{position:[60,120,0],texture:"jumper",vertical:!0,double:!0,demo:"https://endless-jumper.netlify.app/",github:"https://github.com/YoseptF/Endless-Jumper"}),r.a.createElement(Q,{position:[70,80,0],texture:"animal",double:!0,demo:"https://acnh-catalog.herokuapp.com/",github:"https://github.com/YoseptF/acnh-catalog"}),r.a.createElement(Q,{position:[60,40,0],texture:"game",double:!0,demo:"https://gamesxchange.herokuapp.com/",github:"https://github.com/YoseptF/gamexchange"}))};function re(){var e=Object(N.a)(["\n  display: flex;\n  flex-direction: column;\n  padding: 2rem;\n  header{\n    display: flex;\n    align-items: center;\n    .image{\n    width: 10vmax;\n    height: 10vmax;\n    background: "," center center/cover no-repeat;\n  }\n  }\n\n  input{\n    font-weight: bold;\n  }\n\n  input, textarea{\n      border: 1px solid black;\n      border-radius: 11px;\n      font-size: 2vh;\n      margin: 0.7rem;\n      padding: 1vh;\n      line-height: 2vh;\n      &:focus{\n      outline: none;\n      }\n  }\n\n  textarea{\n    min-height: 190px;\n  }\n"]);return re=function(){return e},e}function oe(){var e=Object(N.a)(["\n  width: 100vw;\n  max-width: 360px;\n  background: white;\n  transform: translate(0,2rem);\n  @media only screen and (min-width: 768px){\n  max-width: 540px;\n  }\n"]);return oe=function(){return e},e}var ie=C.a.section(oe()),ce=C.a.form(re(),(function(e){return"url(".concat(e.image,")")})),le=function(e){var t=e.position;return r.a.createElement(P.b,{position:t,center:!0},r.a.createElement(ie,null,r.a.createElement(ce,{action:"https://formspree.io/xvovpedq",method:"POST",image:"https://i.imgur.com/tp2D1KG.png"},r.a.createElement("header",null,r.a.createElement("div",{className:"image"}),r.a.createElement("h1",null,"Send me a message!")),r.a.createElement("input",{name:"email",type:"email",placeholder:"your@mail.com",required:!0,autoComplete:"off"}),r.a.createElement("input",{name:"subject",type:"text",placeholder:"subject",required:!0,autoComplete:"off"}),r.a.createElement("textarea",{name:"message",required:!0,autoComplete:"off"}),r.a.createElement("input",{name:"submitButton",type:"submit",value:"Send!"}))))};le.defaultProps={position:[-200,200,0]};var se,ue=le,me=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(te,{position:[-250,230,0]}),r.a.createElement(Q,{texture:"call",size:[20,20,0],position:[-150,230,0]}),r.a.createElement(ue,{position:[-200,200,0]}),r.a.createElement(Q,{texture:"cool",size:[20,20,0],position:[-150,165,0]}),r.a.createElement(Q,{texture:"coffe",size:[20,20,0],position:[-250,180,0]}))},de=window.screen,pe=de.width,fe=de.height;se=pe>fe?20:45;var ge=function(){return r.a.createElement(c.a,{camera:{position:[0,0,se],fov:110},shadowMap:!0,style:{position:"fixed",margin:0,padding:0,left:0,top:0,right:0,bottom:0}},r.a.createElement(s.a,{store:z},r.a.createElement(m,null),r.a.createElement(M,null),r.a.createElement("ambientLight",{intensity:.7}),r.a.createElement(l.a,{iterations:20,tolerance:1e-4,defaultContactMaterial:{friction:1,restitution:0,contactEquationStiffness:1e7,contactEquationRelaxation:1,frictionEquationStiffness:1e7,frictionEquationRelaxation:2},gravity:[0,0,-70],allowSleep:!1},r.a.createElement(p,null),r.a.createElement(ne,null),r.a.createElement(ae,null),r.a.createElement(me,null)),r.a.createElement(V,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ge,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[79,1,2]]]);
//# sourceMappingURL=main.ec9e7801.chunk.js.map