import{initializeApp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import{getAuth,GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import{getFirestore,doc,getDoc,setDoc,collection,getDocs,serverTimestamp}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDT_d88FrPghUFyUPalVeaF8jjIamEa77Q",
  authDomain: "absensi-1938a.firebaseapp.com",
  projectId: "absensi-1938a",
  storageBucket: "absensi-1938a.firebasestorage.app",
  messagingSenderId: "292717541243",
  appId: "1:292717541243:web:9f36f8da389b3c86cf6fde",
  measurementId: "G-RSYPJM17D2"
};

export const ADMIN_EMAIL = "samuelchristianwijaya26@gmail.com";

const app=initializeApp(firebaseConfig);
export const auth=getAuth(app),db=getFirestore(app);
export{signOut,onAuthStateChanged,doc,getDoc,setDoc,collection,getDocs,serverTimestamp};
export const login=()=>signInWithPopup(auth,new GoogleAuthProvider());
export const $=s=>document.querySelector(s);

export function weekKey(t=Date.now()){
  const d=new Date(t+7*36e5);d.setUTCDate(d.getUTCDate()+4-(d.getUTCDay()||7));
  const y=d.getUTCFullYear(),w=Math.ceil(((d-Date.UTC(y,0,1))/864e5+1)/7);
  return`${y}-W${String(w).padStart(2,"0")}`;
}

export const norm=s=>String(s||"").normalize("NFKD").toLowerCase().replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
export const normStambuk=s=>{let d=String(s||"").replace(/\D/g,"");return d.length===2?"20"+d:d};
export const titleCase=s=>norm(s).replace(/\b[a-z]/g,c=>c.toUpperCase()).replace(/\b(D|S)(\d)\b/gi,(m,a,b)=>a.toUpperCase()+b);
function lev(a,b){const m=a.length,n=b.length,p=Array.from({length:n+1},(_, j)=>j);
  for(let i=1;i<=m;i++){let prev=p[0];p[0]=i;for(let j=1;j<=n;j++){const t=p[j];p[j]=Math.min(p[j]+1,p[j-1]+1,prev+(a[i-1]===b[j-1]?0:1));prev=t}}return p[n]}
const digits=s=>s.replace(/\D/g,"");

export function clusterProdi(rows){
  const groups=[];
  for(const r of rows){
    const k=norm(r.prodi).replace(/ /g,"");
    let g=groups.find(g=>digits(g.key)===digits(k)&&1-lev(g.key,k)/Math.max(g.key.length,k.length)>=.85);
    if(!g)groups.push(g={key:k,names:{}});
    const n=titleCase(r.prodi);g.names[n]=(g.names[n]||0)+1;r._g=g;
  }
  for(const g of groups)g.label=Object.entries(g.names).sort((a,b)=>b[1]-a[1])[0][0];
  rows.forEach(r=>r.prodiGrup=r._g.label);
  return groups.map(g=>g.label).sort();
}
