import{getTimestamp as x,reportData as g}from"@imrobot/monitor-helpers";import{getTimestamp as p}from"@imrobot/monitor-helpers";var c,m=t=>{c=t||20},r=t=>{n.push(t),n.length>c&&n.shift()},n=[];var h=()=>document.location.href,i=h(),v=()=>{let t=window.onpopstate;window.onpopstate=function(...o){let e=i,a=h();i=a;let s={type:"navigation",content:`${e} - ${a}`,time:p()};r(s),t&&t.apply(this,o)}},f=()=>{let t=history.pushState;history.pushState=function(...o){let e=i,a=o[2];i=a;let s={type:"navigation",content:`${e} - ${a}`,time:p()};r(s),t.apply(this,o)}},u=()=>{v(),f()};var N=()=>{document.addEventListener("click",t=>{let o=d(t.target),e={type:"click",content:o,time:x()};r(e)})},d=t=>{let o=t.tagName.toLowerCase(),e=t.innerText;return`<${o}>${e}</${o}>`},k=t=>{m(t==null?void 0:t.maxStackNum),N(),u()},B=t=>{n.length>0&&(g("/behavior",{time:t,data:n}),n.length=0)},S={install:k,afterEvent:B},A=S;export{A as default};
//# sourceMappingURL=index.mjs.map