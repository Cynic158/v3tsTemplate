import{E as V,a as S}from"./el-input-bb785a61.js";import{g as I,E as L,a as U}from"./index-3613b1ee.js";import{E as q,a as C}from"./el-form-item-9f380ce6.js";import{d as A,u as B,r as f,a as F,o as N,b as D,c as T,e,w as l,E as g,f as r,g as i,h as w,i as R,p as j,j as M}from"./index-3723734a.js";import{_ as W}from"./_plugin-vue_export-helper-c27b6911.js";const h=d=>(j("data-v-7b85f8c8"),d=d(),M(),d),$={class:"login-container"},z=h(()=>i("h1",null,[w(" 欢迎 "),i("div",{class:"tip"},[i("h3",null,"超级管理员: admin 111111"),i("h3",null,"普通管理员: default 111111")])],-1)),G=h(()=>i("h2",null,"Welcome to v3tsTemplate",-1)),H={class:"input-container"},J=A({__name:"index",setup(d){let v=B(),y=R();const E={username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:5,max:10,message:"用户名长度为5到10位",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"密码长度为6到15位",trigger:"blur"}]};let c=f(null),a=F({username:"",password:""}),p=f(!1),_=async()=>{await c.value.validate();try{p.value=!0,await v.userLogin(a),y.push("/");let t=I();g({type:"success",title:t,message:"登录成功",duration:3e3})}catch(t){g({type:"error",message:t.message,duration:3e3})}finally{p.value=!1}};return N(()=>{let t=document.querySelector(".up-input").children[0].children[1],s=document.querySelector(".down-input").children[0].children[1],n=!1,u=!1;t.addEventListener("focus",()=>{n=!0}),s.addEventListener("focus",()=>{u=!0}),t.addEventListener("blur",()=>{n=!1}),s.addEventListener("blur",()=>{u=!1}),document.querySelector(".login-form").addEventListener("keyup",function(o){(o.key=="ArrowDown"||o.key=="ArrowUp")&&n==!0?s.focus():(o.key=="ArrowDown"||o.key=="ArrowUp")&&u==!0?t.focus():o.key=="Enter"&&_()}),t.focus(),c.value.clearValidate(["username","password"])}),(t,s)=>{const n=U,u=V,o=q,x=S,k=C,b=L;return D(),T("div",$,[e(b,null,{default:l(()=>[e(n,{span:12,xs:0,md:12,style:{height:"100vh"}}),e(n,{span:12,xs:24,md:12,style:{height:"100vh",position:"relative"}},{default:l(()=>[e(k,{model:r(a),rules:E,class:"login-form",ref_key:"loginform",ref:c},{default:l(()=>[z,G,i("div",H,[e(o,{prop:"username"},{default:l(()=>[e(u,{class:"up-input",modelValue:r(a).username,"onUpdate:modelValue":s[0]||(s[0]=m=>r(a).username=m),"prefix-icon":"User",placeholder:"请输入用户名"},null,8,["modelValue"])]),_:1}),e(o,{prop:"password"},{default:l(()=>[e(u,{class:"down-input",modelValue:r(a).password,"onUpdate:modelValue":s[1]||(s[1]=m=>r(a).password=m),type:"password",placeholder:"请输入密码","show-password":"","prefix-icon":"Lock"},null,8,["modelValue"])]),_:1}),e(o,null,{default:l(()=>[e(x,{type:"primary",onClick:r(_),loading:r(p)},{default:l(()=>[w("登录")]),_:1},8,["onClick","loading"])]),_:1})])]),_:1},8,["model"])]),_:1})]),_:1})])}}});const Y=W(J,[["__scopeId","data-v-7b85f8c8"]]);export{Y as default};