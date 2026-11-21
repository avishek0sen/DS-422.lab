/* Air Quality Prediction Using ML | DS422. COLAB_URL / GITHUB_URL come from js/config.js */
[["colab",COLAB_URL],["gh",GITHUB_URL]].forEach(function(p){if(/^https?:\/\//.test(p[1])){var a=document.getElementById(p[0]);a.href=p[1];a.target="_blank";a.rel="noopener";a.removeAttribute("aria-disabled")}});
var $=function(i){return document.getElementById(i)};
/* theme */
var root=document.documentElement,mq=matchMedia("(prefers-color-scheme: light)");
$("theme").onclick=function(){var t=root.getAttribute("data-theme")==="dark"?"light":"dark";root.setAttribute("data-theme",t);try{localStorage.setItem("th",t)}catch(e){}draw()};
try{var s=localStorage.getItem("th");if(s)root.setAttribute("data-theme",s)}catch(e){}
$("burger").onclick=function(){var o=$("links").classList.toggle("open");this.setAttribute("aria-expanded",o)};
$("links").onclick=function(e){if(e.target.tagName==="A"){this.classList.remove("open");$("burger").setAttribute("aria-expanded","false")}};
/* features */
var F=[["Date","Measurement date","Combined into DateTime, then dropped"],["Time","Measurement time","Combined into DateTime, then dropped"],["CO(GT)","Carbon monoxide concentration","TARGET"],["PT08.S1(CO)","CO-targeted sensor response","Feature"],["NMHC(GT)","Non-methane hydrocarbons","Dropped (mostly missing)"],["C6H6(GT)","Benzene concentration","Feature"],["PT08.S2(NMHC)","NMHC-targeted sensor response","Feature"],["NOx(GT)","Nitrogen oxides concentration","Feature"],["PT08.S3(NOx)","NOx-targeted sensor response","Feature"],["NO2(GT)","Nitrogen dioxide concentration","Feature"],["PT08.S4(NO2)","NO2-targeted sensor response","Feature"],["PT08.S5(O3)","Ozone-targeted sensor response","Feature"],["T","Temperature","Feature"],["RH","Relative humidity","Feature"],["AH","Absolute humidity","Feature"]];
$("ft").innerHTML=F.map(function(r){return '<tr'+(r[2]==="TARGET"?' class="tgt"':'')+'><td><b>'+r[0]+'</b></td><td>'+r[1]+'</td><td>'+(r[2]==="TARGET"?'<b style="color:var(--em)">Prediction target</b>':r[2])+'</td></tr>'}).join("")+'<tr><td><b>Hour, Day, Month</b></td><td>Engineered from DateTime</td><td>Features</td></tr>';
/* steps */
var S=[["Dataset loading","Load the CSV with Pandas.","pd.read_csv(path, sep=\";\", decimal=\",\")"],["Empty column removal","Drop columns that are entirely missing.","df.dropna(axis=1, how=\"all\")"],["Missing value identification","Convert the -200 sentinel to NaN.","df.replace(-200, float(\"nan\"))"],["Unnecessary column removal","Remove Unnamed: 15, Unnamed: 16 and NMHC(GT).","data.drop(columns=[...], errors=\"ignore\")"],["DateTime processing","Combine Date and Time into one DateTime.","pd.to_datetime(Date+\" \"+Time, format=\"%d/%m/%Y %H.%M.%S\", errors=\"coerce\")"],["Feature engineering","Extract Hour, Day and Month; drop Date, Time, DateTime.","data[\"DateTime\"].dt.hour / .day / .month"],["Target cleaning","Remove rows with missing CO(GT) or invalid DateTime.","data.dropna(subset=[\"CO(GT)\",\"DateTime\"])"],["Feature / target separation","X = 14 independent variables; y = CO(GT).","X = data.drop(columns=[\"CO(GT)\"])"],["Train / test split","80% training, 20% testing, random split.","train_test_split(X, y, test_size=0.20, random_state=42)"],["Median imputation","Fill remaining gaps in features with the median.","SimpleImputer(strategy=\"median\")"],["Feature scaling","Standardise features (mean 0, std 1).","StandardScaler()"]];
$("tl").innerHTML=S.map(function(s,i){return '<div class="card"><button class="st" aria-expanded="false"><span class="no">Step '+(i+1)+'</span><h3>'+s[0]+'</h3><p>'+s[1]+'</p><div class="more">'+s[2]+'</div></button></div>'}).join("");
$("tl").onclick=function(e){var b=e.target.closest(".st");if(b)b.setAttribute("aria-expanded",b.getAttribute("aria-expanded")!=="true")};
/* metrics */
var R=[["Linear Regression",0.304781,0.469315,0.894254],["Decision Tree",0.341564,0.541665,0.859137],["Random Forest",0.224664,0.353630,0.939961],["Gradient Boosting",0.239650,0.367120,0.935293]];
$("rt").innerHTML=R.map(function(r){return '<tr'+(r[0]==="Random Forest"?' class="best"':'')+'><td>'+r[0]+(r[0]==="Random Forest"?' (best)':'')+'</td><td class="n">'+r[1].toFixed(4)+'</td><td class="n">'+r[2].toFixed(4)+'</td><td class="n">'+r[3].toFixed(4)+'</td></tr>'}).join("");
var tip=$("tip");
function chart(title,k,note,max){var W=320,H=230,pl=40,h=H-60,bw=44,g=(W-pl-10-bw*4)/3,o='<div class="card"><h3 style="font-size:1rem">'+title+'</h3><svg viewBox="0 0 '+W+' '+H+'" width="100%" role="img" aria-label="'+title+' for four models">';
for(var t=0;t<=4;t++){var v=max*t/4,y=10+h-h*t/4;o+='<line x1="'+pl+'" x2="'+(W-6)+'" y1="'+y+'" y2="'+y+'" stroke="currentColor" opacity=".13"/><text x="'+(pl-6)+'" y="'+(y+4)+'" font-size="10" text-anchor="end">'+v.toFixed(2)+'</text>'}
o+='<g class="bars">';R.forEach(function(r,i){var v=r[k],bh=h*v/max,x=pl+i*(bw+g),y=10+h-bh,best=r[0]==="Random Forest";
o+='<rect class="bar" tabindex="0" x="'+x+'" y="'+y+'" width="'+bw+'" height="'+bh+'" rx="5" fill="'+(best?'url(#bg)':'var(--cy)')+'" fill-opacity="'+(best?1:.55)+'" data-t="'+r[0]+': '+v.toFixed(4)+'"/><text x="'+(x+bw/2)+'" y="'+(y-5)+'" font-size="10" text-anchor="middle" style="fill:var(--tx)">'+v.toFixed(3)+'</text><text x="'+(x+bw/2)+'" y="'+(H-30)+'" font-size="9" text-anchor="middle">'+r[0].split(" ")[0]+'</text><text x="'+(x+bw/2)+'" y="'+(H-19)+'" font-size="9" text-anchor="middle">'+(r[0].split(" ")[1]||"")+'</text>'});
return o+'</g><defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#10b981"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs><text x="'+(W/2)+'" y="'+(H-3)+'" font-size="9" text-anchor="middle">'+note+'</text></svg></div>'}
function draw(){$("charts").innerHTML=chart("MAE by model",1,"lower is better",0.4)+chart("RMSE by model",2,"lower is better",0.6)+chart("R² by model",3,"higher is better",1)}
draw();
var cs=$("charts");function show(e){var t=e.target.getAttribute&&e.target.getAttribute("data-t");if(t){tip.textContent=t;tip.style.opacity=1;var x=e.clientX||e.target.getBoundingClientRect().left,y=e.clientY||e.target.getBoundingClientRect().top;tip.style.left=Math.min(x+12,innerWidth-170)+"px";tip.style.top=(y-34)+"px"}else tip.style.opacity=0}
cs.addEventListener("mousemove",show);cs.addEventListener("mouseleave",function(){tip.style.opacity=0});cs.addEventListener("focusin",show);cs.addEventListener("focusout",function(){tip.style.opacity=0});
/* nav highlight */
var secs=[].slice.call(document.querySelectorAll("section[id]")),as=[].slice.call(document.querySelectorAll(".links a"));
addEventListener("scroll",function(){var c="";secs.forEach(function(s){if(s.getBoundingClientRect().top<140)c=s.id});if(c==="winner")c="results";as.forEach(function(a){a.classList.toggle("on",a.getAttribute("href")==="#"+c)})},{passive:true});
/* hero canvas */
(function(){var c=$("cv"),x=c.getContext("2d"),W,H,P=[],still=matchMedia("(prefers-reduced-motion: reduce)").matches;
function rs(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;P=[];for(var i=0;i<Math.min(70,W/16);i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.8+.8})}
function col(a){return root.getAttribute("data-theme")==="light"?"rgba(4,120,87,"+a+")":"rgba(52,211,153,"+a+")"}
function f(){x.clearRect(0,0,W,H);x.strokeStyle=col(.06);x.lineWidth=1;for(var i=0;i<W;i+=48){x.beginPath();x.moveTo(i,0);x.lineTo(i,H);x.stroke()}for(i=0;i<H;i+=48){x.beginPath();x.moveTo(0,i);x.lineTo(W,i);x.stroke()}
P.forEach(function(p,i){if(!still){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1}x.fillStyle=col(.7);x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill();for(var j=i+1;j<P.length;j++){var d=Math.hypot(p.x-P[j].x,p.y-P[j].y);if(d<120){x.strokeStyle=col(.16*(1-d/120));x.beginPath();x.moveTo(p.x,p.y);x.lineTo(P[j].x,P[j].y);x.stroke()}}});
if(!still)requestAnimationFrame(f)}
rs();f();addEventListener("resize",function(){rs();if(still)f()})})();
