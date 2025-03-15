"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[116],{116:(t,e,i)=>{i.r(e),i.d(e,{default:()=>x});var s=i(691),n=i(398),o=i(836);function a(t,e,i){let s=t.measureText(e).width;for(;e.length>0&&s>i;)e=e.slice(0,-1),s=t.measureText(e+"...").width;return e+(s>i?"":"...")}class h{constructor(t,e,i,s){this.rotationAngle=0,this.isSpinning=!1,this.totalRotationAngle=0,this.totalDuration=0,this.decisionPickerView=t,this.listOfOptions=function(t){const e=[...t];for(let t=e.length-1;t>0;t--){const i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}(e),this.sectorColors=this.listOfOptions.map((()=>`rgb(${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())}, ${Math.floor(256*Math.random())})`)),this.canvas=i.getCanvasElement(),this.ctx=i.getContext(),this.duration=s,this.spinStartTime=0,this.drawWheel()}drawWheel(){this.ctx.strokeStyle="#00000",this.ctx.lineWidth=1,this.ctx.stroke();const t=this.canvas.width/2,e=this.canvas.height/2,i=Math.min(t,e)-50,s=.15*i;var n,o;n=this.ctx,o=this.canvas,n.resetTransform(),n.clearRect(0,0,o.width,o.height),this.ctx.save(),this.ctx.translate(t,e),this.ctx.rotate(this.rotationAngle),this.ctx.translate(-t,-e),this.drawWheelBase(t,e,i),this.drawWheelText(t,e,i),this.ctx.restore(),function(t,e,i,s){t.beginPath(),t.arc(e,i,s,0,2*Math.PI),t.fillStyle="#FFF",t.fill(),t.stroke()}(this.ctx,t,e,s),function(t,e,i,s){t.beginPath(),t.moveTo(e+s+20,i+25),t.lineTo(e+s+7,i),t.lineTo(e+s+20,i-25),t.lineTo(e+s-30,i),t.closePath(),t.fillStyle="rgba(49,255,195,0.99)",t.fill(),t.stroke()}(this.ctx,t,e,i),function(t,e,i,s){const n=.15*s,o=.5*n,a=2*Math.PI/18;t.beginPath();for(let s=0;s<18;s++){const h=s*a-Math.PI/2,r=s%2==0?n:o,l=e+Math.cos(h)*r,c=i+Math.sin(h)*r;0===s?t.moveTo(l,c):t.lineTo(l,c)}t.closePath(),t.fillStyle="rgba(241,248,4,0.99)",t.fill(),t.stroke()}(this.ctx,t,e,i),this.isSpinning&&this.updatePickedOption()}spinWheel(t){if(this.duration=t,this.duration<5)return;if(this.isSpinning)return;this.isSpinning=!0,this.decisionPickerView.setDisabledState(this.isSpinning),this.decisionPickerView.showPickedOption(this.isSpinning),this.spinStartTime=Date.now();const e=this.duration+3*Math.random();this.totalRotationAngle=2*Math.PI*e,this.totalDuration=1e3*this.duration,requestAnimationFrame(this.animateSpin.bind(this))}animateSpin(){if(Date.now()-this.spinStartTime<this.totalDuration){const e=Math.max(0,Math.min((Date.now()-this.spinStartTime)/(1e3*this.duration),1)),i=(t=e)<.5?4*t**3:4*t**3-12*t**2+12*t-3;this.rotationAngle=this.totalRotationAngle*i,this.drawWheel(),requestAnimationFrame(this.animateSpin.bind(this))}else this.isSpinning=!1,this.decisionPickerView.setDisabledState(this.isSpinning),this.decisionPickerView.showPickedOption(this.isSpinning),this.drawWheel();var t}drawWheelBase(t,e,i){const s=this.listOfOptions.reduce(((t,e)=>t+Number(e.weight)),0);let n=-Math.PI/2;for(let o=0;o<this.listOfOptions.length;o++){const a=Number(this.listOfOptions[o].weight)/s,h=n+2*Math.PI*a;this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.arc(t,e,i,n,h),this.ctx.closePath(),this.ctx.fillStyle=this.sectorColors[o],this.ctx.fill(),this.ctx.stroke(),n=h}}drawWheelText(t,e,i){const s=this.listOfOptions.reduce(((t,e)=>t+Number(e.weight)),0);let n=-Math.PI/2;this.ctx.fillStyle="#FFF",this.ctx.font="16px Arial",this.ctx.textBaseline="middle",this.ctx.shadowColor="rgba(0, 0, 0, 0.7)",this.ctx.shadowBlur=4,this.ctx.shadowOffsetX=-2,this.ctx.shadowOffsetY=-2;for(const o of this.listOfOptions){const h=Number(o.weight)/s,r=2*Math.PI*h,l=n+r;this.ctx.save(),this.ctx.translate(t,e),this.ctx.rotate(n+r/2);const c=.3*i,d=0,u=.4*i;let m=o.title;const p=this.ctx.measureText(m).width;p>u&&(m=a(this.ctx,o.title,u));p/i/2>r&&(m=""),this.ctx.fillText(m,c,d),this.ctx.restore(),n=l}this.ctx.shadowColor="transparent",this.ctx.shadowBlur=0,this.ctx.shadowOffsetX=0,this.ctx.shadowOffsetY=0}getCurrentPickedOption(){let t,e=(this.rotationAngle%(2*Math.PI)+2*Math.PI)%(2*Math.PI);e=(-e+Math.PI/2+2*Math.PI)%(2*Math.PI);let i=0;for(const s of this.listOfOptions){const n=Number(s.weight),o=this.listOfOptions.reduce(((t,e)=>t+Number(e.weight)),0),a=i+2*Math.PI*n/o;if(e>=i&&e<a){t=s;break}i=a}return t}updatePickedOption(){const t=this.getCurrentPickedOption();t&&this.decisionPickerView.setPickedOption(t.title)}}var r=i(173);const l="button",c="back-button",d="sound-button",u="pick-button",m={tag:"section",classNames:["decision-picker"]},p={tag:"form",classNames:["decision-picker-container"]},g={tag:"label",classNames:["duration-label"],textContent:"Time: "},f={tag:"input",classNames:["duration"],attributes:{type:"number",value:"12",min:"5",required:"true",placeholder:"sec"}},b={tag:"p",classNames:["picked-option"],textContent:"Press start button"},w={tag:"canvas",classNames:["wheel-canvas"],textContent:"Decision Picker Wheel",attributes:{width:"512",height:"512"}};class x extends s.A{constructor(t,e){super(m),this.buttons=[],this.sounds=e;const i=(0,r.l)();i?this.listOfOptions=i:(t.navigate(o.b.INDEX),this.listOfOptions=[]),this.decisionPickerContainer=new n.n(p),this.labelElement=new n.n(g),this.inputElement=new n.n(f),this.pickedOption=new n.n(b),this.wheelCanvas=new n.n(w),this.configureView(t),this.wheel=new h(this,this.listOfOptions,this.wheelCanvas,this.getSeconds())}setPickedOption(t){this.pickedOption.getElement().textContent=t}showPickedOption(t){t?this.pickedOption.getElement().classList.remove("picked"):(this.pickedOption.getElement().classList.add("picked"),this.sounds.playWinSound())}setDisabledState(t){for(const e of this.buttons)t?e.getElement().setAttribute("disabled","true"):e.getElement().removeAttribute("disabled");t?this.inputElement.getElement().setAttribute("disabled","true"):this.inputElement.getElement().removeAttribute("disabled")}getSeconds(){const t=this.inputElement.getElement(),e=t instanceof HTMLInputElement?t.value:"";return Number(e)}manageSoundsButton(t){const e=t.target;e instanceof HTMLButtonElement&&e.classList.toggle("sound-off",!this.sounds.enabled),this.sounds.toggleAudio()}configureView(t){this.labelElement.addInnerElement(this.inputElement),this.decisionPickerContainer.addInnerElement(this.labelElement);const e=new n.n({tag:"button",classNames:[l,c],textContent:"Back",attributes:{type:"button"},callback:()=>{t.navigate(o.b.INDEX)}}),i=new n.n({tag:"button",classNames:[l,d],attributes:{type:"button"},callback:t=>{this.manageSoundsButton(t)}}),s=new n.n({tag:"button",classNames:[l,u],textContent:"Start",attributes:{type:"button"},callback:()=>{this.wheel.spinWheel(this.getSeconds())}});this.buttons.push(e,i,s),this.decisionPickerContainer.addInnerElement(e),this.sounds.enabled&&i.getElement().classList.add("sound-off"),this.decisionPickerContainer.addInnerElement(i),this.decisionPickerContainer.addInnerElement(s),this.viewElementCreator.addInnerElement(this.decisionPickerContainer),this.viewElementCreator.addInnerElement(this.pickedOption),this.viewElementCreator.addInnerElement(this.wheelCanvas)}}},173:(t,e,i)=>{i.d(e,{l:()=>n});var s=i(992);function n(){const t=(0,s.ZG)().filter((t=>""!==t.weight&&""!==t.title));return t.length>1?t:void 0}},992:(t,e,i)=>{function s(t){localStorage.setItem("options-makholodova",JSON.stringify(t))}function n(){const t=localStorage.getItem("options-makholodova");if(t)try{const e=JSON.parse(t);if(Array.isArray(e)&&e.every((t=>"id"in t&&"title"in t&&"weight"in t)))return e}catch(t){console.error("Failed to parse saved options:",t)}return[]}function o(){localStorage.removeItem("options-makholodova"),localStorage.removeItem("optionIdCounter")}function a(t){s(n().filter((e=>e.id!==t)))}i.d(e,{F9:()=>a,Q$:()=>o,Sz:()=>s,ZG:()=>n})}}]);