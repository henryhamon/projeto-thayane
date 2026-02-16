(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const c of s)if(c.type==="childList")for(const f of c.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function t(s){const c={};return s.integrity&&(c.integrity=s.integrity),s.referrerPolicy&&(c.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?c.credentials="include":s.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(s){if(s.ep)return;s.ep=!0;const c=t(s);fetch(s.href,c)}})();class ba{constructor(){if(ba.instance)return ba.instance;ba.instance=this,this.pyodide=null,this.ready=!1}async init(){this.ready||(console.log("Initializing Pyodide (Python Native Mode)..."),window.loadPyodide||await new Promise((e,t)=>{const r=document.createElement("script");r.src="https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js",r.onload=e,r.onerror=t,document.head.appendChild(r)}),this.pyodide=await window.loadPyodide(),this.ready=!0,console.log("Pyodide Ready."))}getPyodide(){if(!this.ready)throw new Error("Pyodide not initialized. Call init() first.");return this.pyodide}}const vp=new ba;class cv{constructor(){}async runUserCode(e,t){const r=vp.getPyodide();r.globals.set("GAME_MAP_RAW",t);const c=`

class RobertoHardware:
    def __init__(self, map_data):
        self.map = map_data
        self.logs = []
        self.h = len(map_data)
        self.w = len(map_data[0])
        
        # Encontra posicao inicial (2 = CUME)
        self.x = 0
        self.y = 0
        for r in range(self.h):
            for c in range(self.w):
                if self.map[r][c] == 2:
                    self.x = c
                    self.y = r
        
        # Direcao: 0=N, 1=E, 2=S, 3=W (Baseado no Rover.js)
        self.dir = 0 

    def mover(self):
        # Atualiza posicao virtual
        dx, dy = self._get_delta()
        self.x += dx
        self.y += dy
        self.logs.append({'action': 'MOVE'})

    def virar_esquerda(self):
        self.dir = (self.dir - 1) % 4
        self.logs.append({'action': 'TURN_LEFT'})

    def virar_direita(self):
        self.dir = (self.dir + 1) % 4
        self.logs.append({'action': 'TURN_RIGHT'})

    def sensor(self):
        # Olha para o bloco a frente
        dx, dy = self._get_delta()
        nx, ny = self.x + dx, self.y + dy
        
        # Limites do mapa
        if nx < 0 or ny < 0 or nx >= self.w or ny >= self.h:
            return 'PAREDE'
            
        tile = self.map[ny][nx]
        if tile == 1: return 'PAREDE' # Pedra
        if tile == 3: return 'SAIDA'  # Fazenda
        return 'LIVRE'

    def escreva(self, msg):
        # Log que aparece no console JS
        self.logs.append({'action': 'PRINT', 'message': str(msg)})

    def _get_delta(self):
        # N(-Z/row), S(+Z/row), E(+X/col), W(-X/col)
        # No MapData: row é Y(Z visual), col é X
        if self.dir == 0: return 0, -1 # N
        if self.dir == 1: return 1, 0  # E
        if self.dir == 2: return 0, 1  # S
        if self.dir == 3: return -1, 0 # W
        return 0, 0

# Instancia o hardware passando o mapa injetado
roberto = RobertoHardware(GAME_MAP_RAW)


# --- CODIGO DO ALUNO ---
${e}
`;try{r.runPython(c)}catch(m){throw console.error("Runtime Error:",m),new Error(`Erro Python: ${m.message}`)}const f=r.globals.get("roberto");if(!f)throw new Error("Erro Crítico: Roberto sumiu da memória.");const h=f.logs,p=h.toJs({dict_converter:Object.fromEntries});return h.destroy(),f.destroy(),p}}const uv=new cv;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const su="160",fv=0,xh=1,hv=2,_p=1,dv=2,Ai=3,Pi=0,Nn=1,li=2,Qi=0,Ss=1,yh=2,Sh=3,Mh=4,pv=5,Sr=100,mv=101,gv=102,Th=103,bh=104,vv=200,_v=201,xv=202,yv=203,Vc=204,Xc=205,Sv=206,Mv=207,Tv=208,bv=209,Ev=210,Av=211,wv=212,Cv=213,Rv=214,Lv=0,Pv=1,Dv=2,qo=3,Iv=4,Nv=5,Uv=6,Ov=7,$o=0,Fv=1,Bv=2,$i=0,kv=1,Hv=2,zv=3,Gv=4,Wv=5,Vv=6,Eh="attached",Xv="detached",xp=300,bs=301,Es=302,qc=303,Yc=304,el=306,As=1e3,Gn=1001,Yo=1002,fn=1003,Kc=1004,Vo=1005,Dn=1006,yp=1007,wr=1008,er=1009,qv=1010,Yv=1011,au=1012,Sp=1013,Zi=1014,wi=1015,Pa=1016,Mp=1017,Tp=1018,br=1020,Kv=1021,Wn=1023,jv=1024,Zv=1025,Er=1026,ws=1027,Jv=1028,bp=1029,Qv=1030,Ep=1031,Ap=1033,rc=33776,sc=33777,ac=33778,oc=33779,Ah=35840,wh=35841,Ch=35842,Rh=35843,wp=36196,Lh=37492,Ph=37496,Dh=37808,Ih=37809,Nh=37810,Uh=37811,Oh=37812,Fh=37813,Bh=37814,kh=37815,Hh=37816,zh=37817,Gh=37818,Wh=37819,Vh=37820,Xh=37821,lc=36492,qh=36494,Yh=36495,$v=36283,Kh=36284,jh=36285,Zh=36286,Da=2300,Cs=2301,cc=2302,Jh=2400,Qh=2401,$h=2402,e0=2500,t0=0,Cp=1,jc=2,Rp=3e3,Ar=3001,n0=3200,i0=3201,tl=0,r0=1,Vn="",Wt="srgb",hn="srgb-linear",ou="display-p3",nl="display-p3-linear",Ko="linear",Ot="srgb",jo="rec709",Zo="p3",ns=7680,ed=519,s0=512,a0=513,o0=514,Lp=515,l0=516,c0=517,u0=518,f0=519,Zc=35044,td="300 es",Jc=1035,Ci=2e3,Jo=2001;class Us{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const r=this._listeners;r[e]===void 0&&(r[e]=[]),r[e].indexOf(t)===-1&&r[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const r=this._listeners;return r[e]!==void 0&&r[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const c=s.indexOf(t);c!==-1&&s.splice(c,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const r=this._listeners[e.type];if(r!==void 0){e.target=this;const s=r.slice(0);for(let c=0,f=s.length;c<f;c++)s[c].call(this,e);e.target=null}}}const _n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nd=1234567;const Ea=Math.PI/180,Rs=180/Math.PI;function ti(){const l=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(_n[l&255]+_n[l>>8&255]+_n[l>>16&255]+_n[l>>24&255]+"-"+_n[e&255]+_n[e>>8&255]+"-"+_n[e>>16&15|64]+_n[e>>24&255]+"-"+_n[t&63|128]+_n[t>>8&255]+"-"+_n[t>>16&255]+_n[t>>24&255]+_n[r&255]+_n[r>>8&255]+_n[r>>16&255]+_n[r>>24&255]).toLowerCase()}function yn(l,e,t){return Math.max(e,Math.min(t,l))}function lu(l,e){return(l%e+e)%e}function h0(l,e,t,r,s){return r+(l-e)*(s-r)/(t-e)}function d0(l,e,t){return l!==e?(t-l)/(e-l):0}function Aa(l,e,t){return(1-t)*l+t*e}function p0(l,e,t,r){return Aa(l,e,1-Math.exp(-t*r))}function m0(l,e=1){return e-Math.abs(lu(l,e*2)-e)}function g0(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*(3-2*l))}function v0(l,e,t){return l<=e?0:l>=t?1:(l=(l-e)/(t-e),l*l*l*(l*(l*6-15)+10))}function _0(l,e){return l+Math.floor(Math.random()*(e-l+1))}function x0(l,e){return l+Math.random()*(e-l)}function y0(l){return l*(.5-Math.random())}function S0(l){l!==void 0&&(nd=l);let e=nd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function M0(l){return l*Ea}function T0(l){return l*Rs}function Qc(l){return(l&l-1)===0&&l!==0}function b0(l){return Math.pow(2,Math.ceil(Math.log(l)/Math.LN2))}function Qo(l){return Math.pow(2,Math.floor(Math.log(l)/Math.LN2))}function E0(l,e,t,r,s){const c=Math.cos,f=Math.sin,h=c(t/2),p=f(t/2),m=c((e+r)/2),g=f((e+r)/2),_=c((e-r)/2),x=f((e-r)/2),T=c((r-e)/2),A=f((r-e)/2);switch(s){case"XYX":l.set(h*g,p*_,p*x,h*m);break;case"YZY":l.set(p*x,h*g,p*_,h*m);break;case"ZXZ":l.set(p*_,p*x,h*g,h*m);break;case"XZX":l.set(h*g,p*A,p*T,h*m);break;case"YXY":l.set(p*T,h*g,p*A,h*m);break;case"ZYZ":l.set(p*A,p*T,h*g,h*m);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ci(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return l/4294967295;case Uint16Array:return l/65535;case Uint8Array:return l/255;case Int32Array:return Math.max(l/2147483647,-1);case Int16Array:return Math.max(l/32767,-1);case Int8Array:return Math.max(l/127,-1);default:throw new Error("Invalid component type.")}}function Rt(l,e){switch(e.constructor){case Float32Array:return l;case Uint32Array:return Math.round(l*4294967295);case Uint16Array:return Math.round(l*65535);case Uint8Array:return Math.round(l*255);case Int32Array:return Math.round(l*2147483647);case Int16Array:return Math.round(l*32767);case Int8Array:return Math.round(l*127);default:throw new Error("Invalid component type.")}}const A0={DEG2RAD:Ea,RAD2DEG:Rs,generateUUID:ti,clamp:yn,euclideanModulo:lu,mapLinear:h0,inverseLerp:d0,lerp:Aa,damp:p0,pingpong:m0,smoothstep:g0,smootherstep:v0,randInt:_0,randFloat:x0,randFloatSpread:y0,seededRandom:S0,degToRad:M0,radToDeg:T0,isPowerOfTwo:Qc,ceilPowerOfTwo:b0,floorPowerOfTwo:Qo,setQuaternionFromProperEuler:E0,normalize:Rt,denormalize:ci};class _t{constructor(e=0,t=0){_t.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,r=this.y,s=e.elements;return this.x=s[0]*t+s[3]*r+s[6],this.y=s[1]*t+s[4]*r+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(yn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y;return t*t+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const r=Math.cos(t),s=Math.sin(t),c=this.x-e.x,f=this.y-e.y;return this.x=c*r-f*s+e.x,this.y=c*s+f*r+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vt{constructor(e,t,r,s,c,f,h,p,m){vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,r,s,c,f,h,p,m)}set(e,t,r,s,c,f,h,p,m){const g=this.elements;return g[0]=e,g[1]=s,g[2]=h,g[3]=t,g[4]=c,g[5]=p,g[6]=r,g[7]=f,g[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],this}extractBasis(e,t,r){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),r.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,c=this.elements,f=r[0],h=r[3],p=r[6],m=r[1],g=r[4],_=r[7],x=r[2],T=r[5],A=r[8],w=s[0],M=s[3],S=s[6],I=s[1],R=s[4],N=s[7],W=s[2],k=s[5],B=s[8];return c[0]=f*w+h*I+p*W,c[3]=f*M+h*R+p*k,c[6]=f*S+h*N+p*B,c[1]=m*w+g*I+_*W,c[4]=m*M+g*R+_*k,c[7]=m*S+g*N+_*B,c[2]=x*w+T*I+A*W,c[5]=x*M+T*R+A*k,c[8]=x*S+T*N+A*B,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[1],s=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],g=e[8];return t*f*g-t*h*m-r*c*g+r*h*p+s*c*m-s*f*p}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],g=e[8],_=g*f-h*m,x=h*p-g*c,T=m*c-f*p,A=t*_+r*x+s*T;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const w=1/A;return e[0]=_*w,e[1]=(s*m-g*r)*w,e[2]=(h*r-s*f)*w,e[3]=x*w,e[4]=(g*t-s*p)*w,e[5]=(s*c-h*t)*w,e[6]=T*w,e[7]=(r*p-m*t)*w,e[8]=(f*t-r*c)*w,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,r,s,c,f,h){const p=Math.cos(c),m=Math.sin(c);return this.set(r*p,r*m,-r*(p*f+m*h)+f+e,-s*m,s*p,-s*(-m*f+p*h)+h+t,0,0,1),this}scale(e,t){return this.premultiply(uc.makeScale(e,t)),this}rotate(e){return this.premultiply(uc.makeRotation(-e)),this}translate(e,t){return this.premultiply(uc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,r,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<9;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<9;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uc=new vt;function Pp(l){for(let e=l.length-1;e>=0;--e)if(l[e]>=65535)return!0;return!1}function Ia(l){return document.createElementNS("http://www.w3.org/1999/xhtml",l)}function w0(){const l=Ia("canvas");return l.style.display="block",l}const id={};function wa(l){l in id||(id[l]=!0,console.warn(l))}const rd=new vt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),sd=new vt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),go={[hn]:{transfer:Ko,primaries:jo,toReference:l=>l,fromReference:l=>l},[Wt]:{transfer:Ot,primaries:jo,toReference:l=>l.convertSRGBToLinear(),fromReference:l=>l.convertLinearToSRGB()},[nl]:{transfer:Ko,primaries:Zo,toReference:l=>l.applyMatrix3(sd),fromReference:l=>l.applyMatrix3(rd)},[ou]:{transfer:Ot,primaries:Zo,toReference:l=>l.convertSRGBToLinear().applyMatrix3(sd),fromReference:l=>l.applyMatrix3(rd).convertLinearToSRGB()}},C0=new Set([hn,nl]),At={enabled:!0,_workingColorSpace:hn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(l){if(!C0.has(l))throw new Error(`Unsupported working color space, "${l}".`);this._workingColorSpace=l},convert:function(l,e,t){if(this.enabled===!1||e===t||!e||!t)return l;const r=go[e].toReference,s=go[t].fromReference;return s(r(l))},fromWorkingColorSpace:function(l,e){return this.convert(l,this._workingColorSpace,e)},toWorkingColorSpace:function(l,e){return this.convert(l,e,this._workingColorSpace)},getPrimaries:function(l){return go[l].primaries},getTransfer:function(l){return l===Vn?Ko:go[l].transfer}};function Ms(l){return l<.04045?l*.0773993808:Math.pow(l*.9478672986+.0521327014,2.4)}function fc(l){return l<.0031308?l*12.92:1.055*Math.pow(l,.41666)-.055}let is;class Dp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{is===void 0&&(is=Ia("canvas")),is.width=e.width,is.height=e.height;const r=is.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),t=is}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ia("canvas");t.width=e.width,t.height=e.height;const r=t.getContext("2d");r.drawImage(e,0,0,e.width,e.height);const s=r.getImageData(0,0,e.width,e.height),c=s.data;for(let f=0;f<c.length;f++)c[f]=Ms(c[f]/255)*255;return r.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let r=0;r<t.length;r++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[r]=Math.floor(Ms(t[r]/255)*255):t[r]=Ms(t[r]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let R0=0;class Ip{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:R0++}),this.uuid=ti(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const r={uuid:this.uuid,url:""},s=this.data;if(s!==null){let c;if(Array.isArray(s)){c=[];for(let f=0,h=s.length;f<h;f++)s[f].isDataTexture?c.push(hc(s[f].image)):c.push(hc(s[f]))}else c=hc(s);r.url=c}return t||(e.images[this.uuid]=r),r}}function hc(l){return typeof HTMLImageElement<"u"&&l instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&l instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&l instanceof ImageBitmap?Dp.getDataURL(l):l.data?{data:Array.from(l.data),width:l.width,height:l.height,type:l.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let L0=0;class mn extends Us{constructor(e=mn.DEFAULT_IMAGE,t=mn.DEFAULT_MAPPING,r=Gn,s=Gn,c=Dn,f=wr,h=Wn,p=er,m=mn.DEFAULT_ANISOTROPY,g=Vn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:L0++}),this.uuid=ti(),this.name="",this.source=new Ip(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=r,this.wrapT=s,this.magFilter=c,this.minFilter=f,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof g=="string"?this.colorSpace=g:(wa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=g===Ar?Wt:Vn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const r={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(r.userData=this.userData),t||(e.textures[this.uuid]=r),r}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==xp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case As:e.x=e.x-Math.floor(e.x);break;case Gn:e.x=e.x<0?0:1;break;case Yo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case As:e.y=e.y-Math.floor(e.y);break;case Gn:e.y=e.y<0?0:1;break;case Yo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return wa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Wt?Ar:Rp}set encoding(e){wa("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Ar?Wt:Vn}}mn.DEFAULT_IMAGE=null;mn.DEFAULT_MAPPING=xp;mn.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,t=0,r=0,s=1){Dt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=r,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,r,s){return this.x=e,this.y=t,this.z=r,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,c=this.w,f=e.elements;return this.x=f[0]*t+f[4]*r+f[8]*s+f[12]*c,this.y=f[1]*t+f[5]*r+f[9]*s+f[13]*c,this.z=f[2]*t+f[6]*r+f[10]*s+f[14]*c,this.w=f[3]*t+f[7]*r+f[11]*s+f[15]*c,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,r,s,c;const p=e.elements,m=p[0],g=p[4],_=p[8],x=p[1],T=p[5],A=p[9],w=p[2],M=p[6],S=p[10];if(Math.abs(g-x)<.01&&Math.abs(_-w)<.01&&Math.abs(A-M)<.01){if(Math.abs(g+x)<.1&&Math.abs(_+w)<.1&&Math.abs(A+M)<.1&&Math.abs(m+T+S-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const R=(m+1)/2,N=(T+1)/2,W=(S+1)/2,k=(g+x)/4,B=(_+w)/4,ae=(A+M)/4;return R>N&&R>W?R<.01?(r=0,s=.707106781,c=.707106781):(r=Math.sqrt(R),s=k/r,c=B/r):N>W?N<.01?(r=.707106781,s=0,c=.707106781):(s=Math.sqrt(N),r=k/s,c=ae/s):W<.01?(r=.707106781,s=.707106781,c=0):(c=Math.sqrt(W),r=B/c,s=ae/c),this.set(r,s,c,t),this}let I=Math.sqrt((M-A)*(M-A)+(_-w)*(_-w)+(x-g)*(x-g));return Math.abs(I)<.001&&(I=1),this.x=(M-A)/I,this.y=(_-w)/I,this.z=(x-g)/I,this.w=Math.acos((m+T+S-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this.w=e.w+(t.w-e.w)*r,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class P0 extends Us{constructor(e=1,t=1,r={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Dt(0,0,e,t),this.scissorTest=!1,this.viewport=new Dt(0,0,e,t);const s={width:e,height:t,depth:1};r.encoding!==void 0&&(wa("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),r.colorSpace=r.encoding===Ar?Wt:Vn),r=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},r),this.texture=new mn(s,r.mapping,r.wrapS,r.wrapT,r.magFilter,r.minFilter,r.format,r.type,r.anisotropy,r.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=r.generateMipmaps,this.texture.internalFormat=r.internalFormat,this.depthBuffer=r.depthBuffer,this.stencilBuffer=r.stencilBuffer,this.depthTexture=r.depthTexture,this.samples=r.samples}setSize(e,t,r=1){(this.width!==e||this.height!==t||this.depth!==r)&&(this.width=e,this.height=t,this.depth=r,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=r,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Ip(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Cr extends P0{constructor(e=1,t=1,r={}){super(e,t,r),this.isWebGLRenderTarget=!0}}class Np extends mn{constructor(e=null,t=1,r=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class D0 extends mn{constructor(e=null,t=1,r=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:s},this.magFilter=fn,this.minFilter=fn,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tr{constructor(e=0,t=0,r=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=r,this._w=s}static slerpFlat(e,t,r,s,c,f,h){let p=r[s+0],m=r[s+1],g=r[s+2],_=r[s+3];const x=c[f+0],T=c[f+1],A=c[f+2],w=c[f+3];if(h===0){e[t+0]=p,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(h===1){e[t+0]=x,e[t+1]=T,e[t+2]=A,e[t+3]=w;return}if(_!==w||p!==x||m!==T||g!==A){let M=1-h;const S=p*x+m*T+g*A+_*w,I=S>=0?1:-1,R=1-S*S;if(R>Number.EPSILON){const W=Math.sqrt(R),k=Math.atan2(W,S*I);M=Math.sin(M*k)/W,h=Math.sin(h*k)/W}const N=h*I;if(p=p*M+x*N,m=m*M+T*N,g=g*M+A*N,_=_*M+w*N,M===1-h){const W=1/Math.sqrt(p*p+m*m+g*g+_*_);p*=W,m*=W,g*=W,_*=W}}e[t]=p,e[t+1]=m,e[t+2]=g,e[t+3]=_}static multiplyQuaternionsFlat(e,t,r,s,c,f){const h=r[s],p=r[s+1],m=r[s+2],g=r[s+3],_=c[f],x=c[f+1],T=c[f+2],A=c[f+3];return e[t]=h*A+g*_+p*T-m*x,e[t+1]=p*A+g*x+m*_-h*T,e[t+2]=m*A+g*T+h*x-p*_,e[t+3]=g*A-h*_-p*x-m*T,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,r,s){return this._x=e,this._y=t,this._z=r,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const r=e._x,s=e._y,c=e._z,f=e._order,h=Math.cos,p=Math.sin,m=h(r/2),g=h(s/2),_=h(c/2),x=p(r/2),T=p(s/2),A=p(c/2);switch(f){case"XYZ":this._x=x*g*_+m*T*A,this._y=m*T*_-x*g*A,this._z=m*g*A+x*T*_,this._w=m*g*_-x*T*A;break;case"YXZ":this._x=x*g*_+m*T*A,this._y=m*T*_-x*g*A,this._z=m*g*A-x*T*_,this._w=m*g*_+x*T*A;break;case"ZXY":this._x=x*g*_-m*T*A,this._y=m*T*_+x*g*A,this._z=m*g*A+x*T*_,this._w=m*g*_-x*T*A;break;case"ZYX":this._x=x*g*_-m*T*A,this._y=m*T*_+x*g*A,this._z=m*g*A-x*T*_,this._w=m*g*_+x*T*A;break;case"YZX":this._x=x*g*_+m*T*A,this._y=m*T*_+x*g*A,this._z=m*g*A-x*T*_,this._w=m*g*_-x*T*A;break;case"XZY":this._x=x*g*_-m*T*A,this._y=m*T*_-x*g*A,this._z=m*g*A+x*T*_,this._w=m*g*_+x*T*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+f)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const r=t/2,s=Math.sin(r);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(r),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,r=t[0],s=t[4],c=t[8],f=t[1],h=t[5],p=t[9],m=t[2],g=t[6],_=t[10],x=r+h+_;if(x>0){const T=.5/Math.sqrt(x+1);this._w=.25/T,this._x=(g-p)*T,this._y=(c-m)*T,this._z=(f-s)*T}else if(r>h&&r>_){const T=2*Math.sqrt(1+r-h-_);this._w=(g-p)/T,this._x=.25*T,this._y=(s+f)/T,this._z=(c+m)/T}else if(h>_){const T=2*Math.sqrt(1+h-r-_);this._w=(c-m)/T,this._x=(s+f)/T,this._y=.25*T,this._z=(p+g)/T}else{const T=2*Math.sqrt(1+_-r-h);this._w=(f-s)/T,this._x=(c+m)/T,this._y=(p+g)/T,this._z=.25*T}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let r=e.dot(t)+1;return r<Number.EPSILON?(r=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=r):(this._x=0,this._y=-e.z,this._z=e.y,this._w=r)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=r),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yn(this.dot(e),-1,1)))}rotateTowards(e,t){const r=this.angleTo(e);if(r===0)return this;const s=Math.min(1,t/r);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const r=e._x,s=e._y,c=e._z,f=e._w,h=t._x,p=t._y,m=t._z,g=t._w;return this._x=r*g+f*h+s*m-c*p,this._y=s*g+f*p+c*h-r*m,this._z=c*g+f*m+r*p-s*h,this._w=f*g-r*h-s*p-c*m,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const r=this._x,s=this._y,c=this._z,f=this._w;let h=f*e._w+r*e._x+s*e._y+c*e._z;if(h<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,h=-h):this.copy(e),h>=1)return this._w=f,this._x=r,this._y=s,this._z=c,this;const p=1-h*h;if(p<=Number.EPSILON){const T=1-t;return this._w=T*f+t*this._w,this._x=T*r+t*this._x,this._y=T*s+t*this._y,this._z=T*c+t*this._z,this.normalize(),this}const m=Math.sqrt(p),g=Math.atan2(m,h),_=Math.sin((1-t)*g)/m,x=Math.sin(t*g)/m;return this._w=f*_+this._w*x,this._x=r*_+this._x*x,this._y=s*_+this._y*x,this._z=c*_+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,t,r){return this.copy(e).slerp(t,r)}random(){const e=Math.random(),t=Math.sqrt(1-e),r=Math.sqrt(e),s=2*Math.PI*Math.random(),c=2*Math.PI*Math.random();return this.set(t*Math.cos(s),r*Math.sin(c),r*Math.cos(c),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(e=0,t=0,r=0){Y.prototype.isVector3=!0,this.x=e,this.y=t,this.z=r}set(e,t,r){return r===void 0&&(r=this.z),this.x=e,this.y=t,this.z=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ad.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ad.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,r=this.y,s=this.z,c=e.elements;return this.x=c[0]*t+c[3]*r+c[6]*s,this.y=c[1]*t+c[4]*r+c[7]*s,this.z=c[2]*t+c[5]*r+c[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,r=this.y,s=this.z,c=e.elements,f=1/(c[3]*t+c[7]*r+c[11]*s+c[15]);return this.x=(c[0]*t+c[4]*r+c[8]*s+c[12])*f,this.y=(c[1]*t+c[5]*r+c[9]*s+c[13])*f,this.z=(c[2]*t+c[6]*r+c[10]*s+c[14])*f,this}applyQuaternion(e){const t=this.x,r=this.y,s=this.z,c=e.x,f=e.y,h=e.z,p=e.w,m=2*(f*s-h*r),g=2*(h*t-c*s),_=2*(c*r-f*t);return this.x=t+p*m+f*_-h*g,this.y=r+p*g+h*m-c*_,this.z=s+p*_+c*g-f*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,r=this.y,s=this.z,c=e.elements;return this.x=c[0]*t+c[4]*r+c[8]*s,this.y=c[1]*t+c[5]*r+c[9]*s,this.z=c[2]*t+c[6]*r+c[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const r=this.length();return this.divideScalar(r||1).multiplyScalar(Math.max(e,Math.min(t,r)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,r){return this.x=e.x+(t.x-e.x)*r,this.y=e.y+(t.y-e.y)*r,this.z=e.z+(t.z-e.z)*r,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const r=e.x,s=e.y,c=e.z,f=t.x,h=t.y,p=t.z;return this.x=s*p-c*h,this.y=c*f-r*p,this.z=r*h-s*f,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const r=e.dot(this)/t;return this.copy(e).multiplyScalar(r)}projectOnPlane(e){return dc.copy(this).projectOnVector(e),this.sub(dc)}reflect(e){return this.sub(dc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const r=this.dot(e)/t;return Math.acos(yn(r,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,r=this.y-e.y,s=this.z-e.z;return t*t+r*r+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,r){const s=Math.sin(t)*e;return this.x=s*Math.sin(r),this.y=Math.cos(t)*e,this.z=s*Math.cos(r),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,r){return this.x=e*Math.sin(t),this.y=r,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),r=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=r,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,r=Math.sqrt(1-e**2);return this.x=r*Math.cos(t),this.y=r*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const dc=new Y,ad=new tr;class Di{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,r=e.count;t<r;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,r=e.length;t<r;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const r=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(r),this.max.copy(e).add(r),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const r=e.geometry;if(r!==void 0){const c=r.getAttribute("position");if(t===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let f=0,h=c.count;f<h;f++)e.isMesh===!0?e.getVertexPosition(f,Jn):Jn.fromBufferAttribute(c,f),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(r.boundingBox===null&&r.computeBoundingBox(),vo.copy(r.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}const s=e.children;for(let c=0,f=s.length;c<f;c++)this.expandByObject(s[c],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,r;return e.normal.x>0?(t=e.normal.x*this.min.x,r=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,r=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,r+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,r+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,r+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,r+=e.normal.z*this.min.z),t<=-e.constant&&r>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ga),_o.subVectors(this.max,ga),rs.subVectors(e.a,ga),ss.subVectors(e.b,ga),as.subVectors(e.c,ga),Wi.subVectors(ss,rs),Vi.subVectors(as,ss),pr.subVectors(rs,as);let t=[0,-Wi.z,Wi.y,0,-Vi.z,Vi.y,0,-pr.z,pr.y,Wi.z,0,-Wi.x,Vi.z,0,-Vi.x,pr.z,0,-pr.x,-Wi.y,Wi.x,0,-Vi.y,Vi.x,0,-pr.y,pr.x,0];return!pc(t,rs,ss,as,_o)||(t=[1,0,0,0,1,0,0,0,1],!pc(t,rs,ss,as,_o))?!1:(xo.crossVectors(Wi,Vi),t=[xo.x,xo.y,xo.z],pc(t,rs,ss,as,_o))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const yi=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Jn=new Y,vo=new Di,rs=new Y,ss=new Y,as=new Y,Wi=new Y,Vi=new Y,pr=new Y,ga=new Y,_o=new Y,xo=new Y,mr=new Y;function pc(l,e,t,r,s){for(let c=0,f=l.length-3;c<=f;c+=3){mr.fromArray(l,c);const h=s.x*Math.abs(mr.x)+s.y*Math.abs(mr.y)+s.z*Math.abs(mr.z),p=e.dot(mr),m=t.dot(mr),g=r.dot(mr);if(Math.max(-Math.max(p,m,g),Math.min(p,m,g))>h)return!1}return!0}const I0=new Di,va=new Y,mc=new Y;class ui{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const r=this.center;t!==void 0?r.copy(t):I0.setFromPoints(e).getCenter(r);let s=0;for(let c=0,f=e.length;c<f;c++)s=Math.max(s,r.distanceToSquared(e[c]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const r=this.center.distanceToSquared(e);return t.copy(e),r>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;va.subVectors(e,this.center);const t=va.lengthSq();if(t>this.radius*this.radius){const r=Math.sqrt(t),s=(r-this.radius)*.5;this.center.addScaledVector(va,s/r),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(mc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(va.copy(e.center).add(mc)),this.expandByPoint(va.copy(e.center).sub(mc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Si=new Y,gc=new Y,yo=new Y,Xi=new Y,vc=new Y,So=new Y,_c=new Y;class il{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const r=t.dot(this.direction);return r<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,r)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Si.copy(this.origin).addScaledVector(this.direction,t),Si.distanceToSquared(e))}distanceSqToSegment(e,t,r,s){gc.copy(e).add(t).multiplyScalar(.5),yo.copy(t).sub(e).normalize(),Xi.copy(this.origin).sub(gc);const c=e.distanceTo(t)*.5,f=-this.direction.dot(yo),h=Xi.dot(this.direction),p=-Xi.dot(yo),m=Xi.lengthSq(),g=Math.abs(1-f*f);let _,x,T,A;if(g>0)if(_=f*p-h,x=f*h-p,A=c*g,_>=0)if(x>=-A)if(x<=A){const w=1/g;_*=w,x*=w,T=_*(_+f*x+2*h)+x*(f*_+x+2*p)+m}else x=c,_=Math.max(0,-(f*x+h)),T=-_*_+x*(x+2*p)+m;else x=-c,_=Math.max(0,-(f*x+h)),T=-_*_+x*(x+2*p)+m;else x<=-A?(_=Math.max(0,-(-f*c+h)),x=_>0?-c:Math.min(Math.max(-c,-p),c),T=-_*_+x*(x+2*p)+m):x<=A?(_=0,x=Math.min(Math.max(-c,-p),c),T=x*(x+2*p)+m):(_=Math.max(0,-(f*c+h)),x=_>0?c:Math.min(Math.max(-c,-p),c),T=-_*_+x*(x+2*p)+m);else x=f>0?-c:c,_=Math.max(0,-(f*x+h)),T=-_*_+x*(x+2*p)+m;return r&&r.copy(this.origin).addScaledVector(this.direction,_),s&&s.copy(gc).addScaledVector(yo,x),T}intersectSphere(e,t){Si.subVectors(e.center,this.origin);const r=Si.dot(this.direction),s=Si.dot(Si)-r*r,c=e.radius*e.radius;if(s>c)return null;const f=Math.sqrt(c-s),h=r-f,p=r+f;return p<0?null:h<0?this.at(p,t):this.at(h,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const r=-(this.origin.dot(e.normal)+e.constant)/t;return r>=0?r:null}intersectPlane(e,t){const r=this.distanceToPlane(e);return r===null?null:this.at(r,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let r,s,c,f,h,p;const m=1/this.direction.x,g=1/this.direction.y,_=1/this.direction.z,x=this.origin;return m>=0?(r=(e.min.x-x.x)*m,s=(e.max.x-x.x)*m):(r=(e.max.x-x.x)*m,s=(e.min.x-x.x)*m),g>=0?(c=(e.min.y-x.y)*g,f=(e.max.y-x.y)*g):(c=(e.max.y-x.y)*g,f=(e.min.y-x.y)*g),r>f||c>s||((c>r||isNaN(r))&&(r=c),(f<s||isNaN(s))&&(s=f),_>=0?(h=(e.min.z-x.z)*_,p=(e.max.z-x.z)*_):(h=(e.max.z-x.z)*_,p=(e.min.z-x.z)*_),r>p||h>s)||((h>r||r!==r)&&(r=h),(p<s||s!==s)&&(s=p),s<0)?null:this.at(r>=0?r:s,t)}intersectsBox(e){return this.intersectBox(e,Si)!==null}intersectTriangle(e,t,r,s,c){vc.subVectors(t,e),So.subVectors(r,e),_c.crossVectors(vc,So);let f=this.direction.dot(_c),h;if(f>0){if(s)return null;h=1}else if(f<0)h=-1,f=-f;else return null;Xi.subVectors(this.origin,e);const p=h*this.direction.dot(So.crossVectors(Xi,So));if(p<0)return null;const m=h*this.direction.dot(vc.cross(Xi));if(m<0||p+m>f)return null;const g=-h*Xi.dot(_c);return g<0?null:this.at(g/f,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,r,s,c,f,h,p,m,g,_,x,T,A,w,M){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,r,s,c,f,h,p,m,g,_,x,T,A,w,M)}set(e,t,r,s,c,f,h,p,m,g,_,x,T,A,w,M){const S=this.elements;return S[0]=e,S[4]=t,S[8]=r,S[12]=s,S[1]=c,S[5]=f,S[9]=h,S[13]=p,S[2]=m,S[6]=g,S[10]=_,S[14]=x,S[3]=T,S[7]=A,S[11]=w,S[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,r=e.elements;return t[0]=r[0],t[1]=r[1],t[2]=r[2],t[3]=r[3],t[4]=r[4],t[5]=r[5],t[6]=r[6],t[7]=r[7],t[8]=r[8],t[9]=r[9],t[10]=r[10],t[11]=r[11],t[12]=r[12],t[13]=r[13],t[14]=r[14],t[15]=r[15],this}copyPosition(e){const t=this.elements,r=e.elements;return t[12]=r[12],t[13]=r[13],t[14]=r[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,r){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),r.setFromMatrixColumn(this,2),this}makeBasis(e,t,r){return this.set(e.x,t.x,r.x,0,e.y,t.y,r.y,0,e.z,t.z,r.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,r=e.elements,s=1/os.setFromMatrixColumn(e,0).length(),c=1/os.setFromMatrixColumn(e,1).length(),f=1/os.setFromMatrixColumn(e,2).length();return t[0]=r[0]*s,t[1]=r[1]*s,t[2]=r[2]*s,t[3]=0,t[4]=r[4]*c,t[5]=r[5]*c,t[6]=r[6]*c,t[7]=0,t[8]=r[8]*f,t[9]=r[9]*f,t[10]=r[10]*f,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,r=e.x,s=e.y,c=e.z,f=Math.cos(r),h=Math.sin(r),p=Math.cos(s),m=Math.sin(s),g=Math.cos(c),_=Math.sin(c);if(e.order==="XYZ"){const x=f*g,T=f*_,A=h*g,w=h*_;t[0]=p*g,t[4]=-p*_,t[8]=m,t[1]=T+A*m,t[5]=x-w*m,t[9]=-h*p,t[2]=w-x*m,t[6]=A+T*m,t[10]=f*p}else if(e.order==="YXZ"){const x=p*g,T=p*_,A=m*g,w=m*_;t[0]=x+w*h,t[4]=A*h-T,t[8]=f*m,t[1]=f*_,t[5]=f*g,t[9]=-h,t[2]=T*h-A,t[6]=w+x*h,t[10]=f*p}else if(e.order==="ZXY"){const x=p*g,T=p*_,A=m*g,w=m*_;t[0]=x-w*h,t[4]=-f*_,t[8]=A+T*h,t[1]=T+A*h,t[5]=f*g,t[9]=w-x*h,t[2]=-f*m,t[6]=h,t[10]=f*p}else if(e.order==="ZYX"){const x=f*g,T=f*_,A=h*g,w=h*_;t[0]=p*g,t[4]=A*m-T,t[8]=x*m+w,t[1]=p*_,t[5]=w*m+x,t[9]=T*m-A,t[2]=-m,t[6]=h*p,t[10]=f*p}else if(e.order==="YZX"){const x=f*p,T=f*m,A=h*p,w=h*m;t[0]=p*g,t[4]=w-x*_,t[8]=A*_+T,t[1]=_,t[5]=f*g,t[9]=-h*g,t[2]=-m*g,t[6]=T*_+A,t[10]=x-w*_}else if(e.order==="XZY"){const x=f*p,T=f*m,A=h*p,w=h*m;t[0]=p*g,t[4]=-_,t[8]=m*g,t[1]=x*_+w,t[5]=f*g,t[9]=T*_-A,t[2]=A*_-T,t[6]=h*g,t[10]=w*_+x}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(N0,e,U0)}lookAt(e,t,r){const s=this.elements;return Fn.subVectors(e,t),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),qi.crossVectors(r,Fn),qi.lengthSq()===0&&(Math.abs(r.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),qi.crossVectors(r,Fn)),qi.normalize(),Mo.crossVectors(Fn,qi),s[0]=qi.x,s[4]=Mo.x,s[8]=Fn.x,s[1]=qi.y,s[5]=Mo.y,s[9]=Fn.y,s[2]=qi.z,s[6]=Mo.z,s[10]=Fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const r=e.elements,s=t.elements,c=this.elements,f=r[0],h=r[4],p=r[8],m=r[12],g=r[1],_=r[5],x=r[9],T=r[13],A=r[2],w=r[6],M=r[10],S=r[14],I=r[3],R=r[7],N=r[11],W=r[15],k=s[0],B=s[4],ae=s[8],L=s[12],O=s[1],se=s[5],oe=s[9],pe=s[13],V=s[2],X=s[6],H=s[10],K=s[14],Q=s[3],Z=s[7],le=s[11],de=s[15];return c[0]=f*k+h*O+p*V+m*Q,c[4]=f*B+h*se+p*X+m*Z,c[8]=f*ae+h*oe+p*H+m*le,c[12]=f*L+h*pe+p*K+m*de,c[1]=g*k+_*O+x*V+T*Q,c[5]=g*B+_*se+x*X+T*Z,c[9]=g*ae+_*oe+x*H+T*le,c[13]=g*L+_*pe+x*K+T*de,c[2]=A*k+w*O+M*V+S*Q,c[6]=A*B+w*se+M*X+S*Z,c[10]=A*ae+w*oe+M*H+S*le,c[14]=A*L+w*pe+M*K+S*de,c[3]=I*k+R*O+N*V+W*Q,c[7]=I*B+R*se+N*X+W*Z,c[11]=I*ae+R*oe+N*H+W*le,c[15]=I*L+R*pe+N*K+W*de,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],r=e[4],s=e[8],c=e[12],f=e[1],h=e[5],p=e[9],m=e[13],g=e[2],_=e[6],x=e[10],T=e[14],A=e[3],w=e[7],M=e[11],S=e[15];return A*(+c*p*_-s*m*_-c*h*x+r*m*x+s*h*T-r*p*T)+w*(+t*p*T-t*m*x+c*f*x-s*f*T+s*m*g-c*p*g)+M*(+t*m*_-t*h*T-c*f*_+r*f*T+c*h*g-r*m*g)+S*(-s*h*g-t*p*_+t*h*x+s*f*_-r*f*x+r*p*g)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,r){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=r),this}invert(){const e=this.elements,t=e[0],r=e[1],s=e[2],c=e[3],f=e[4],h=e[5],p=e[6],m=e[7],g=e[8],_=e[9],x=e[10],T=e[11],A=e[12],w=e[13],M=e[14],S=e[15],I=_*M*m-w*x*m+w*p*T-h*M*T-_*p*S+h*x*S,R=A*x*m-g*M*m-A*p*T+f*M*T+g*p*S-f*x*S,N=g*w*m-A*_*m+A*h*T-f*w*T-g*h*S+f*_*S,W=A*_*p-g*w*p-A*h*x+f*w*x+g*h*M-f*_*M,k=t*I+r*R+s*N+c*W;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/k;return e[0]=I*B,e[1]=(w*x*c-_*M*c-w*s*T+r*M*T+_*s*S-r*x*S)*B,e[2]=(h*M*c-w*p*c+w*s*m-r*M*m-h*s*S+r*p*S)*B,e[3]=(_*p*c-h*x*c-_*s*m+r*x*m+h*s*T-r*p*T)*B,e[4]=R*B,e[5]=(g*M*c-A*x*c+A*s*T-t*M*T-g*s*S+t*x*S)*B,e[6]=(A*p*c-f*M*c-A*s*m+t*M*m+f*s*S-t*p*S)*B,e[7]=(f*x*c-g*p*c+g*s*m-t*x*m-f*s*T+t*p*T)*B,e[8]=N*B,e[9]=(A*_*c-g*w*c-A*r*T+t*w*T+g*r*S-t*_*S)*B,e[10]=(f*w*c-A*h*c+A*r*m-t*w*m-f*r*S+t*h*S)*B,e[11]=(g*h*c-f*_*c-g*r*m+t*_*m+f*r*T-t*h*T)*B,e[12]=W*B,e[13]=(g*w*s-A*_*s+A*r*x-t*w*x-g*r*M+t*_*M)*B,e[14]=(A*h*s-f*w*s-A*r*p+t*w*p+f*r*M-t*h*M)*B,e[15]=(f*_*s-g*h*s+g*r*p-t*_*p-f*r*x+t*h*x)*B,this}scale(e){const t=this.elements,r=e.x,s=e.y,c=e.z;return t[0]*=r,t[4]*=s,t[8]*=c,t[1]*=r,t[5]*=s,t[9]*=c,t[2]*=r,t[6]*=s,t[10]*=c,t[3]*=r,t[7]*=s,t[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],r=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,r,s))}makeTranslation(e,t,r){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,r,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),r=Math.sin(e);return this.set(1,0,0,0,0,t,-r,0,0,r,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,0,r,0,0,1,0,0,-r,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),r=Math.sin(e);return this.set(t,-r,0,0,r,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const r=Math.cos(t),s=Math.sin(t),c=1-r,f=e.x,h=e.y,p=e.z,m=c*f,g=c*h;return this.set(m*f+r,m*h-s*p,m*p+s*h,0,m*h+s*p,g*h+r,g*p-s*f,0,m*p-s*h,g*p+s*f,c*p*p+r,0,0,0,0,1),this}makeScale(e,t,r){return this.set(e,0,0,0,0,t,0,0,0,0,r,0,0,0,0,1),this}makeShear(e,t,r,s,c,f){return this.set(1,r,c,0,e,1,f,0,t,s,1,0,0,0,0,1),this}compose(e,t,r){const s=this.elements,c=t._x,f=t._y,h=t._z,p=t._w,m=c+c,g=f+f,_=h+h,x=c*m,T=c*g,A=c*_,w=f*g,M=f*_,S=h*_,I=p*m,R=p*g,N=p*_,W=r.x,k=r.y,B=r.z;return s[0]=(1-(w+S))*W,s[1]=(T+N)*W,s[2]=(A-R)*W,s[3]=0,s[4]=(T-N)*k,s[5]=(1-(x+S))*k,s[6]=(M+I)*k,s[7]=0,s[8]=(A+R)*B,s[9]=(M-I)*B,s[10]=(1-(x+w))*B,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,r){const s=this.elements;let c=os.set(s[0],s[1],s[2]).length();const f=os.set(s[4],s[5],s[6]).length(),h=os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(c=-c),e.x=s[12],e.y=s[13],e.z=s[14],Qn.copy(this);const m=1/c,g=1/f,_=1/h;return Qn.elements[0]*=m,Qn.elements[1]*=m,Qn.elements[2]*=m,Qn.elements[4]*=g,Qn.elements[5]*=g,Qn.elements[6]*=g,Qn.elements[8]*=_,Qn.elements[9]*=_,Qn.elements[10]*=_,t.setFromRotationMatrix(Qn),r.x=c,r.y=f,r.z=h,this}makePerspective(e,t,r,s,c,f,h=Ci){const p=this.elements,m=2*c/(t-e),g=2*c/(r-s),_=(t+e)/(t-e),x=(r+s)/(r-s);let T,A;if(h===Ci)T=-(f+c)/(f-c),A=-2*f*c/(f-c);else if(h===Jo)T=-f/(f-c),A=-f*c/(f-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=_,p[12]=0,p[1]=0,p[5]=g,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=T,p[14]=A,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,t,r,s,c,f,h=Ci){const p=this.elements,m=1/(t-e),g=1/(r-s),_=1/(f-c),x=(t+e)*m,T=(r+s)*g;let A,w;if(h===Ci)A=(f+c)*_,w=-2*_;else if(h===Jo)A=c*_,w=-1*_;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*g,p[9]=0,p[13]=-T,p[2]=0,p[6]=0,p[10]=w,p[14]=-A,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const t=this.elements,r=e.elements;for(let s=0;s<16;s++)if(t[s]!==r[s])return!1;return!0}fromArray(e,t=0){for(let r=0;r<16;r++)this.elements[r]=e[r+t];return this}toArray(e=[],t=0){const r=this.elements;return e[t]=r[0],e[t+1]=r[1],e[t+2]=r[2],e[t+3]=r[3],e[t+4]=r[4],e[t+5]=r[5],e[t+6]=r[6],e[t+7]=r[7],e[t+8]=r[8],e[t+9]=r[9],e[t+10]=r[10],e[t+11]=r[11],e[t+12]=r[12],e[t+13]=r[13],e[t+14]=r[14],e[t+15]=r[15],e}}const os=new Y,Qn=new xt,N0=new Y(0,0,0),U0=new Y(1,1,1),qi=new Y,Mo=new Y,Fn=new Y,od=new xt,ld=new tr;class rl{constructor(e=0,t=0,r=0,s=rl.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=r,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,r,s=this._order){return this._x=e,this._y=t,this._z=r,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,r=!0){const s=e.elements,c=s[0],f=s[4],h=s[8],p=s[1],m=s[5],g=s[9],_=s[2],x=s[6],T=s[10];switch(t){case"XYZ":this._y=Math.asin(yn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-g,T),this._z=Math.atan2(-f,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-yn(g,-1,1)),Math.abs(g)<.9999999?(this._y=Math.atan2(h,T),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-_,c),this._z=0);break;case"ZXY":this._x=Math.asin(yn(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-_,T),this._z=Math.atan2(-f,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-yn(_,-1,1)),Math.abs(_)<.9999999?(this._x=Math.atan2(x,T),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-f,m));break;case"YZX":this._z=Math.asin(yn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-g,m),this._y=Math.atan2(-_,c)):(this._x=0,this._y=Math.atan2(h,T));break;case"XZY":this._z=Math.asin(-yn(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-g,T),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,r===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,r){return od.makeRotationFromQuaternion(e),this.setFromRotationMatrix(od,t,r)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ld.setFromEuler(this),this.setFromQuaternion(ld,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}rl.DEFAULT_ORDER="XYZ";class Up{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let O0=0;const cd=new Y,ls=new tr,Mi=new xt,To=new Y,_a=new Y,F0=new Y,B0=new tr,ud=new Y(1,0,0),fd=new Y(0,1,0),hd=new Y(0,0,1),k0={type:"added"},H0={type:"removed"};class kt extends Us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:O0++}),this.uuid=ti(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=kt.DEFAULT_UP.clone();const e=new Y,t=new rl,r=new tr,s=new Y(1,1,1);function c(){r.setFromEuler(t,!1)}function f(){t.setFromQuaternion(r,void 0,!1)}t._onChange(c),r._onChange(f),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xt},normalMatrix:{value:new vt}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=kt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Up,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.multiply(ls),this}rotateOnWorldAxis(e,t){return ls.setFromAxisAngle(e,t),this.quaternion.premultiply(ls),this}rotateX(e){return this.rotateOnAxis(ud,e)}rotateY(e){return this.rotateOnAxis(fd,e)}rotateZ(e){return this.rotateOnAxis(hd,e)}translateOnAxis(e,t){return cd.copy(e).applyQuaternion(this.quaternion),this.position.add(cd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ud,e)}translateY(e){return this.translateOnAxis(fd,e)}translateZ(e){return this.translateOnAxis(hd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(e,t,r){e.isVector3?To.copy(e):To.set(e,t,r);const s=this.parent;this.updateWorldMatrix(!0,!1),_a.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(_a,To,this.up):Mi.lookAt(To,_a,this.up),this.quaternion.setFromRotationMatrix(Mi),s&&(Mi.extractRotation(s.matrixWorld),ls.setFromRotationMatrix(Mi),this.quaternion.premultiply(ls.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(k0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let r=0;r<arguments.length;r++)this.remove(arguments[r]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(H0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mi),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let r=0,s=this.children.length;r<s;r++){const f=this.children[r].getObjectByProperty(e,t);if(f!==void 0)return f}}getObjectsByProperty(e,t,r=[]){this[e]===t&&r.push(this);const s=this.children;for(let c=0,f=s.length;c<f;c++)s[c].getObjectsByProperty(e,t,r);return r}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_a,e,F0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_a,B0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let r=0,s=t.length;r<s;r++)t[r].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let r=0,s=t.length;r<s;r++){const c=t[r];(c.matrixWorldAutoUpdate===!0||e===!0)&&c.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const r=this.parent;if(e===!0&&r!==null&&r.matrixWorldAutoUpdate===!0&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let c=0,f=s.length;c<f;c++){const h=s[c];h.matrixWorldAutoUpdate===!0&&h.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",r={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},r.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function c(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,g=p.length;m<g;m++){const _=p[m];c(e.shapes,_)}else c(e.shapes,p)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(c(e.materials,this.material[p]));s.material=h}else s.material=c(e.materials,this.material);if(this.children.length>0){s.children=[];for(let h=0;h<this.children.length;h++)s.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];s.animations.push(c(e.animations,p))}}if(t){const h=f(e.geometries),p=f(e.materials),m=f(e.textures),g=f(e.images),_=f(e.shapes),x=f(e.skeletons),T=f(e.animations),A=f(e.nodes);h.length>0&&(r.geometries=h),p.length>0&&(r.materials=p),m.length>0&&(r.textures=m),g.length>0&&(r.images=g),_.length>0&&(r.shapes=_),x.length>0&&(r.skeletons=x),T.length>0&&(r.animations=T),A.length>0&&(r.nodes=A)}return r.object=s,r;function f(h){const p=[];for(const m in h){const g=h[m];delete g.metadata,p.push(g)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let r=0;r<e.children.length;r++){const s=e.children[r];this.add(s.clone())}return this}}kt.DEFAULT_UP=new Y(0,1,0);kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $n=new Y,Ti=new Y,xc=new Y,bi=new Y,cs=new Y,us=new Y,dd=new Y,yc=new Y,Sc=new Y,Mc=new Y;let bo=!1;class ei{constructor(e=new Y,t=new Y,r=new Y){this.a=e,this.b=t,this.c=r}static getNormal(e,t,r,s){s.subVectors(r,t),$n.subVectors(e,t),s.cross($n);const c=s.lengthSq();return c>0?s.multiplyScalar(1/Math.sqrt(c)):s.set(0,0,0)}static getBarycoord(e,t,r,s,c){$n.subVectors(s,t),Ti.subVectors(r,t),xc.subVectors(e,t);const f=$n.dot($n),h=$n.dot(Ti),p=$n.dot(xc),m=Ti.dot(Ti),g=Ti.dot(xc),_=f*m-h*h;if(_===0)return c.set(0,0,0),null;const x=1/_,T=(m*p-h*g)*x,A=(f*g-h*p)*x;return c.set(1-T-A,A,T)}static containsPoint(e,t,r,s){return this.getBarycoord(e,t,r,s,bi)===null?!1:bi.x>=0&&bi.y>=0&&bi.x+bi.y<=1}static getUV(e,t,r,s,c,f,h,p){return bo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bo=!0),this.getInterpolation(e,t,r,s,c,f,h,p)}static getInterpolation(e,t,r,s,c,f,h,p){return this.getBarycoord(e,t,r,s,bi)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,bi.x),p.addScaledVector(f,bi.y),p.addScaledVector(h,bi.z),p)}static isFrontFacing(e,t,r,s){return $n.subVectors(r,t),Ti.subVectors(e,t),$n.cross(Ti).dot(s)<0}set(e,t,r){return this.a.copy(e),this.b.copy(t),this.c.copy(r),this}setFromPointsAndIndices(e,t,r,s){return this.a.copy(e[t]),this.b.copy(e[r]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,r,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,r),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),Ti.subVectors(this.a,this.b),$n.cross(Ti).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ei.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,r,s,c){return bo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bo=!0),ei.getInterpolation(e,this.a,this.b,this.c,t,r,s,c)}getInterpolation(e,t,r,s,c){return ei.getInterpolation(e,this.a,this.b,this.c,t,r,s,c)}containsPoint(e){return ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const r=this.a,s=this.b,c=this.c;let f,h;cs.subVectors(s,r),us.subVectors(c,r),yc.subVectors(e,r);const p=cs.dot(yc),m=us.dot(yc);if(p<=0&&m<=0)return t.copy(r);Sc.subVectors(e,s);const g=cs.dot(Sc),_=us.dot(Sc);if(g>=0&&_<=g)return t.copy(s);const x=p*_-g*m;if(x<=0&&p>=0&&g<=0)return f=p/(p-g),t.copy(r).addScaledVector(cs,f);Mc.subVectors(e,c);const T=cs.dot(Mc),A=us.dot(Mc);if(A>=0&&T<=A)return t.copy(c);const w=T*m-p*A;if(w<=0&&m>=0&&A<=0)return h=m/(m-A),t.copy(r).addScaledVector(us,h);const M=g*A-T*_;if(M<=0&&_-g>=0&&T-A>=0)return dd.subVectors(c,s),h=(_-g)/(_-g+(T-A)),t.copy(s).addScaledVector(dd,h);const S=1/(M+w+x);return f=w*S,h=x*S,t.copy(r).addScaledVector(cs,f).addScaledVector(us,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Op={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yi={h:0,s:0,l:0},Eo={h:0,s:0,l:0};function Tc(l,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?l+(e-l)*6*t:t<1/2?e:t<2/3?l+(e-l)*6*(2/3-t):l}class Qe{constructor(e,t,r){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,r)}set(e,t,r){if(t===void 0&&r===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,r);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Wt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,At.toWorkingColorSpace(this,t),this}setRGB(e,t,r,s=At.workingColorSpace){return this.r=e,this.g=t,this.b=r,At.toWorkingColorSpace(this,s),this}setHSL(e,t,r,s=At.workingColorSpace){if(e=lu(e,1),t=yn(t,0,1),r=yn(r,0,1),t===0)this.r=this.g=this.b=r;else{const c=r<=.5?r*(1+t):r+t-r*t,f=2*r-c;this.r=Tc(f,c,e+1/3),this.g=Tc(f,c,e),this.b=Tc(f,c,e-1/3)}return At.toWorkingColorSpace(this,s),this}setStyle(e,t=Wt){function r(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const f=s[1],h=s[2];switch(f){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,t);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,t);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return r(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=s[1],f=c.length;if(f===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,t);if(f===6)return this.setHex(parseInt(c,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Wt){const r=Op[e.toLowerCase()];return r!==void 0?this.setHex(r,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ms(e.r),this.g=Ms(e.g),this.b=Ms(e.b),this}copyLinearToSRGB(e){return this.r=fc(e.r),this.g=fc(e.g),this.b=fc(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Wt){return At.fromWorkingColorSpace(xn.copy(this),e),Math.round(yn(xn.r*255,0,255))*65536+Math.round(yn(xn.g*255,0,255))*256+Math.round(yn(xn.b*255,0,255))}getHexString(e=Wt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=At.workingColorSpace){At.fromWorkingColorSpace(xn.copy(this),t);const r=xn.r,s=xn.g,c=xn.b,f=Math.max(r,s,c),h=Math.min(r,s,c);let p,m;const g=(h+f)/2;if(h===f)p=0,m=0;else{const _=f-h;switch(m=g<=.5?_/(f+h):_/(2-f-h),f){case r:p=(s-c)/_+(s<c?6:0);break;case s:p=(c-r)/_+2;break;case c:p=(r-s)/_+4;break}p/=6}return e.h=p,e.s=m,e.l=g,e}getRGB(e,t=At.workingColorSpace){return At.fromWorkingColorSpace(xn.copy(this),t),e.r=xn.r,e.g=xn.g,e.b=xn.b,e}getStyle(e=Wt){At.fromWorkingColorSpace(xn.copy(this),e);const t=xn.r,r=xn.g,s=xn.b;return e!==Wt?`color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(r*255)},${Math.round(s*255)})`}offsetHSL(e,t,r){return this.getHSL(Yi),this.setHSL(Yi.h+e,Yi.s+t,Yi.l+r)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,r){return this.r=e.r+(t.r-e.r)*r,this.g=e.g+(t.g-e.g)*r,this.b=e.b+(t.b-e.b)*r,this}lerpHSL(e,t){this.getHSL(Yi),e.getHSL(Eo);const r=Aa(Yi.h,Eo.h,t),s=Aa(Yi.s,Eo.s,t),c=Aa(Yi.l,Eo.l,t);return this.setHSL(r,s,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,r=this.g,s=this.b,c=e.elements;return this.r=c[0]*t+c[3]*r+c[6]*s,this.g=c[1]*t+c[4]*r+c[7]*s,this.b=c[2]*t+c[5]*r+c[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xn=new Qe;Qe.NAMES=Op;let z0=0;class Xn extends Us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:z0++}),this.uuid=ti(),this.name="",this.type="Material",this.blending=Ss,this.side=Pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vc,this.blendDst=Xc,this.blendEquation=Sr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=qo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ed,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const r=e[t];if(r===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(r):s&&s.isVector3&&r&&r.isVector3?s.copy(r):this[t]=r}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const r={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.color&&this.color.isColor&&(r.color=this.color.getHex()),this.roughness!==void 0&&(r.roughness=this.roughness),this.metalness!==void 0&&(r.metalness=this.metalness),this.sheen!==void 0&&(r.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(r.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(r.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(r.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(r.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(r.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(r.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(r.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(r.shininess=this.shininess),this.clearcoat!==void 0&&(r.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(r.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(r.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(r.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(r.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,r.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(r.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(r.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(r.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(r.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(r.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(r.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(r.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(r.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(r.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(r.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(r.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(r.lightMap=this.lightMap.toJSON(e).uuid,r.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(r.aoMap=this.aoMap.toJSON(e).uuid,r.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(r.bumpMap=this.bumpMap.toJSON(e).uuid,r.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(r.normalMap=this.normalMap.toJSON(e).uuid,r.normalMapType=this.normalMapType,r.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(r.displacementMap=this.displacementMap.toJSON(e).uuid,r.displacementScale=this.displacementScale,r.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(r.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(r.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(r.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(r.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(r.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(r.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(r.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(r.combine=this.combine)),this.envMapIntensity!==void 0&&(r.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(r.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(r.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(r.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(r.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(r.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(r.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(r.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(r.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(r.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(r.size=this.size),this.shadowSide!==null&&(r.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(r.sizeAttenuation=this.sizeAttenuation),this.blending!==Ss&&(r.blending=this.blending),this.side!==Pi&&(r.side=this.side),this.vertexColors===!0&&(r.vertexColors=!0),this.opacity<1&&(r.opacity=this.opacity),this.transparent===!0&&(r.transparent=!0),this.blendSrc!==Vc&&(r.blendSrc=this.blendSrc),this.blendDst!==Xc&&(r.blendDst=this.blendDst),this.blendEquation!==Sr&&(r.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(r.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(r.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(r.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(r.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(r.blendAlpha=this.blendAlpha),this.depthFunc!==qo&&(r.depthFunc=this.depthFunc),this.depthTest===!1&&(r.depthTest=this.depthTest),this.depthWrite===!1&&(r.depthWrite=this.depthWrite),this.colorWrite===!1&&(r.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(r.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ed&&(r.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(r.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(r.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(r.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(r.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(r.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(r.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(r.rotation=this.rotation),this.polygonOffset===!0&&(r.polygonOffset=!0),this.polygonOffsetFactor!==0&&(r.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(r.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(r.linewidth=this.linewidth),this.dashSize!==void 0&&(r.dashSize=this.dashSize),this.gapSize!==void 0&&(r.gapSize=this.gapSize),this.scale!==void 0&&(r.scale=this.scale),this.dithering===!0&&(r.dithering=!0),this.alphaTest>0&&(r.alphaTest=this.alphaTest),this.alphaHash===!0&&(r.alphaHash=!0),this.alphaToCoverage===!0&&(r.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(r.premultipliedAlpha=!0),this.forceSinglePass===!0&&(r.forceSinglePass=!0),this.wireframe===!0&&(r.wireframe=!0),this.wireframeLinewidth>1&&(r.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(r.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(r.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(r.flatShading=!0),this.visible===!1&&(r.visible=!1),this.toneMapped===!1&&(r.toneMapped=!1),this.fog===!1&&(r.fog=!1),Object.keys(this.userData).length>0&&(r.userData=this.userData);function s(c){const f=[];for(const h in c){const p=c[h];delete p.metadata,f.push(p)}return f}if(t){const c=s(e.textures),f=s(e.images);c.length>0&&(r.textures=c),f.length>0&&(r.images=f)}return r}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let r=null;if(t!==null){const s=t.length;r=new Array(s);for(let c=0;c!==s;++c)r[c]=t[c].clone()}return this.clippingPlanes=r,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Tr extends Xn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=$o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Qt=new Y,Ao=new _t;class Rn{constructor(e,t,r=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=r,this.usage=Zc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,r){e*=this.itemSize,r*=t.itemSize;for(let s=0,c=this.itemSize;s<c;s++)this.array[e+s]=t.array[r+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,r=this.count;t<r;t++)Ao.fromBufferAttribute(this,t),Ao.applyMatrix3(e),this.setXY(t,Ao.x,Ao.y);else if(this.itemSize===3)for(let t=0,r=this.count;t<r;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix3(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyMatrix4(e){for(let t=0,r=this.count;t<r;t++)Qt.fromBufferAttribute(this,t),Qt.applyMatrix4(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)Qt.fromBufferAttribute(this,t),Qt.applyNormalMatrix(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)Qt.fromBufferAttribute(this,t),Qt.transformDirection(e),this.setXYZ(t,Qt.x,Qt.y,Qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let r=this.array[e*this.itemSize+t];return this.normalized&&(r=ci(r,this.array)),r}setComponent(e,t,r){return this.normalized&&(r=Rt(r,this.array)),this.array[e*this.itemSize+t]=r,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=r,this}setXYZ(e,t,r,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),r=Rt(r,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this}setXYZW(e,t,r,s,c){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),r=Rt(r,this.array),s=Rt(s,this.array),c=Rt(c,this.array)),this.array[e+0]=t,this.array[e+1]=r,this.array[e+2]=s,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zc&&(e.usage=this.usage),e}}class Fp extends Rn{constructor(e,t,r){super(new Uint16Array(e),t,r)}}class Bp extends Rn{constructor(e,t,r){super(new Uint32Array(e),t,r)}}class qn extends Rn{constructor(e,t,r){super(new Float32Array(e),t,r)}}let G0=0;const Hn=new xt,bc=new kt,fs=new Y,Bn=new Di,xa=new Di,un=new Y;class ni extends Us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:G0++}),this.uuid=ti(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pp(e)?Bp:Fp)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,r=0){this.groups.push({start:e,count:t,materialIndex:r})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const r=this.attributes.normal;if(r!==void 0){const c=new vt().getNormalMatrix(e);r.applyNormalMatrix(c),r.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,t,r){return Hn.makeTranslation(e,t,r),this.applyMatrix4(Hn),this}scale(e,t,r){return Hn.makeScale(e,t,r),this.applyMatrix4(Hn),this}lookAt(e){return bc.lookAt(e),bc.updateMatrix(),this.applyMatrix4(bc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fs).negate(),this.translate(fs.x,fs.y,fs.z),this}setFromPoints(e){const t=[];for(let r=0,s=e.length;r<s;r++){const c=e[r];t.push(c.x,c.y,c.z||0)}return this.setAttribute("position",new qn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Di);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let r=0,s=t.length;r<s;r++){const c=t[r];Bn.setFromBufferAttribute(c),this.morphTargetsRelative?(un.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(un),un.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(un)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ui);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new Y,1/0);return}if(e){const r=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),t)for(let c=0,f=t.length;c<f;c++){const h=t[c];xa.setFromBufferAttribute(h),this.morphTargetsRelative?(un.addVectors(Bn.min,xa.min),Bn.expandByPoint(un),un.addVectors(Bn.max,xa.max),Bn.expandByPoint(un)):(Bn.expandByPoint(xa.min),Bn.expandByPoint(xa.max))}Bn.getCenter(r);let s=0;for(let c=0,f=e.count;c<f;c++)un.fromBufferAttribute(e,c),s=Math.max(s,r.distanceToSquared(un));if(t)for(let c=0,f=t.length;c<f;c++){const h=t[c],p=this.morphTargetsRelative;for(let m=0,g=h.count;m<g;m++)un.fromBufferAttribute(h,m),p&&(fs.fromBufferAttribute(e,m),un.add(fs)),s=Math.max(s,r.distanceToSquared(un))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const r=e.array,s=t.position.array,c=t.normal.array,f=t.uv.array,h=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Rn(new Float32Array(4*h),4));const p=this.getAttribute("tangent").array,m=[],g=[];for(let O=0;O<h;O++)m[O]=new Y,g[O]=new Y;const _=new Y,x=new Y,T=new Y,A=new _t,w=new _t,M=new _t,S=new Y,I=new Y;function R(O,se,oe){_.fromArray(s,O*3),x.fromArray(s,se*3),T.fromArray(s,oe*3),A.fromArray(f,O*2),w.fromArray(f,se*2),M.fromArray(f,oe*2),x.sub(_),T.sub(_),w.sub(A),M.sub(A);const pe=1/(w.x*M.y-M.x*w.y);isFinite(pe)&&(S.copy(x).multiplyScalar(M.y).addScaledVector(T,-w.y).multiplyScalar(pe),I.copy(T).multiplyScalar(w.x).addScaledVector(x,-M.x).multiplyScalar(pe),m[O].add(S),m[se].add(S),m[oe].add(S),g[O].add(I),g[se].add(I),g[oe].add(I))}let N=this.groups;N.length===0&&(N=[{start:0,count:r.length}]);for(let O=0,se=N.length;O<se;++O){const oe=N[O],pe=oe.start,V=oe.count;for(let X=pe,H=pe+V;X<H;X+=3)R(r[X+0],r[X+1],r[X+2])}const W=new Y,k=new Y,B=new Y,ae=new Y;function L(O){B.fromArray(c,O*3),ae.copy(B);const se=m[O];W.copy(se),W.sub(B.multiplyScalar(B.dot(se))).normalize(),k.crossVectors(ae,se);const pe=k.dot(g[O])<0?-1:1;p[O*4]=W.x,p[O*4+1]=W.y,p[O*4+2]=W.z,p[O*4+3]=pe}for(let O=0,se=N.length;O<se;++O){const oe=N[O],pe=oe.start,V=oe.count;for(let X=pe,H=pe+V;X<H;X+=3)L(r[X+0]),L(r[X+1]),L(r[X+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let r=this.getAttribute("normal");if(r===void 0)r=new Rn(new Float32Array(t.count*3),3),this.setAttribute("normal",r);else for(let x=0,T=r.count;x<T;x++)r.setXYZ(x,0,0,0);const s=new Y,c=new Y,f=new Y,h=new Y,p=new Y,m=new Y,g=new Y,_=new Y;if(e)for(let x=0,T=e.count;x<T;x+=3){const A=e.getX(x+0),w=e.getX(x+1),M=e.getX(x+2);s.fromBufferAttribute(t,A),c.fromBufferAttribute(t,w),f.fromBufferAttribute(t,M),g.subVectors(f,c),_.subVectors(s,c),g.cross(_),h.fromBufferAttribute(r,A),p.fromBufferAttribute(r,w),m.fromBufferAttribute(r,M),h.add(g),p.add(g),m.add(g),r.setXYZ(A,h.x,h.y,h.z),r.setXYZ(w,p.x,p.y,p.z),r.setXYZ(M,m.x,m.y,m.z)}else for(let x=0,T=t.count;x<T;x+=3)s.fromBufferAttribute(t,x+0),c.fromBufferAttribute(t,x+1),f.fromBufferAttribute(t,x+2),g.subVectors(f,c),_.subVectors(s,c),g.cross(_),r.setXYZ(x+0,g.x,g.y,g.z),r.setXYZ(x+1,g.x,g.y,g.z),r.setXYZ(x+2,g.x,g.y,g.z);this.normalizeNormals(),r.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,r=e.count;t<r;t++)un.fromBufferAttribute(e,t),un.normalize(),e.setXYZ(t,un.x,un.y,un.z)}toNonIndexed(){function e(h,p){const m=h.array,g=h.itemSize,_=h.normalized,x=new m.constructor(p.length*g);let T=0,A=0;for(let w=0,M=p.length;w<M;w++){h.isInterleavedBufferAttribute?T=p[w]*h.data.stride+h.offset:T=p[w]*g;for(let S=0;S<g;S++)x[A++]=m[T++]}return new Rn(x,g,_)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ni,r=this.index.array,s=this.attributes;for(const h in s){const p=s[h],m=e(p,r);t.setAttribute(h,m)}const c=this.morphAttributes;for(const h in c){const p=[],m=c[h];for(let g=0,_=m.length;g<_;g++){const x=m[g],T=e(x,r);p.push(T)}t.morphAttributes[h]=p}t.morphTargetsRelative=this.morphTargetsRelative;const f=this.groups;for(let h=0,p=f.length;h<p;h++){const m=f[h];t.addGroup(m.start,m.count,m.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const r=this.attributes;for(const p in r){const m=r[p];e.data.attributes[p]=m.toJSON(e.data)}const s={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],g=[];for(let _=0,x=m.length;_<x;_++){const T=m[_];g.push(T.toJSON(e.data))}g.length>0&&(s[p]=g,c=!0)}c&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const f=this.groups;f.length>0&&(e.data.groups=JSON.parse(JSON.stringify(f)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const r=e.index;r!==null&&this.setIndex(r.clone(t));const s=e.attributes;for(const m in s){const g=s[m];this.setAttribute(m,g.clone(t))}const c=e.morphAttributes;for(const m in c){const g=[],_=c[m];for(let x=0,T=_.length;x<T;x++)g.push(_[x].clone(t));this.morphAttributes[m]=g}this.morphTargetsRelative=e.morphTargetsRelative;const f=e.groups;for(let m=0,g=f.length;m<g;m++){const _=f[m];this.addGroup(_.start,_.count,_.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pd=new xt,gr=new il,wo=new ui,md=new Y,hs=new Y,ds=new Y,ps=new Y,Ec=new Y,Co=new Y,Ro=new _t,Lo=new _t,Po=new _t,gd=new Y,vd=new Y,_d=new Y,Do=new Y,Io=new Y;class Cn extends kt{constructor(e=new ni,t=new Tr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=s.length;c<f;c++){const h=s[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,t){const r=this.geometry,s=r.attributes.position,c=r.morphAttributes.position,f=r.morphTargetsRelative;t.fromBufferAttribute(s,e);const h=this.morphTargetInfluences;if(c&&h){Co.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const g=h[p],_=c[p];g!==0&&(Ec.fromBufferAttribute(_,e),f?Co.addScaledVector(Ec,g):Co.addScaledVector(Ec.sub(t),g))}t.add(Co)}return t}raycast(e,t){const r=this.geometry,s=this.material,c=this.matrixWorld;s!==void 0&&(r.boundingSphere===null&&r.computeBoundingSphere(),wo.copy(r.boundingSphere),wo.applyMatrix4(c),gr.copy(e.ray).recast(e.near),!(wo.containsPoint(gr.origin)===!1&&(gr.intersectSphere(wo,md)===null||gr.origin.distanceToSquared(md)>(e.far-e.near)**2))&&(pd.copy(c).invert(),gr.copy(e.ray).applyMatrix4(pd),!(r.boundingBox!==null&&gr.intersectsBox(r.boundingBox)===!1)&&this._computeIntersections(e,t,gr)))}_computeIntersections(e,t,r){let s;const c=this.geometry,f=this.material,h=c.index,p=c.attributes.position,m=c.attributes.uv,g=c.attributes.uv1,_=c.attributes.normal,x=c.groups,T=c.drawRange;if(h!==null)if(Array.isArray(f))for(let A=0,w=x.length;A<w;A++){const M=x[A],S=f[M.materialIndex],I=Math.max(M.start,T.start),R=Math.min(h.count,Math.min(M.start+M.count,T.start+T.count));for(let N=I,W=R;N<W;N+=3){const k=h.getX(N),B=h.getX(N+1),ae=h.getX(N+2);s=No(this,S,e,r,m,g,_,k,B,ae),s&&(s.faceIndex=Math.floor(N/3),s.face.materialIndex=M.materialIndex,t.push(s))}}else{const A=Math.max(0,T.start),w=Math.min(h.count,T.start+T.count);for(let M=A,S=w;M<S;M+=3){const I=h.getX(M),R=h.getX(M+1),N=h.getX(M+2);s=No(this,f,e,r,m,g,_,I,R,N),s&&(s.faceIndex=Math.floor(M/3),t.push(s))}}else if(p!==void 0)if(Array.isArray(f))for(let A=0,w=x.length;A<w;A++){const M=x[A],S=f[M.materialIndex],I=Math.max(M.start,T.start),R=Math.min(p.count,Math.min(M.start+M.count,T.start+T.count));for(let N=I,W=R;N<W;N+=3){const k=N,B=N+1,ae=N+2;s=No(this,S,e,r,m,g,_,k,B,ae),s&&(s.faceIndex=Math.floor(N/3),s.face.materialIndex=M.materialIndex,t.push(s))}}else{const A=Math.max(0,T.start),w=Math.min(p.count,T.start+T.count);for(let M=A,S=w;M<S;M+=3){const I=M,R=M+1,N=M+2;s=No(this,f,e,r,m,g,_,I,R,N),s&&(s.faceIndex=Math.floor(M/3),t.push(s))}}}}function W0(l,e,t,r,s,c,f,h){let p;if(e.side===Nn?p=r.intersectTriangle(f,c,s,!0,h):p=r.intersectTriangle(s,c,f,e.side===Pi,h),p===null)return null;Io.copy(h),Io.applyMatrix4(l.matrixWorld);const m=t.ray.origin.distanceTo(Io);return m<t.near||m>t.far?null:{distance:m,point:Io.clone(),object:l}}function No(l,e,t,r,s,c,f,h,p,m){l.getVertexPosition(h,hs),l.getVertexPosition(p,ds),l.getVertexPosition(m,ps);const g=W0(l,e,t,r,hs,ds,ps,Do);if(g){s&&(Ro.fromBufferAttribute(s,h),Lo.fromBufferAttribute(s,p),Po.fromBufferAttribute(s,m),g.uv=ei.getInterpolation(Do,hs,ds,ps,Ro,Lo,Po,new _t)),c&&(Ro.fromBufferAttribute(c,h),Lo.fromBufferAttribute(c,p),Po.fromBufferAttribute(c,m),g.uv1=ei.getInterpolation(Do,hs,ds,ps,Ro,Lo,Po,new _t),g.uv2=g.uv1),f&&(gd.fromBufferAttribute(f,h),vd.fromBufferAttribute(f,p),_d.fromBufferAttribute(f,m),g.normal=ei.getInterpolation(Do,hs,ds,ps,gd,vd,_d,new Y),g.normal.dot(r.direction)>0&&g.normal.multiplyScalar(-1));const _={a:h,b:p,c:m,normal:new Y,materialIndex:0};ei.getNormal(hs,ds,ps,_.normal),g.face=_}return g}class Pr extends ni{constructor(e=1,t=1,r=1,s=1,c=1,f=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:r,widthSegments:s,heightSegments:c,depthSegments:f};const h=this;s=Math.floor(s),c=Math.floor(c),f=Math.floor(f);const p=[],m=[],g=[],_=[];let x=0,T=0;A("z","y","x",-1,-1,r,t,e,f,c,0),A("z","y","x",1,-1,r,t,-e,f,c,1),A("x","z","y",1,1,e,r,t,s,f,2),A("x","z","y",1,-1,e,r,-t,s,f,3),A("x","y","z",1,-1,e,t,r,s,c,4),A("x","y","z",-1,-1,e,t,-r,s,c,5),this.setIndex(p),this.setAttribute("position",new qn(m,3)),this.setAttribute("normal",new qn(g,3)),this.setAttribute("uv",new qn(_,2));function A(w,M,S,I,R,N,W,k,B,ae,L){const O=N/B,se=W/ae,oe=N/2,pe=W/2,V=k/2,X=B+1,H=ae+1;let K=0,Q=0;const Z=new Y;for(let le=0;le<H;le++){const de=le*se-pe;for(let fe=0;fe<X;fe++){const ie=fe*O-oe;Z[w]=ie*I,Z[M]=de*R,Z[S]=V,m.push(Z.x,Z.y,Z.z),Z[w]=0,Z[M]=0,Z[S]=k>0?1:-1,g.push(Z.x,Z.y,Z.z),_.push(fe/B),_.push(1-le/ae),K+=1}}for(let le=0;le<ae;le++)for(let de=0;de<B;de++){const fe=x+de+X*le,ie=x+de+X*(le+1),he=x+(de+1)+X*(le+1),we=x+(de+1)+X*le;p.push(fe,ie,we),p.push(ie,he,we),Q+=6}h.addGroup(T,Q,L),T+=Q,x+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ls(l){const e={};for(const t in l){e[t]={};for(const r in l[t]){const s=l[t][r];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][r]=null):e[t][r]=s.clone():Array.isArray(s)?e[t][r]=s.slice():e[t][r]=s}}return e}function wn(l){const e={};for(let t=0;t<l.length;t++){const r=Ls(l[t]);for(const s in r)e[s]=r[s]}return e}function V0(l){const e=[];for(let t=0;t<l.length;t++)e.push(l[t].clone());return e}function kp(l){return l.getRenderTarget()===null?l.outputColorSpace:At.workingColorSpace}const X0={clone:Ls,merge:wn};var q0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Y0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Rr extends Xn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=q0,this.fragmentShader=Y0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ls(e.uniforms),this.uniformsGroups=V0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const f=this.uniforms[s].value;f&&f.isTexture?t.uniforms[s]={type:"t",value:f.toJSON(e).uuid}:f&&f.isColor?t.uniforms[s]={type:"c",value:f.getHex()}:f&&f.isVector2?t.uniforms[s]={type:"v2",value:f.toArray()}:f&&f.isVector3?t.uniforms[s]={type:"v3",value:f.toArray()}:f&&f.isVector4?t.uniforms[s]={type:"v4",value:f.toArray()}:f&&f.isMatrix3?t.uniforms[s]={type:"m3",value:f.toArray()}:f&&f.isMatrix4?t.uniforms[s]={type:"m4",value:f.toArray()}:t.uniforms[s]={value:f}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const r={};for(const s in this.extensions)this.extensions[s]===!0&&(r[s]=!0);return Object.keys(r).length>0&&(t.extensions=r),t}}class Hp extends kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=Ci}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class In extends Hp{constructor(e=50,t=1,r=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=r,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ea*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(Ea*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,r,s,c,f){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ea*.5*this.fov)/this.zoom,r=2*t,s=this.aspect*r,c=-.5*s;const f=this.view;if(this.view!==null&&this.view.enabled){const p=f.fullWidth,m=f.fullHeight;c+=f.offsetX*s/p,t-=f.offsetY*r/m,s*=f.width/p,r*=f.height/m}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+s,t,t-r,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ms=-90,gs=1;class K0 extends kt{constructor(e,t,r){super(),this.type="CubeCamera",this.renderTarget=r,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new In(ms,gs,e,t);s.layers=this.layers,this.add(s);const c=new In(ms,gs,e,t);c.layers=this.layers,this.add(c);const f=new In(ms,gs,e,t);f.layers=this.layers,this.add(f);const h=new In(ms,gs,e,t);h.layers=this.layers,this.add(h);const p=new In(ms,gs,e,t);p.layers=this.layers,this.add(p);const m=new In(ms,gs,e,t);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[r,s,c,f,h,p]=t;for(const m of t)this.remove(m);if(e===Ci)r.up.set(0,1,0),r.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),f.up.set(0,0,1),f.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Jo)r.up.set(0,-1,0),r.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),f.up.set(0,0,-1),f.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of t)this.add(m),m.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:r,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,f,h,p,m,g]=this.children,_=e.getRenderTarget(),x=e.getActiveCubeFace(),T=e.getActiveMipmapLevel(),A=e.xr.enabled;e.xr.enabled=!1;const w=r.texture.generateMipmaps;r.texture.generateMipmaps=!1,e.setRenderTarget(r,0,s),e.render(t,c),e.setRenderTarget(r,1,s),e.render(t,f),e.setRenderTarget(r,2,s),e.render(t,h),e.setRenderTarget(r,3,s),e.render(t,p),e.setRenderTarget(r,4,s),e.render(t,m),r.texture.generateMipmaps=w,e.setRenderTarget(r,5,s),e.render(t,g),e.setRenderTarget(_,x,T),e.xr.enabled=A,r.texture.needsPMREMUpdate=!0}}class zp extends mn{constructor(e,t,r,s,c,f,h,p,m,g){e=e!==void 0?e:[],t=t!==void 0?t:bs,super(e,t,r,s,c,f,h,p,m,g),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class j0 extends Cr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const r={width:e,height:e,depth:1},s=[r,r,r,r,r,r];t.encoding!==void 0&&(wa("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Ar?Wt:Vn),this.texture=new zp(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const r={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pr(5,5,5),c=new Rr({name:"CubemapFromEquirect",uniforms:Ls(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:Nn,blending:Qi});c.uniforms.tEquirect.value=t;const f=new Cn(s,c),h=t.minFilter;return t.minFilter===wr&&(t.minFilter=Dn),new K0(1,10,this).update(e,f),t.minFilter=h,f.geometry.dispose(),f.material.dispose(),this}clear(e,t,r,s){const c=e.getRenderTarget();for(let f=0;f<6;f++)e.setRenderTarget(this,f),e.clear(t,r,s);e.setRenderTarget(c)}}const Ac=new Y,Z0=new Y,J0=new vt;class xr{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,r,s){return this.normal.set(e,t,r),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,r){const s=Ac.subVectors(r,t).cross(Z0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const r=e.delta(Ac),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/s;return c<0||c>1?null:t.copy(e.start).addScaledVector(r,c)}intersectsLine(e){const t=this.distanceToPoint(e.start),r=this.distanceToPoint(e.end);return t<0&&r>0||r<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const r=t||J0.getNormalMatrix(e),s=this.coplanarPoint(Ac).applyMatrix4(e),c=this.normal.applyMatrix3(r).normalize();return this.constant=-s.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const vr=new ui,Uo=new Y;class cu{constructor(e=new xr,t=new xr,r=new xr,s=new xr,c=new xr,f=new xr){this.planes=[e,t,r,s,c,f]}set(e,t,r,s,c,f){const h=this.planes;return h[0].copy(e),h[1].copy(t),h[2].copy(r),h[3].copy(s),h[4].copy(c),h[5].copy(f),this}copy(e){const t=this.planes;for(let r=0;r<6;r++)t[r].copy(e.planes[r]);return this}setFromProjectionMatrix(e,t=Ci){const r=this.planes,s=e.elements,c=s[0],f=s[1],h=s[2],p=s[3],m=s[4],g=s[5],_=s[6],x=s[7],T=s[8],A=s[9],w=s[10],M=s[11],S=s[12],I=s[13],R=s[14],N=s[15];if(r[0].setComponents(p-c,x-m,M-T,N-S).normalize(),r[1].setComponents(p+c,x+m,M+T,N+S).normalize(),r[2].setComponents(p+f,x+g,M+A,N+I).normalize(),r[3].setComponents(p-f,x-g,M-A,N-I).normalize(),r[4].setComponents(p-h,x-_,M-w,N-R).normalize(),t===Ci)r[5].setComponents(p+h,x+_,M+w,N+R).normalize();else if(t===Jo)r[5].setComponents(h,_,w,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),vr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),vr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(vr)}intersectsSprite(e){return vr.center.set(0,0,0),vr.radius=.7071067811865476,vr.applyMatrix4(e.matrixWorld),this.intersectsSphere(vr)}intersectsSphere(e){const t=this.planes,r=e.center,s=-e.radius;for(let c=0;c<6;c++)if(t[c].distanceToPoint(r)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let r=0;r<6;r++){const s=t[r];if(Uo.x=s.normal.x>0?e.max.x:e.min.x,Uo.y=s.normal.y>0?e.max.y:e.min.y,Uo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Uo)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let r=0;r<6;r++)if(t[r].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Gp(){let l=null,e=!1,t=null,r=null;function s(c,f){t(c,f),r=l.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(r=l.requestAnimationFrame(s),e=!0)},stop:function(){l.cancelAnimationFrame(r),e=!1},setAnimationLoop:function(c){t=c},setContext:function(c){l=c}}}function Q0(l,e){const t=e.isWebGL2,r=new WeakMap;function s(m,g){const _=m.array,x=m.usage,T=_.byteLength,A=l.createBuffer();l.bindBuffer(g,A),l.bufferData(g,_,x),m.onUploadCallback();let w;if(_ instanceof Float32Array)w=l.FLOAT;else if(_ instanceof Uint16Array)if(m.isFloat16BufferAttribute)if(t)w=l.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else w=l.UNSIGNED_SHORT;else if(_ instanceof Int16Array)w=l.SHORT;else if(_ instanceof Uint32Array)w=l.UNSIGNED_INT;else if(_ instanceof Int32Array)w=l.INT;else if(_ instanceof Int8Array)w=l.BYTE;else if(_ instanceof Uint8Array)w=l.UNSIGNED_BYTE;else if(_ instanceof Uint8ClampedArray)w=l.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+_);return{buffer:A,type:w,bytesPerElement:_.BYTES_PER_ELEMENT,version:m.version,size:T}}function c(m,g,_){const x=g.array,T=g._updateRange,A=g.updateRanges;if(l.bindBuffer(_,m),T.count===-1&&A.length===0&&l.bufferSubData(_,0,x),A.length!==0){for(let w=0,M=A.length;w<M;w++){const S=A[w];t?l.bufferSubData(_,S.start*x.BYTES_PER_ELEMENT,x,S.start,S.count):l.bufferSubData(_,S.start*x.BYTES_PER_ELEMENT,x.subarray(S.start,S.start+S.count))}g.clearUpdateRanges()}T.count!==-1&&(t?l.bufferSubData(_,T.offset*x.BYTES_PER_ELEMENT,x,T.offset,T.count):l.bufferSubData(_,T.offset*x.BYTES_PER_ELEMENT,x.subarray(T.offset,T.offset+T.count)),T.count=-1),g.onUploadCallback()}function f(m){return m.isInterleavedBufferAttribute&&(m=m.data),r.get(m)}function h(m){m.isInterleavedBufferAttribute&&(m=m.data);const g=r.get(m);g&&(l.deleteBuffer(g.buffer),r.delete(m))}function p(m,g){if(m.isGLBufferAttribute){const x=r.get(m);(!x||x.version<m.version)&&r.set(m,{buffer:m.buffer,type:m.type,bytesPerElement:m.elementSize,version:m.version});return}m.isInterleavedBufferAttribute&&(m=m.data);const _=r.get(m);if(_===void 0)r.set(m,s(m,g));else if(_.version<m.version){if(_.size!==m.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");c(_.buffer,m,g),_.version=m.version}}return{get:f,remove:h,update:p}}class uu extends ni{constructor(e=1,t=1,r=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:r,heightSegments:s};const c=e/2,f=t/2,h=Math.floor(r),p=Math.floor(s),m=h+1,g=p+1,_=e/h,x=t/p,T=[],A=[],w=[],M=[];for(let S=0;S<g;S++){const I=S*x-f;for(let R=0;R<m;R++){const N=R*_-c;A.push(N,-I,0),w.push(0,0,1),M.push(R/h),M.push(1-S/p)}}for(let S=0;S<p;S++)for(let I=0;I<h;I++){const R=I+m*S,N=I+m*(S+1),W=I+1+m*(S+1),k=I+1+m*S;T.push(R,N,k),T.push(N,W,k)}this.setIndex(T),this.setAttribute("position",new qn(A,3)),this.setAttribute("normal",new qn(w,3)),this.setAttribute("uv",new qn(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new uu(e.width,e.height,e.widthSegments,e.heightSegments)}}var $0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,e_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,t_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,n_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,i_=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,r_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,s_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,a_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,o_=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,l_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,c_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,u_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,f_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,h_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,d_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,p_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,m_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,g_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,v_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,__=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,x_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,y_=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,S_=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,M_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,T_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,b_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,E_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,A_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,w_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,C_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,R_="gl_FragColor = linearToOutputTexel( gl_FragColor );",L_=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,P_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,D_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,I_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,N_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,U_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,O_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,F_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,B_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,k_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,H_=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,z_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,G_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,W_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,V_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,X_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,q_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Y_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,K_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,j_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Z_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,J_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Q_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,$_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ex=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,tx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,nx=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ix=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,sx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,ax=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ox=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,cx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ux=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hx=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,dx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,px=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,mx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,gx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,vx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_x=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sx=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Mx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Tx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ex=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ax=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Cx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Rx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Lx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Px=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Dx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ix=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Nx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Ux=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ox=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Fx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Bx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,kx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Gx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Wx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Vx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Xx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,qx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Yx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Kx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Zx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Jx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Qx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$x=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ey=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ty=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ry=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,sy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,ay=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,oy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,hy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,py=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,my=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,vy=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_y=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Sy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,My=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ty=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,by=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ey=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ay=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Cy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ry=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ly=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Py=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mt={alphahash_fragment:$0,alphahash_pars_fragment:e_,alphamap_fragment:t_,alphamap_pars_fragment:n_,alphatest_fragment:i_,alphatest_pars_fragment:r_,aomap_fragment:s_,aomap_pars_fragment:a_,batching_pars_vertex:o_,batching_vertex:l_,begin_vertex:c_,beginnormal_vertex:u_,bsdfs:f_,iridescence_fragment:h_,bumpmap_pars_fragment:d_,clipping_planes_fragment:p_,clipping_planes_pars_fragment:m_,clipping_planes_pars_vertex:g_,clipping_planes_vertex:v_,color_fragment:__,color_pars_fragment:x_,color_pars_vertex:y_,color_vertex:S_,common:M_,cube_uv_reflection_fragment:T_,defaultnormal_vertex:b_,displacementmap_pars_vertex:E_,displacementmap_vertex:A_,emissivemap_fragment:w_,emissivemap_pars_fragment:C_,colorspace_fragment:R_,colorspace_pars_fragment:L_,envmap_fragment:P_,envmap_common_pars_fragment:D_,envmap_pars_fragment:I_,envmap_pars_vertex:N_,envmap_physical_pars_fragment:q_,envmap_vertex:U_,fog_vertex:O_,fog_pars_vertex:F_,fog_fragment:B_,fog_pars_fragment:k_,gradientmap_pars_fragment:H_,lightmap_fragment:z_,lightmap_pars_fragment:G_,lights_lambert_fragment:W_,lights_lambert_pars_fragment:V_,lights_pars_begin:X_,lights_toon_fragment:Y_,lights_toon_pars_fragment:K_,lights_phong_fragment:j_,lights_phong_pars_fragment:Z_,lights_physical_fragment:J_,lights_physical_pars_fragment:Q_,lights_fragment_begin:$_,lights_fragment_maps:ex,lights_fragment_end:tx,logdepthbuf_fragment:nx,logdepthbuf_pars_fragment:ix,logdepthbuf_pars_vertex:rx,logdepthbuf_vertex:sx,map_fragment:ax,map_pars_fragment:ox,map_particle_fragment:lx,map_particle_pars_fragment:cx,metalnessmap_fragment:ux,metalnessmap_pars_fragment:fx,morphcolor_vertex:hx,morphnormal_vertex:dx,morphtarget_pars_vertex:px,morphtarget_vertex:mx,normal_fragment_begin:gx,normal_fragment_maps:vx,normal_pars_fragment:_x,normal_pars_vertex:xx,normal_vertex:yx,normalmap_pars_fragment:Sx,clearcoat_normal_fragment_begin:Mx,clearcoat_normal_fragment_maps:Tx,clearcoat_pars_fragment:bx,iridescence_pars_fragment:Ex,opaque_fragment:Ax,packing:wx,premultiplied_alpha_fragment:Cx,project_vertex:Rx,dithering_fragment:Lx,dithering_pars_fragment:Px,roughnessmap_fragment:Dx,roughnessmap_pars_fragment:Ix,shadowmap_pars_fragment:Nx,shadowmap_pars_vertex:Ux,shadowmap_vertex:Ox,shadowmask_pars_fragment:Fx,skinbase_vertex:Bx,skinning_pars_vertex:kx,skinning_vertex:Hx,skinnormal_vertex:zx,specularmap_fragment:Gx,specularmap_pars_fragment:Wx,tonemapping_fragment:Vx,tonemapping_pars_fragment:Xx,transmission_fragment:qx,transmission_pars_fragment:Yx,uv_pars_fragment:Kx,uv_pars_vertex:jx,uv_vertex:Zx,worldpos_vertex:Jx,background_vert:Qx,background_frag:$x,backgroundCube_vert:ey,backgroundCube_frag:ty,cube_vert:ny,cube_frag:iy,depth_vert:ry,depth_frag:sy,distanceRGBA_vert:ay,distanceRGBA_frag:oy,equirect_vert:ly,equirect_frag:cy,linedashed_vert:uy,linedashed_frag:fy,meshbasic_vert:hy,meshbasic_frag:dy,meshlambert_vert:py,meshlambert_frag:my,meshmatcap_vert:gy,meshmatcap_frag:vy,meshnormal_vert:_y,meshnormal_frag:xy,meshphong_vert:yy,meshphong_frag:Sy,meshphysical_vert:My,meshphysical_frag:Ty,meshtoon_vert:by,meshtoon_frag:Ey,points_vert:Ay,points_frag:wy,shadow_vert:Cy,shadow_frag:Ry,sprite_vert:Ly,sprite_frag:Py},Re={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new vt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new vt},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0},uvTransform:{value:new vt}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}}},oi={basic:{uniforms:wn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.fog]),vertexShader:mt.meshbasic_vert,fragmentShader:mt.meshbasic_frag},lambert:{uniforms:wn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)}}]),vertexShader:mt.meshlambert_vert,fragmentShader:mt.meshlambert_frag},phong:{uniforms:wn([Re.common,Re.specularmap,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:mt.meshphong_vert,fragmentShader:mt.meshphong_frag},standard:{uniforms:wn([Re.common,Re.envmap,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.roughnessmap,Re.metalnessmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag},toon:{uniforms:wn([Re.common,Re.aomap,Re.lightmap,Re.emissivemap,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.gradientmap,Re.fog,Re.lights,{emissive:{value:new Qe(0)}}]),vertexShader:mt.meshtoon_vert,fragmentShader:mt.meshtoon_frag},matcap:{uniforms:wn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,Re.fog,{matcap:{value:null}}]),vertexShader:mt.meshmatcap_vert,fragmentShader:mt.meshmatcap_frag},points:{uniforms:wn([Re.points,Re.fog]),vertexShader:mt.points_vert,fragmentShader:mt.points_frag},dashed:{uniforms:wn([Re.common,Re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:mt.linedashed_vert,fragmentShader:mt.linedashed_frag},depth:{uniforms:wn([Re.common,Re.displacementmap]),vertexShader:mt.depth_vert,fragmentShader:mt.depth_frag},normal:{uniforms:wn([Re.common,Re.bumpmap,Re.normalmap,Re.displacementmap,{opacity:{value:1}}]),vertexShader:mt.meshnormal_vert,fragmentShader:mt.meshnormal_frag},sprite:{uniforms:wn([Re.sprite,Re.fog]),vertexShader:mt.sprite_vert,fragmentShader:mt.sprite_frag},background:{uniforms:{uvTransform:{value:new vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:mt.background_vert,fragmentShader:mt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:mt.backgroundCube_vert,fragmentShader:mt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:mt.cube_vert,fragmentShader:mt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:mt.equirect_vert,fragmentShader:mt.equirect_frag},distanceRGBA:{uniforms:wn([Re.common,Re.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:mt.distanceRGBA_vert,fragmentShader:mt.distanceRGBA_frag},shadow:{uniforms:wn([Re.lights,Re.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:mt.shadow_vert,fragmentShader:mt.shadow_frag}};oi.physical={uniforms:wn([oi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new vt},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new vt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new vt},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new vt},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new vt},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new vt},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new vt}}]),vertexShader:mt.meshphysical_vert,fragmentShader:mt.meshphysical_frag};const Oo={r:0,b:0,g:0};function Dy(l,e,t,r,s,c,f){const h=new Qe(0);let p=c===!0?0:1,m,g,_=null,x=0,T=null;function A(M,S){let I=!1,R=S.isScene===!0?S.background:null;R&&R.isTexture&&(R=(S.backgroundBlurriness>0?t:e).get(R)),R===null?w(h,p):R&&R.isColor&&(w(R,1),I=!0);const N=l.xr.getEnvironmentBlendMode();N==="additive"?r.buffers.color.setClear(0,0,0,1,f):N==="alpha-blend"&&r.buffers.color.setClear(0,0,0,0,f),(l.autoClear||I)&&l.clear(l.autoClearColor,l.autoClearDepth,l.autoClearStencil),R&&(R.isCubeTexture||R.mapping===el)?(g===void 0&&(g=new Cn(new Pr(1,1,1),new Rr({name:"BackgroundCubeMaterial",uniforms:Ls(oi.backgroundCube.uniforms),vertexShader:oi.backgroundCube.vertexShader,fragmentShader:oi.backgroundCube.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),g.geometry.deleteAttribute("normal"),g.geometry.deleteAttribute("uv"),g.onBeforeRender=function(W,k,B){this.matrixWorld.copyPosition(B.matrixWorld)},Object.defineProperty(g.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(g)),g.material.uniforms.envMap.value=R,g.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,g.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,g.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,g.material.toneMapped=At.getTransfer(R.colorSpace)!==Ot,(_!==R||x!==R.version||T!==l.toneMapping)&&(g.material.needsUpdate=!0,_=R,x=R.version,T=l.toneMapping),g.layers.enableAll(),M.unshift(g,g.geometry,g.material,0,0,null)):R&&R.isTexture&&(m===void 0&&(m=new Cn(new uu(2,2),new Rr({name:"BackgroundMaterial",uniforms:Ls(oi.background.uniforms),vertexShader:oi.background.vertexShader,fragmentShader:oi.background.fragmentShader,side:Pi,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(m)),m.material.uniforms.t2D.value=R,m.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,m.material.toneMapped=At.getTransfer(R.colorSpace)!==Ot,R.matrixAutoUpdate===!0&&R.updateMatrix(),m.material.uniforms.uvTransform.value.copy(R.matrix),(_!==R||x!==R.version||T!==l.toneMapping)&&(m.material.needsUpdate=!0,_=R,x=R.version,T=l.toneMapping),m.layers.enableAll(),M.unshift(m,m.geometry,m.material,0,0,null))}function w(M,S){M.getRGB(Oo,kp(l)),r.buffers.color.setClear(Oo.r,Oo.g,Oo.b,S,f)}return{getClearColor:function(){return h},setClearColor:function(M,S=1){h.set(M),p=S,w(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(M){p=M,w(h,p)},render:A}}function Iy(l,e,t,r){const s=l.getParameter(l.MAX_VERTEX_ATTRIBS),c=r.isWebGL2?null:e.get("OES_vertex_array_object"),f=r.isWebGL2||c!==null,h={},p=M(null);let m=p,g=!1;function _(V,X,H,K,Q){let Z=!1;if(f){const le=w(K,H,X);m!==le&&(m=le,T(m.object)),Z=S(V,K,H,Q),Z&&I(V,K,H,Q)}else{const le=X.wireframe===!0;(m.geometry!==K.id||m.program!==H.id||m.wireframe!==le)&&(m.geometry=K.id,m.program=H.id,m.wireframe=le,Z=!0)}Q!==null&&t.update(Q,l.ELEMENT_ARRAY_BUFFER),(Z||g)&&(g=!1,ae(V,X,H,K),Q!==null&&l.bindBuffer(l.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function x(){return r.isWebGL2?l.createVertexArray():c.createVertexArrayOES()}function T(V){return r.isWebGL2?l.bindVertexArray(V):c.bindVertexArrayOES(V)}function A(V){return r.isWebGL2?l.deleteVertexArray(V):c.deleteVertexArrayOES(V)}function w(V,X,H){const K=H.wireframe===!0;let Q=h[V.id];Q===void 0&&(Q={},h[V.id]=Q);let Z=Q[X.id];Z===void 0&&(Z={},Q[X.id]=Z);let le=Z[K];return le===void 0&&(le=M(x()),Z[K]=le),le}function M(V){const X=[],H=[],K=[];for(let Q=0;Q<s;Q++)X[Q]=0,H[Q]=0,K[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:X,enabledAttributes:H,attributeDivisors:K,object:V,attributes:{},index:null}}function S(V,X,H,K){const Q=m.attributes,Z=X.attributes;let le=0;const de=H.getAttributes();for(const fe in de)if(de[fe].location>=0){const he=Q[fe];let we=Z[fe];if(we===void 0&&(fe==="instanceMatrix"&&V.instanceMatrix&&(we=V.instanceMatrix),fe==="instanceColor"&&V.instanceColor&&(we=V.instanceColor)),he===void 0||he.attribute!==we||we&&he.data!==we.data)return!0;le++}return m.attributesNum!==le||m.index!==K}function I(V,X,H,K){const Q={},Z=X.attributes;let le=0;const de=H.getAttributes();for(const fe in de)if(de[fe].location>=0){let he=Z[fe];he===void 0&&(fe==="instanceMatrix"&&V.instanceMatrix&&(he=V.instanceMatrix),fe==="instanceColor"&&V.instanceColor&&(he=V.instanceColor));const we={};we.attribute=he,he&&he.data&&(we.data=he.data),Q[fe]=we,le++}m.attributes=Q,m.attributesNum=le,m.index=K}function R(){const V=m.newAttributes;for(let X=0,H=V.length;X<H;X++)V[X]=0}function N(V){W(V,0)}function W(V,X){const H=m.newAttributes,K=m.enabledAttributes,Q=m.attributeDivisors;H[V]=1,K[V]===0&&(l.enableVertexAttribArray(V),K[V]=1),Q[V]!==X&&((r.isWebGL2?l:e.get("ANGLE_instanced_arrays"))[r.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](V,X),Q[V]=X)}function k(){const V=m.newAttributes,X=m.enabledAttributes;for(let H=0,K=X.length;H<K;H++)X[H]!==V[H]&&(l.disableVertexAttribArray(H),X[H]=0)}function B(V,X,H,K,Q,Z,le){le===!0?l.vertexAttribIPointer(V,X,H,Q,Z):l.vertexAttribPointer(V,X,H,K,Q,Z)}function ae(V,X,H,K){if(r.isWebGL2===!1&&(V.isInstancedMesh||K.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;R();const Q=K.attributes,Z=H.getAttributes(),le=X.defaultAttributeValues;for(const de in Z){const fe=Z[de];if(fe.location>=0){let ie=Q[de];if(ie===void 0&&(de==="instanceMatrix"&&V.instanceMatrix&&(ie=V.instanceMatrix),de==="instanceColor"&&V.instanceColor&&(ie=V.instanceColor)),ie!==void 0){const he=ie.normalized,we=ie.itemSize,Ge=t.get(ie);if(Ge===void 0)continue;const We=Ge.buffer,nt=Ge.type,je=Ge.bytesPerElement,Ye=r.isWebGL2===!0&&(nt===l.INT||nt===l.UNSIGNED_INT||ie.gpuType===Sp);if(ie.isInterleavedBufferAttribute){const Je=ie.data,ee=Je.stride,jt=ie.offset;if(Je.isInstancedInterleavedBuffer){for(let ke=0;ke<fe.locationSize;ke++)W(fe.location+ke,Je.meshPerAttribute);V.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=Je.meshPerAttribute*Je.count)}else for(let ke=0;ke<fe.locationSize;ke++)N(fe.location+ke);l.bindBuffer(l.ARRAY_BUFFER,We);for(let ke=0;ke<fe.locationSize;ke++)B(fe.location+ke,we/fe.locationSize,nt,he,ee*je,(jt+we/fe.locationSize*ke)*je,Ye)}else{if(ie.isInstancedBufferAttribute){for(let Je=0;Je<fe.locationSize;Je++)W(fe.location+Je,ie.meshPerAttribute);V.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let Je=0;Je<fe.locationSize;Je++)N(fe.location+Je);l.bindBuffer(l.ARRAY_BUFFER,We);for(let Je=0;Je<fe.locationSize;Je++)B(fe.location+Je,we/fe.locationSize,nt,he,we*je,we/fe.locationSize*Je*je,Ye)}}else if(le!==void 0){const he=le[de];if(he!==void 0)switch(he.length){case 2:l.vertexAttrib2fv(fe.location,he);break;case 3:l.vertexAttrib3fv(fe.location,he);break;case 4:l.vertexAttrib4fv(fe.location,he);break;default:l.vertexAttrib1fv(fe.location,he)}}}}k()}function L(){oe();for(const V in h){const X=h[V];for(const H in X){const K=X[H];for(const Q in K)A(K[Q].object),delete K[Q];delete X[H]}delete h[V]}}function O(V){if(h[V.id]===void 0)return;const X=h[V.id];for(const H in X){const K=X[H];for(const Q in K)A(K[Q].object),delete K[Q];delete X[H]}delete h[V.id]}function se(V){for(const X in h){const H=h[X];if(H[V.id]===void 0)continue;const K=H[V.id];for(const Q in K)A(K[Q].object),delete K[Q];delete H[V.id]}}function oe(){pe(),g=!0,m!==p&&(m=p,T(m.object))}function pe(){p.geometry=null,p.program=null,p.wireframe=!1}return{setup:_,reset:oe,resetDefaultState:pe,dispose:L,releaseStatesOfGeometry:O,releaseStatesOfProgram:se,initAttributes:R,enableAttribute:N,disableUnusedAttributes:k}}function Ny(l,e,t,r){const s=r.isWebGL2;let c;function f(g){c=g}function h(g,_){l.drawArrays(c,g,_),t.update(_,c,1)}function p(g,_,x){if(x===0)return;let T,A;if(s)T=l,A="drawArraysInstanced";else if(T=e.get("ANGLE_instanced_arrays"),A="drawArraysInstancedANGLE",T===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}T[A](c,g,_,x),t.update(_,c,x)}function m(g,_,x){if(x===0)return;const T=e.get("WEBGL_multi_draw");if(T===null)for(let A=0;A<x;A++)this.render(g[A],_[A]);else{T.multiDrawArraysWEBGL(c,g,0,_,0,x);let A=0;for(let w=0;w<x;w++)A+=_[w];t.update(A,c,1)}}this.setMode=f,this.render=h,this.renderInstances=p,this.renderMultiDraw=m}function Uy(l,e,t){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const B=e.get("EXT_texture_filter_anisotropic");r=l.getParameter(B.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function c(B){if(B==="highp"){if(l.getShaderPrecisionFormat(l.VERTEX_SHADER,l.HIGH_FLOAT).precision>0&&l.getShaderPrecisionFormat(l.FRAGMENT_SHADER,l.HIGH_FLOAT).precision>0)return"highp";B="mediump"}return B==="mediump"&&l.getShaderPrecisionFormat(l.VERTEX_SHADER,l.MEDIUM_FLOAT).precision>0&&l.getShaderPrecisionFormat(l.FRAGMENT_SHADER,l.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const f=typeof WebGL2RenderingContext<"u"&&l.constructor.name==="WebGL2RenderingContext";let h=t.precision!==void 0?t.precision:"highp";const p=c(h);p!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",p,"instead."),h=p);const m=f||e.has("WEBGL_draw_buffers"),g=t.logarithmicDepthBuffer===!0,_=l.getParameter(l.MAX_TEXTURE_IMAGE_UNITS),x=l.getParameter(l.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=l.getParameter(l.MAX_TEXTURE_SIZE),A=l.getParameter(l.MAX_CUBE_MAP_TEXTURE_SIZE),w=l.getParameter(l.MAX_VERTEX_ATTRIBS),M=l.getParameter(l.MAX_VERTEX_UNIFORM_VECTORS),S=l.getParameter(l.MAX_VARYING_VECTORS),I=l.getParameter(l.MAX_FRAGMENT_UNIFORM_VECTORS),R=x>0,N=f||e.has("OES_texture_float"),W=R&&N,k=f?l.getParameter(l.MAX_SAMPLES):0;return{isWebGL2:f,drawBuffers:m,getMaxAnisotropy:s,getMaxPrecision:c,precision:h,logarithmicDepthBuffer:g,maxTextures:_,maxVertexTextures:x,maxTextureSize:T,maxCubemapSize:A,maxAttributes:w,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:I,vertexTextures:R,floatFragmentTextures:N,floatVertexTextures:W,maxSamples:k}}function Oy(l){const e=this;let t=null,r=0,s=!1,c=!1;const f=new xr,h=new vt,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(_,x){const T=_.length!==0||x||r!==0||s;return s=x,r=_.length,T},this.beginShadows=function(){c=!0,g(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(_,x){t=g(_,x,0)},this.setState=function(_,x,T){const A=_.clippingPlanes,w=_.clipIntersection,M=_.clipShadows,S=l.get(_);if(!s||A===null||A.length===0||c&&!M)c?g(null):m();else{const I=c?0:r,R=I*4;let N=S.clippingState||null;p.value=N,N=g(A,x,R,T);for(let W=0;W!==R;++W)N[W]=t[W];S.clippingState=N,this.numIntersection=w?this.numPlanes:0,this.numPlanes+=I}};function m(){p.value!==t&&(p.value=t,p.needsUpdate=r>0),e.numPlanes=r,e.numIntersection=0}function g(_,x,T,A){const w=_!==null?_.length:0;let M=null;if(w!==0){if(M=p.value,A!==!0||M===null){const S=T+w*4,I=x.matrixWorldInverse;h.getNormalMatrix(I),(M===null||M.length<S)&&(M=new Float32Array(S));for(let R=0,N=T;R!==w;++R,N+=4)f.copy(_[R]).applyMatrix4(I,h),f.normal.toArray(M,N),M[N+3]=f.constant}p.value=M,p.needsUpdate=!0}return e.numPlanes=w,e.numIntersection=0,M}}function Fy(l){let e=new WeakMap;function t(f,h){return h===qc?f.mapping=bs:h===Yc&&(f.mapping=Es),f}function r(f){if(f&&f.isTexture){const h=f.mapping;if(h===qc||h===Yc)if(e.has(f)){const p=e.get(f).texture;return t(p,f.mapping)}else{const p=f.image;if(p&&p.height>0){const m=new j0(p.height/2);return m.fromEquirectangularTexture(l,f),e.set(f,m),f.addEventListener("dispose",s),t(m.texture,f.mapping)}else return null}}return f}function s(f){const h=f.target;h.removeEventListener("dispose",s);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function c(){e=new WeakMap}return{get:r,dispose:c}}class sl extends Hp{constructor(e=-1,t=1,r=1,s=-1,c=.1,f=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=r,this.bottom=s,this.near=c,this.far=f,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,r,s,c,f){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=r,this.view.offsetY=s,this.view.width=c,this.view.height=f,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),r=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let c=r-e,f=r+e,h=s+t,p=s-t;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,g=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,f=c+m*this.view.width,h-=g*this.view.offsetY,p=h-g*this.view.height}this.projectionMatrix.makeOrthographic(c,f,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const xs=4,xd=[.125,.215,.35,.446,.526,.582],Mr=20,wc=new sl,yd=new Qe;let Cc=null,Rc=0,Lc=0;const yr=(1+Math.sqrt(5))/2,vs=1/yr,Sd=[new Y(1,1,1),new Y(-1,1,1),new Y(1,1,-1),new Y(-1,1,-1),new Y(0,yr,vs),new Y(0,yr,-vs),new Y(vs,0,yr),new Y(-vs,0,yr),new Y(yr,vs,0),new Y(-yr,vs,0)];class Md{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,r=.1,s=100){Cc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel(),this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,r,s,c),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ed(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Cc,Rc,Lc),e.scissorTest=!1,Fo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===Es?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Cc=this._renderer.getRenderTarget(),Rc=this._renderer.getActiveCubeFace(),Lc=this._renderer.getActiveMipmapLevel();const r=t||this._allocateTargets();return this._textureToCubeUV(e,r),this._applyPMREM(r),this._cleanup(r),r}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,r={magFilter:Dn,minFilter:Dn,generateMipmaps:!1,type:Pa,format:Wn,colorSpace:hn,depthBuffer:!1},s=Td(e,t,r);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Td(e,t,r);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=By(c)),this._blurMaterial=ky(c,e,t)}return s}_compileMaterial(e){const t=new Cn(this._lodPlanes[0],e);this._renderer.compile(t,wc)}_sceneToCubeUV(e,t,r,s){const h=new In(90,1,t,r),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],g=this._renderer,_=g.autoClear,x=g.toneMapping;g.getClearColor(yd),g.toneMapping=$i,g.autoClear=!1;const T=new Tr({name:"PMREM.Background",side:Nn,depthWrite:!1,depthTest:!1}),A=new Cn(new Pr,T);let w=!1;const M=e.background;M?M.isColor&&(T.color.copy(M),e.background=null,w=!0):(T.color.copy(yd),w=!0);for(let S=0;S<6;S++){const I=S%3;I===0?(h.up.set(0,p[S],0),h.lookAt(m[S],0,0)):I===1?(h.up.set(0,0,p[S]),h.lookAt(0,m[S],0)):(h.up.set(0,p[S],0),h.lookAt(0,0,m[S]));const R=this._cubeSize;Fo(s,I*R,S>2?R:0,R,R),g.setRenderTarget(s),w&&g.render(A,h),g.render(e,h)}A.geometry.dispose(),A.material.dispose(),g.toneMapping=x,g.autoClear=_,e.background=M}_textureToCubeUV(e,t){const r=this._renderer,s=e.mapping===bs||e.mapping===Es;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ed()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bd());const c=s?this._cubemapMaterial:this._equirectMaterial,f=new Cn(this._lodPlanes[0],c),h=c.uniforms;h.envMap.value=e;const p=this._cubeSize;Fo(t,0,0,3*p,2*p),r.setRenderTarget(t),r.render(f,wc)}_applyPMREM(e){const t=this._renderer,r=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const c=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),f=Sd[(s-1)%Sd.length];this._blur(e,s-1,s,c,f)}t.autoClear=r}_blur(e,t,r,s,c){const f=this._pingPongRenderTarget;this._halfBlur(e,f,t,r,s,"latitudinal",c),this._halfBlur(f,e,r,r,s,"longitudinal",c)}_halfBlur(e,t,r,s,c,f,h){const p=this._renderer,m=this._blurMaterial;f!=="latitudinal"&&f!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const g=3,_=new Cn(this._lodPlanes[s],m),x=m.uniforms,T=this._sizeLods[r]-1,A=isFinite(c)?Math.PI/(2*T):2*Math.PI/(2*Mr-1),w=c/A,M=isFinite(c)?1+Math.floor(g*w):Mr;M>Mr&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${Mr}`);const S=[];let I=0;for(let B=0;B<Mr;++B){const ae=B/w,L=Math.exp(-ae*ae/2);S.push(L),B===0?I+=L:B<M&&(I+=2*L)}for(let B=0;B<S.length;B++)S[B]=S[B]/I;x.envMap.value=e.texture,x.samples.value=M,x.weights.value=S,x.latitudinal.value=f==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:R}=this;x.dTheta.value=A,x.mipInt.value=R-r;const N=this._sizeLods[s],W=3*N*(s>R-xs?s-R+xs:0),k=4*(this._cubeSize-N);Fo(t,W,k,3*N,2*N),p.setRenderTarget(t),p.render(_,wc)}}function By(l){const e=[],t=[],r=[];let s=l;const c=l-xs+1+xd.length;for(let f=0;f<c;f++){const h=Math.pow(2,s);t.push(h);let p=1/h;f>l-xs?p=xd[f-l+xs-1]:f===0&&(p=0),r.push(p);const m=1/(h-2),g=-m,_=1+m,x=[g,g,_,g,_,_,g,g,_,_,g,_],T=6,A=6,w=3,M=2,S=1,I=new Float32Array(w*A*T),R=new Float32Array(M*A*T),N=new Float32Array(S*A*T);for(let k=0;k<T;k++){const B=k%3*2/3-1,ae=k>2?0:-1,L=[B,ae,0,B+2/3,ae,0,B+2/3,ae+1,0,B,ae,0,B+2/3,ae+1,0,B,ae+1,0];I.set(L,w*A*k),R.set(x,M*A*k);const O=[k,k,k,k,k,k];N.set(O,S*A*k)}const W=new ni;W.setAttribute("position",new Rn(I,w)),W.setAttribute("uv",new Rn(R,M)),W.setAttribute("faceIndex",new Rn(N,S)),e.push(W),s>xs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:r}}function Td(l,e,t){const r=new Cr(l,e,t);return r.texture.mapping=el,r.texture.name="PMREM.cubeUv",r.scissorTest=!0,r}function Fo(l,e,t,r,s){l.viewport.set(e,t,r,s),l.scissor.set(e,t,r,s)}function ky(l,e,t){const r=new Float32Array(Mr),s=new Y(0,1,0);return new Rr({name:"SphericalGaussianBlur",defines:{n:Mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${l}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function bd(){return new Rr({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function Ed(){return new Rr({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qi,depthTest:!1,depthWrite:!1})}function fu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Hy(l){let e=new WeakMap,t=null;function r(h){if(h&&h.isTexture){const p=h.mapping,m=p===qc||p===Yc,g=p===bs||p===Es;if(m||g)if(h.isRenderTargetTexture&&h.needsPMREMUpdate===!0){h.needsPMREMUpdate=!1;let _=e.get(h);return t===null&&(t=new Md(l)),_=m?t.fromEquirectangular(h,_):t.fromCubemap(h,_),e.set(h,_),_.texture}else{if(e.has(h))return e.get(h).texture;{const _=h.image;if(m&&_&&_.height>0||g&&_&&s(_)){t===null&&(t=new Md(l));const x=m?t.fromEquirectangular(h):t.fromCubemap(h);return e.set(h,x),h.addEventListener("dispose",c),x.texture}else return null}}}return h}function s(h){let p=0;const m=6;for(let g=0;g<m;g++)h[g]!==void 0&&p++;return p===m}function c(h){const p=h.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function f(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:r,dispose:f}}function zy(l){const e={};function t(r){if(e[r]!==void 0)return e[r];let s;switch(r){case"WEBGL_depth_texture":s=l.getExtension("WEBGL_depth_texture")||l.getExtension("MOZ_WEBGL_depth_texture")||l.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=l.getExtension("EXT_texture_filter_anisotropic")||l.getExtension("MOZ_EXT_texture_filter_anisotropic")||l.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=l.getExtension("WEBGL_compressed_texture_s3tc")||l.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||l.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=l.getExtension("WEBGL_compressed_texture_pvrtc")||l.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=l.getExtension(r)}return e[r]=s,s}return{has:function(r){return t(r)!==null},init:function(r){r.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(r){const s=t(r);return s===null&&console.warn("THREE.WebGLRenderer: "+r+" extension not supported."),s}}}function Gy(l,e,t,r){const s={},c=new WeakMap;function f(_){const x=_.target;x.index!==null&&e.remove(x.index);for(const A in x.attributes)e.remove(x.attributes[A]);for(const A in x.morphAttributes){const w=x.morphAttributes[A];for(let M=0,S=w.length;M<S;M++)e.remove(w[M])}x.removeEventListener("dispose",f),delete s[x.id];const T=c.get(x);T&&(e.remove(T),c.delete(x)),r.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,t.memory.geometries--}function h(_,x){return s[x.id]===!0||(x.addEventListener("dispose",f),s[x.id]=!0,t.memory.geometries++),x}function p(_){const x=_.attributes;for(const A in x)e.update(x[A],l.ARRAY_BUFFER);const T=_.morphAttributes;for(const A in T){const w=T[A];for(let M=0,S=w.length;M<S;M++)e.update(w[M],l.ARRAY_BUFFER)}}function m(_){const x=[],T=_.index,A=_.attributes.position;let w=0;if(T!==null){const I=T.array;w=T.version;for(let R=0,N=I.length;R<N;R+=3){const W=I[R+0],k=I[R+1],B=I[R+2];x.push(W,k,k,B,B,W)}}else if(A!==void 0){const I=A.array;w=A.version;for(let R=0,N=I.length/3-1;R<N;R+=3){const W=R+0,k=R+1,B=R+2;x.push(W,k,k,B,B,W)}}else return;const M=new(Pp(x)?Bp:Fp)(x,1);M.version=w;const S=c.get(_);S&&e.remove(S),c.set(_,M)}function g(_){const x=c.get(_);if(x){const T=_.index;T!==null&&x.version<T.version&&m(_)}else m(_);return c.get(_)}return{get:h,update:p,getWireframeAttribute:g}}function Wy(l,e,t,r){const s=r.isWebGL2;let c;function f(T){c=T}let h,p;function m(T){h=T.type,p=T.bytesPerElement}function g(T,A){l.drawElements(c,A,h,T*p),t.update(A,c,1)}function _(T,A,w){if(w===0)return;let M,S;if(s)M=l,S="drawElementsInstanced";else if(M=e.get("ANGLE_instanced_arrays"),S="drawElementsInstancedANGLE",M===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}M[S](c,A,h,T*p,w),t.update(A,c,w)}function x(T,A,w){if(w===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let S=0;S<w;S++)this.render(T[S]/p,A[S]);else{M.multiDrawElementsWEBGL(c,A,0,h,T,0,w);let S=0;for(let I=0;I<w;I++)S+=A[I];t.update(S,c,1)}}this.setMode=f,this.setIndex=m,this.render=g,this.renderInstances=_,this.renderMultiDraw=x}function Vy(l){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function r(c,f,h){switch(t.calls++,f){case l.TRIANGLES:t.triangles+=h*(c/3);break;case l.LINES:t.lines+=h*(c/2);break;case l.LINE_STRIP:t.lines+=h*(c-1);break;case l.LINE_LOOP:t.lines+=h*c;break;case l.POINTS:t.points+=h*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",f);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:r}}function Xy(l,e){return l[0]-e[0]}function qy(l,e){return Math.abs(e[1])-Math.abs(l[1])}function Yy(l,e,t){const r={},s=new Float32Array(8),c=new WeakMap,f=new Dt,h=[];for(let m=0;m<8;m++)h[m]=[m,0];function p(m,g,_){const x=m.morphTargetInfluences;if(e.isWebGL2===!0){const A=g.morphAttributes.position||g.morphAttributes.normal||g.morphAttributes.color,w=A!==void 0?A.length:0;let M=c.get(g);if(M===void 0||M.count!==w){let X=function(){pe.dispose(),c.delete(g),g.removeEventListener("dispose",X)};var T=X;M!==void 0&&M.texture.dispose();const R=g.morphAttributes.position!==void 0,N=g.morphAttributes.normal!==void 0,W=g.morphAttributes.color!==void 0,k=g.morphAttributes.position||[],B=g.morphAttributes.normal||[],ae=g.morphAttributes.color||[];let L=0;R===!0&&(L=1),N===!0&&(L=2),W===!0&&(L=3);let O=g.attributes.position.count*L,se=1;O>e.maxTextureSize&&(se=Math.ceil(O/e.maxTextureSize),O=e.maxTextureSize);const oe=new Float32Array(O*se*4*w),pe=new Np(oe,O,se,w);pe.type=wi,pe.needsUpdate=!0;const V=L*4;for(let H=0;H<w;H++){const K=k[H],Q=B[H],Z=ae[H],le=O*se*4*H;for(let de=0;de<K.count;de++){const fe=de*V;R===!0&&(f.fromBufferAttribute(K,de),oe[le+fe+0]=f.x,oe[le+fe+1]=f.y,oe[le+fe+2]=f.z,oe[le+fe+3]=0),N===!0&&(f.fromBufferAttribute(Q,de),oe[le+fe+4]=f.x,oe[le+fe+5]=f.y,oe[le+fe+6]=f.z,oe[le+fe+7]=0),W===!0&&(f.fromBufferAttribute(Z,de),oe[le+fe+8]=f.x,oe[le+fe+9]=f.y,oe[le+fe+10]=f.z,oe[le+fe+11]=Z.itemSize===4?f.w:1)}}M={count:w,texture:pe,size:new _t(O,se)},c.set(g,M),g.addEventListener("dispose",X)}let S=0;for(let R=0;R<x.length;R++)S+=x[R];const I=g.morphTargetsRelative?1:1-S;_.getUniforms().setValue(l,"morphTargetBaseInfluence",I),_.getUniforms().setValue(l,"morphTargetInfluences",x),_.getUniforms().setValue(l,"morphTargetsTexture",M.texture,t),_.getUniforms().setValue(l,"morphTargetsTextureSize",M.size)}else{const A=x===void 0?0:x.length;let w=r[g.id];if(w===void 0||w.length!==A){w=[];for(let N=0;N<A;N++)w[N]=[N,0];r[g.id]=w}for(let N=0;N<A;N++){const W=w[N];W[0]=N,W[1]=x[N]}w.sort(qy);for(let N=0;N<8;N++)N<A&&w[N][1]?(h[N][0]=w[N][0],h[N][1]=w[N][1]):(h[N][0]=Number.MAX_SAFE_INTEGER,h[N][1]=0);h.sort(Xy);const M=g.morphAttributes.position,S=g.morphAttributes.normal;let I=0;for(let N=0;N<8;N++){const W=h[N],k=W[0],B=W[1];k!==Number.MAX_SAFE_INTEGER&&B?(M&&g.getAttribute("morphTarget"+N)!==M[k]&&g.setAttribute("morphTarget"+N,M[k]),S&&g.getAttribute("morphNormal"+N)!==S[k]&&g.setAttribute("morphNormal"+N,S[k]),s[N]=B,I+=B):(M&&g.hasAttribute("morphTarget"+N)===!0&&g.deleteAttribute("morphTarget"+N),S&&g.hasAttribute("morphNormal"+N)===!0&&g.deleteAttribute("morphNormal"+N),s[N]=0)}const R=g.morphTargetsRelative?1:1-I;_.getUniforms().setValue(l,"morphTargetBaseInfluence",R),_.getUniforms().setValue(l,"morphTargetInfluences",s)}}return{update:p}}function Ky(l,e,t,r){let s=new WeakMap;function c(p){const m=r.render.frame,g=p.geometry,_=e.get(p,g);if(s.get(_)!==m&&(e.update(_),s.set(_,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),s.get(p)!==m&&(t.update(p.instanceMatrix,l.ARRAY_BUFFER),p.instanceColor!==null&&t.update(p.instanceColor,l.ARRAY_BUFFER),s.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;s.get(x)!==m&&(x.update(),s.set(x,m))}return _}function f(){s=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),t.remove(m.instanceMatrix),m.instanceColor!==null&&t.remove(m.instanceColor)}return{update:c,dispose:f}}class Wp extends mn{constructor(e,t,r,s,c,f,h,p,m,g){if(g=g!==void 0?g:Er,g!==Er&&g!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");r===void 0&&g===Er&&(r=Zi),r===void 0&&g===ws&&(r=br),super(null,s,c,f,h,p,g,r,m),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=h!==void 0?h:fn,this.minFilter=p!==void 0?p:fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Vp=new mn,Xp=new Wp(1,1);Xp.compareFunction=Lp;const qp=new Np,Yp=new D0,Kp=new zp,Ad=[],wd=[],Cd=new Float32Array(16),Rd=new Float32Array(9),Ld=new Float32Array(4);function Os(l,e,t){const r=l[0];if(r<=0||r>0)return l;const s=e*t;let c=Ad[s];if(c===void 0&&(c=new Float32Array(s),Ad[s]=c),e!==0){r.toArray(c,0);for(let f=1,h=0;f!==e;++f)h+=t,l[f].toArray(c,h)}return c}function on(l,e){if(l.length!==e.length)return!1;for(let t=0,r=l.length;t<r;t++)if(l[t]!==e[t])return!1;return!0}function ln(l,e){for(let t=0,r=e.length;t<r;t++)l[t]=e[t]}function al(l,e){let t=wd[e];t===void 0&&(t=new Int32Array(e),wd[e]=t);for(let r=0;r!==e;++r)t[r]=l.allocateTextureUnit();return t}function jy(l,e){const t=this.cache;t[0]!==e&&(l.uniform1f(this.addr,e),t[0]=e)}function Zy(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(l.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;l.uniform2fv(this.addr,e),ln(t,e)}}function Jy(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(l.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(l.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(on(t,e))return;l.uniform3fv(this.addr,e),ln(t,e)}}function Qy(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(l.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;l.uniform4fv(this.addr,e),ln(t,e)}}function $y(l,e){const t=this.cache,r=e.elements;if(r===void 0){if(on(t,e))return;l.uniformMatrix2fv(this.addr,!1,e),ln(t,e)}else{if(on(t,r))return;Ld.set(r),l.uniformMatrix2fv(this.addr,!1,Ld),ln(t,r)}}function eS(l,e){const t=this.cache,r=e.elements;if(r===void 0){if(on(t,e))return;l.uniformMatrix3fv(this.addr,!1,e),ln(t,e)}else{if(on(t,r))return;Rd.set(r),l.uniformMatrix3fv(this.addr,!1,Rd),ln(t,r)}}function tS(l,e){const t=this.cache,r=e.elements;if(r===void 0){if(on(t,e))return;l.uniformMatrix4fv(this.addr,!1,e),ln(t,e)}else{if(on(t,r))return;Cd.set(r),l.uniformMatrix4fv(this.addr,!1,Cd),ln(t,r)}}function nS(l,e){const t=this.cache;t[0]!==e&&(l.uniform1i(this.addr,e),t[0]=e)}function iS(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(l.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;l.uniform2iv(this.addr,e),ln(t,e)}}function rS(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(l.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;l.uniform3iv(this.addr,e),ln(t,e)}}function sS(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(l.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;l.uniform4iv(this.addr,e),ln(t,e)}}function aS(l,e){const t=this.cache;t[0]!==e&&(l.uniform1ui(this.addr,e),t[0]=e)}function oS(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(l.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(on(t,e))return;l.uniform2uiv(this.addr,e),ln(t,e)}}function lS(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(l.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(on(t,e))return;l.uniform3uiv(this.addr,e),ln(t,e)}}function cS(l,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(l.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(on(t,e))return;l.uniform4uiv(this.addr,e),ln(t,e)}}function uS(l,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(l.uniform1i(this.addr,s),r[0]=s);const c=this.type===l.SAMPLER_2D_SHADOW?Xp:Vp;t.setTexture2D(e||c,s)}function fS(l,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(l.uniform1i(this.addr,s),r[0]=s),t.setTexture3D(e||Yp,s)}function hS(l,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(l.uniform1i(this.addr,s),r[0]=s),t.setTextureCube(e||Kp,s)}function dS(l,e,t){const r=this.cache,s=t.allocateTextureUnit();r[0]!==s&&(l.uniform1i(this.addr,s),r[0]=s),t.setTexture2DArray(e||qp,s)}function pS(l){switch(l){case 5126:return jy;case 35664:return Zy;case 35665:return Jy;case 35666:return Qy;case 35674:return $y;case 35675:return eS;case 35676:return tS;case 5124:case 35670:return nS;case 35667:case 35671:return iS;case 35668:case 35672:return rS;case 35669:case 35673:return sS;case 5125:return aS;case 36294:return oS;case 36295:return lS;case 36296:return cS;case 35678:case 36198:case 36298:case 36306:case 35682:return uS;case 35679:case 36299:case 36307:return fS;case 35680:case 36300:case 36308:case 36293:return hS;case 36289:case 36303:case 36311:case 36292:return dS}}function mS(l,e){l.uniform1fv(this.addr,e)}function gS(l,e){const t=Os(e,this.size,2);l.uniform2fv(this.addr,t)}function vS(l,e){const t=Os(e,this.size,3);l.uniform3fv(this.addr,t)}function _S(l,e){const t=Os(e,this.size,4);l.uniform4fv(this.addr,t)}function xS(l,e){const t=Os(e,this.size,4);l.uniformMatrix2fv(this.addr,!1,t)}function yS(l,e){const t=Os(e,this.size,9);l.uniformMatrix3fv(this.addr,!1,t)}function SS(l,e){const t=Os(e,this.size,16);l.uniformMatrix4fv(this.addr,!1,t)}function MS(l,e){l.uniform1iv(this.addr,e)}function TS(l,e){l.uniform2iv(this.addr,e)}function bS(l,e){l.uniform3iv(this.addr,e)}function ES(l,e){l.uniform4iv(this.addr,e)}function AS(l,e){l.uniform1uiv(this.addr,e)}function wS(l,e){l.uniform2uiv(this.addr,e)}function CS(l,e){l.uniform3uiv(this.addr,e)}function RS(l,e){l.uniform4uiv(this.addr,e)}function LS(l,e,t){const r=this.cache,s=e.length,c=al(t,s);on(r,c)||(l.uniform1iv(this.addr,c),ln(r,c));for(let f=0;f!==s;++f)t.setTexture2D(e[f]||Vp,c[f])}function PS(l,e,t){const r=this.cache,s=e.length,c=al(t,s);on(r,c)||(l.uniform1iv(this.addr,c),ln(r,c));for(let f=0;f!==s;++f)t.setTexture3D(e[f]||Yp,c[f])}function DS(l,e,t){const r=this.cache,s=e.length,c=al(t,s);on(r,c)||(l.uniform1iv(this.addr,c),ln(r,c));for(let f=0;f!==s;++f)t.setTextureCube(e[f]||Kp,c[f])}function IS(l,e,t){const r=this.cache,s=e.length,c=al(t,s);on(r,c)||(l.uniform1iv(this.addr,c),ln(r,c));for(let f=0;f!==s;++f)t.setTexture2DArray(e[f]||qp,c[f])}function NS(l){switch(l){case 5126:return mS;case 35664:return gS;case 35665:return vS;case 35666:return _S;case 35674:return xS;case 35675:return yS;case 35676:return SS;case 5124:case 35670:return MS;case 35667:case 35671:return TS;case 35668:case 35672:return bS;case 35669:case 35673:return ES;case 5125:return AS;case 36294:return wS;case 36295:return CS;case 36296:return RS;case 35678:case 36198:case 36298:case 36306:case 35682:return LS;case 35679:case 36299:case 36307:return PS;case 35680:case 36300:case 36308:case 36293:return DS;case 36289:case 36303:case 36311:case 36292:return IS}}class US{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.setValue=pS(t.type)}}class OS{constructor(e,t,r){this.id=e,this.addr=r,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=NS(t.type)}}class FS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,r){const s=this.seq;for(let c=0,f=s.length;c!==f;++c){const h=s[c];h.setValue(e,t[h.id],r)}}}const Pc=/(\w+)(\])?(\[|\.)?/g;function Pd(l,e){l.seq.push(e),l.map[e.id]=e}function BS(l,e,t){const r=l.name,s=r.length;for(Pc.lastIndex=0;;){const c=Pc.exec(r),f=Pc.lastIndex;let h=c[1];const p=c[2]==="]",m=c[3];if(p&&(h=h|0),m===void 0||m==="["&&f+2===s){Pd(t,m===void 0?new US(h,l,e):new OS(h,l,e));break}else{let _=t.map[h];_===void 0&&(_=new FS(h),Pd(t,_)),t=_}}}class Xo{constructor(e,t){this.seq=[],this.map={};const r=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<r;++s){const c=e.getActiveUniform(t,s),f=e.getUniformLocation(t,c.name);BS(c,f,this)}}setValue(e,t,r,s){const c=this.map[t];c!==void 0&&c.setValue(e,r,s)}setOptional(e,t,r){const s=t[r];s!==void 0&&this.setValue(e,r,s)}static upload(e,t,r,s){for(let c=0,f=t.length;c!==f;++c){const h=t[c],p=r[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,s)}}static seqWithValue(e,t){const r=[];for(let s=0,c=e.length;s!==c;++s){const f=e[s];f.id in t&&r.push(f)}return r}}function Dd(l,e,t){const r=l.createShader(e);return l.shaderSource(r,t),l.compileShader(r),r}const kS=37297;let HS=0;function zS(l,e){const t=l.split(`
`),r=[],s=Math.max(e-6,0),c=Math.min(e+6,t.length);for(let f=s;f<c;f++){const h=f+1;r.push(`${h===e?">":" "} ${h}: ${t[f]}`)}return r.join(`
`)}function GS(l){const e=At.getPrimaries(At.workingColorSpace),t=At.getPrimaries(l);let r;switch(e===t?r="":e===Zo&&t===jo?r="LinearDisplayP3ToLinearSRGB":e===jo&&t===Zo&&(r="LinearSRGBToLinearDisplayP3"),l){case hn:case nl:return[r,"LinearTransferOETF"];case Wt:case ou:return[r,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",l),[r,"LinearTransferOETF"]}}function Id(l,e,t){const r=l.getShaderParameter(e,l.COMPILE_STATUS),s=l.getShaderInfoLog(e).trim();if(r&&s==="")return"";const c=/ERROR: 0:(\d+)/.exec(s);if(c){const f=parseInt(c[1]);return t.toUpperCase()+`

`+s+`

`+zS(l.getShaderSource(e),f)}else return s}function WS(l,e){const t=GS(e);return`vec4 ${l}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function VS(l,e){let t;switch(e){case kv:t="Linear";break;case Hv:t="Reinhard";break;case zv:t="OptimizedCineon";break;case Gv:t="ACESFilmic";break;case Vv:t="AgX";break;case Wv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+l+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function XS(l){return[l.extensionDerivatives||l.envMapCubeUVHeight||l.bumpMap||l.normalMapTangentSpace||l.clearcoatNormalMap||l.flatShading||l.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(l.extensionFragDepth||l.logarithmicDepthBuffer)&&l.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",l.extensionDrawBuffers&&l.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(l.extensionShaderTextureLOD||l.envMap||l.transmission)&&l.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ys).join(`
`)}function qS(l){return[l.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ys).join(`
`)}function YS(l){const e=[];for(const t in l){const r=l[t];r!==!1&&e.push("#define "+t+" "+r)}return e.join(`
`)}function KS(l,e){const t={},r=l.getProgramParameter(e,l.ACTIVE_ATTRIBUTES);for(let s=0;s<r;s++){const c=l.getActiveAttrib(e,s),f=c.name;let h=1;c.type===l.FLOAT_MAT2&&(h=2),c.type===l.FLOAT_MAT3&&(h=3),c.type===l.FLOAT_MAT4&&(h=4),t[f]={type:c.type,location:l.getAttribLocation(e,f),locationSize:h}}return t}function ys(l){return l!==""}function Nd(l,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return l.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ud(l,e){return l.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jS=/^[ \t]*#include +<([\w\d./]+)>/gm;function $c(l){return l.replace(jS,JS)}const ZS=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function JS(l,e){let t=mt[e];if(t===void 0){const r=ZS.get(e);if(r!==void 0)t=mt[r],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,r);else throw new Error("Can not resolve #include <"+e+">")}return $c(t)}const QS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Od(l){return l.replace(QS,$S)}function $S(l,e,t,r){let s="";for(let c=parseInt(e);c<parseInt(t);c++)s+=r.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return s}function Fd(l){let e="precision "+l.precision+` float;
precision `+l.precision+" int;";return l.precision==="highp"?e+=`
#define HIGH_PRECISION`:l.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:l.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function eM(l){let e="SHADOWMAP_TYPE_BASIC";return l.shadowMapType===_p?e="SHADOWMAP_TYPE_PCF":l.shadowMapType===dv?e="SHADOWMAP_TYPE_PCF_SOFT":l.shadowMapType===Ai&&(e="SHADOWMAP_TYPE_VSM"),e}function tM(l){let e="ENVMAP_TYPE_CUBE";if(l.envMap)switch(l.envMapMode){case bs:case Es:e="ENVMAP_TYPE_CUBE";break;case el:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nM(l){let e="ENVMAP_MODE_REFLECTION";if(l.envMap)switch(l.envMapMode){case Es:e="ENVMAP_MODE_REFRACTION";break}return e}function iM(l){let e="ENVMAP_BLENDING_NONE";if(l.envMap)switch(l.combine){case $o:e="ENVMAP_BLENDING_MULTIPLY";break;case Fv:e="ENVMAP_BLENDING_MIX";break;case Bv:e="ENVMAP_BLENDING_ADD";break}return e}function rM(l){const e=l.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,r=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:r,maxMip:t}}function sM(l,e,t,r){const s=l.getContext(),c=t.defines;let f=t.vertexShader,h=t.fragmentShader;const p=eM(t),m=tM(t),g=nM(t),_=iM(t),x=rM(t),T=t.isWebGL2?"":XS(t),A=qS(t),w=YS(c),M=s.createProgram();let S,I,R=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(S=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w].filter(ys).join(`
`),S.length>0&&(S+=`
`),I=[T,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w].filter(ys).join(`
`),I.length>0&&(I+=`
`)):(S=[Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+g:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ys).join(`
`),I=[T,Fd(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,w,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+m:"",t.envMap?"#define "+g:"",t.envMap?"#define "+_:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+p:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$i?"#define TONE_MAPPING":"",t.toneMapping!==$i?mt.tonemapping_pars_fragment:"",t.toneMapping!==$i?VS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",mt.colorspace_pars_fragment,WS("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ys).join(`
`)),f=$c(f),f=Nd(f,t),f=Ud(f,t),h=$c(h),h=Nd(h,t),h=Ud(h,t),f=Od(f),h=Od(h),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,S=[A,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,I=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===td?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===td?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+I);const N=R+S+f,W=R+I+h,k=Dd(s,s.VERTEX_SHADER,N),B=Dd(s,s.FRAGMENT_SHADER,W);s.attachShader(M,k),s.attachShader(M,B),t.index0AttributeName!==void 0?s.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function ae(oe){if(l.debug.checkShaderErrors){const pe=s.getProgramInfoLog(M).trim(),V=s.getShaderInfoLog(k).trim(),X=s.getShaderInfoLog(B).trim();let H=!0,K=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(H=!1,typeof l.debug.onShaderError=="function")l.debug.onShaderError(s,M,k,B);else{const Q=Id(s,k,"vertex"),Z=Id(s,B,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Program Info Log: `+pe+`
`+Q+`
`+Z)}else pe!==""?console.warn("THREE.WebGLProgram: Program Info Log:",pe):(V===""||X==="")&&(K=!1);K&&(oe.diagnostics={runnable:H,programLog:pe,vertexShader:{log:V,prefix:S},fragmentShader:{log:X,prefix:I}})}s.deleteShader(k),s.deleteShader(B),L=new Xo(s,M),O=KS(s,M)}let L;this.getUniforms=function(){return L===void 0&&ae(this),L};let O;this.getAttributes=function(){return O===void 0&&ae(this),O};let se=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return se===!1&&(se=s.getProgramParameter(M,kS)),se},this.destroy=function(){r.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=HS++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=k,this.fragmentShader=B,this}let aM=0;class oM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,r=e.fragmentShader,s=this._getShaderStage(t),c=this._getShaderStage(r),f=this._getShaderCacheForMaterial(e);return f.has(s)===!1&&(f.add(s),s.usedTimes++),f.has(c)===!1&&(f.add(c),c.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const r of t)r.usedTimes--,r.usedTimes===0&&this.shaderCache.delete(r.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let r=t.get(e);return r===void 0&&(r=new Set,t.set(e,r)),r}_getShaderStage(e){const t=this.shaderCache;let r=t.get(e);return r===void 0&&(r=new lM(e),t.set(e,r)),r}}class lM{constructor(e){this.id=aM++,this.code=e,this.usedTimes=0}}function cM(l,e,t,r,s,c,f){const h=new Up,p=new oM,m=[],g=s.isWebGL2,_=s.logarithmicDepthBuffer,x=s.vertexTextures;let T=s.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function w(L){return L===0?"uv":`uv${L}`}function M(L,O,se,oe,pe){const V=oe.fog,X=pe.geometry,H=L.isMeshStandardMaterial?oe.environment:null,K=(L.isMeshStandardMaterial?t:e).get(L.envMap||H),Q=K&&K.mapping===el?K.image.height:null,Z=A[L.type];L.precision!==null&&(T=s.getMaxPrecision(L.precision),T!==L.precision&&console.warn("THREE.WebGLProgram.getParameters:",L.precision,"not supported, using",T,"instead."));const le=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,de=le!==void 0?le.length:0;let fe=0;X.morphAttributes.position!==void 0&&(fe=1),X.morphAttributes.normal!==void 0&&(fe=2),X.morphAttributes.color!==void 0&&(fe=3);let ie,he,we,Ge;if(Z){const $t=oi[Z];ie=$t.vertexShader,he=$t.fragmentShader}else ie=L.vertexShader,he=L.fragmentShader,p.update(L),we=p.getVertexShaderID(L),Ge=p.getFragmentShaderID(L);const We=l.getRenderTarget(),nt=pe.isInstancedMesh===!0,je=pe.isBatchedMesh===!0,Ye=!!L.map,Je=!!L.matcap,ee=!!K,jt=!!L.aoMap,ke=!!L.lightMap,rt=!!L.bumpMap,Oe=!!L.normalMap,Lt=!!L.displacementMap,lt=!!L.emissiveMap,U=!!L.metalnessMap,C=!!L.roughnessMap,$=L.anisotropy>0,ye=L.clearcoat>0,ve=L.iridescence>0,Se=L.sheen>0,Ve=L.transmission>0,Le=$&&!!L.anisotropyMap,Ne=ye&&!!L.clearcoatMap,$e=ye&&!!L.clearcoatNormalMap,pt=ye&&!!L.clearcoatRoughnessMap,me=ve&&!!L.iridescenceMap,bt=ve&&!!L.iridescenceThicknessMap,ct=Se&&!!L.sheenColorMap,at=Se&&!!L.sheenRoughnessMap,Xe=!!L.specularMap,Ie=!!L.specularColorMap,ft=!!L.specularIntensityMap,gt=Ve&&!!L.transmissionMap,Nt=Ve&&!!L.thicknessMap,Me=!!L.gradientMap,Ee=!!L.alphaMap,z=L.alphaTest>0,_e=!!L.alphaHash,xe=!!L.extensions,it=!!X.attributes.uv1,Fe=!!X.attributes.uv2,St=!!X.attributes.uv3;let ht=$i;return L.toneMapped&&(We===null||We.isXRRenderTarget===!0)&&(ht=l.toneMapping),{isWebGL2:g,shaderID:Z,shaderType:L.type,shaderName:L.name,vertexShader:ie,fragmentShader:he,defines:L.defines,customVertexShaderID:we,customFragmentShaderID:Ge,isRawShaderMaterial:L.isRawShaderMaterial===!0,glslVersion:L.glslVersion,precision:T,batching:je,instancing:nt,instancingColor:nt&&pe.instanceColor!==null,supportsVertexTextures:x,outputColorSpace:We===null?l.outputColorSpace:We.isXRRenderTarget===!0?We.texture.colorSpace:hn,map:Ye,matcap:Je,envMap:ee,envMapMode:ee&&K.mapping,envMapCubeUVHeight:Q,aoMap:jt,lightMap:ke,bumpMap:rt,normalMap:Oe,displacementMap:x&&Lt,emissiveMap:lt,normalMapObjectSpace:Oe&&L.normalMapType===r0,normalMapTangentSpace:Oe&&L.normalMapType===tl,metalnessMap:U,roughnessMap:C,anisotropy:$,anisotropyMap:Le,clearcoat:ye,clearcoatMap:Ne,clearcoatNormalMap:$e,clearcoatRoughnessMap:pt,iridescence:ve,iridescenceMap:me,iridescenceThicknessMap:bt,sheen:Se,sheenColorMap:ct,sheenRoughnessMap:at,specularMap:Xe,specularColorMap:Ie,specularIntensityMap:ft,transmission:Ve,transmissionMap:gt,thicknessMap:Nt,gradientMap:Me,opaque:L.transparent===!1&&L.blending===Ss,alphaMap:Ee,alphaTest:z,alphaHash:_e,combine:L.combine,mapUv:Ye&&w(L.map.channel),aoMapUv:jt&&w(L.aoMap.channel),lightMapUv:ke&&w(L.lightMap.channel),bumpMapUv:rt&&w(L.bumpMap.channel),normalMapUv:Oe&&w(L.normalMap.channel),displacementMapUv:Lt&&w(L.displacementMap.channel),emissiveMapUv:lt&&w(L.emissiveMap.channel),metalnessMapUv:U&&w(L.metalnessMap.channel),roughnessMapUv:C&&w(L.roughnessMap.channel),anisotropyMapUv:Le&&w(L.anisotropyMap.channel),clearcoatMapUv:Ne&&w(L.clearcoatMap.channel),clearcoatNormalMapUv:$e&&w(L.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&w(L.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&w(L.iridescenceMap.channel),iridescenceThicknessMapUv:bt&&w(L.iridescenceThicknessMap.channel),sheenColorMapUv:ct&&w(L.sheenColorMap.channel),sheenRoughnessMapUv:at&&w(L.sheenRoughnessMap.channel),specularMapUv:Xe&&w(L.specularMap.channel),specularColorMapUv:Ie&&w(L.specularColorMap.channel),specularIntensityMapUv:ft&&w(L.specularIntensityMap.channel),transmissionMapUv:gt&&w(L.transmissionMap.channel),thicknessMapUv:Nt&&w(L.thicknessMap.channel),alphaMapUv:Ee&&w(L.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Oe||$),vertexColors:L.vertexColors,vertexAlphas:L.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,vertexUv1s:it,vertexUv2s:Fe,vertexUv3s:St,pointsUvs:pe.isPoints===!0&&!!X.attributes.uv&&(Ye||Ee),fog:!!V,useFog:L.fog===!0,fogExp2:V&&V.isFogExp2,flatShading:L.flatShading===!0,sizeAttenuation:L.sizeAttenuation===!0,logarithmicDepthBuffer:_,skinning:pe.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:de,morphTextureStride:fe,numDirLights:O.directional.length,numPointLights:O.point.length,numSpotLights:O.spot.length,numSpotLightMaps:O.spotLightMap.length,numRectAreaLights:O.rectArea.length,numHemiLights:O.hemi.length,numDirLightShadows:O.directionalShadowMap.length,numPointLightShadows:O.pointShadowMap.length,numSpotLightShadows:O.spotShadowMap.length,numSpotLightShadowsWithMaps:O.numSpotLightShadowsWithMaps,numLightProbes:O.numLightProbes,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:L.dithering,shadowMapEnabled:l.shadowMap.enabled&&se.length>0,shadowMapType:l.shadowMap.type,toneMapping:ht,useLegacyLights:l._useLegacyLights,decodeVideoTexture:Ye&&L.map.isVideoTexture===!0&&At.getTransfer(L.map.colorSpace)===Ot,premultipliedAlpha:L.premultipliedAlpha,doubleSided:L.side===li,flipSided:L.side===Nn,useDepthPacking:L.depthPacking>=0,depthPacking:L.depthPacking||0,index0AttributeName:L.index0AttributeName,extensionDerivatives:xe&&L.extensions.derivatives===!0,extensionFragDepth:xe&&L.extensions.fragDepth===!0,extensionDrawBuffers:xe&&L.extensions.drawBuffers===!0,extensionShaderTextureLOD:xe&&L.extensions.shaderTextureLOD===!0,extensionClipCullDistance:xe&&L.extensions.clipCullDistance&&r.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:g||r.has("EXT_frag_depth"),rendererExtensionDrawBuffers:g||r.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:g||r.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:r.has("KHR_parallel_shader_compile"),customProgramCacheKey:L.customProgramCacheKey()}}function S(L){const O=[];if(L.shaderID?O.push(L.shaderID):(O.push(L.customVertexShaderID),O.push(L.customFragmentShaderID)),L.defines!==void 0)for(const se in L.defines)O.push(se),O.push(L.defines[se]);return L.isRawShaderMaterial===!1&&(I(O,L),R(O,L),O.push(l.outputColorSpace)),O.push(L.customProgramCacheKey),O.join()}function I(L,O){L.push(O.precision),L.push(O.outputColorSpace),L.push(O.envMapMode),L.push(O.envMapCubeUVHeight),L.push(O.mapUv),L.push(O.alphaMapUv),L.push(O.lightMapUv),L.push(O.aoMapUv),L.push(O.bumpMapUv),L.push(O.normalMapUv),L.push(O.displacementMapUv),L.push(O.emissiveMapUv),L.push(O.metalnessMapUv),L.push(O.roughnessMapUv),L.push(O.anisotropyMapUv),L.push(O.clearcoatMapUv),L.push(O.clearcoatNormalMapUv),L.push(O.clearcoatRoughnessMapUv),L.push(O.iridescenceMapUv),L.push(O.iridescenceThicknessMapUv),L.push(O.sheenColorMapUv),L.push(O.sheenRoughnessMapUv),L.push(O.specularMapUv),L.push(O.specularColorMapUv),L.push(O.specularIntensityMapUv),L.push(O.transmissionMapUv),L.push(O.thicknessMapUv),L.push(O.combine),L.push(O.fogExp2),L.push(O.sizeAttenuation),L.push(O.morphTargetsCount),L.push(O.morphAttributeCount),L.push(O.numDirLights),L.push(O.numPointLights),L.push(O.numSpotLights),L.push(O.numSpotLightMaps),L.push(O.numHemiLights),L.push(O.numRectAreaLights),L.push(O.numDirLightShadows),L.push(O.numPointLightShadows),L.push(O.numSpotLightShadows),L.push(O.numSpotLightShadowsWithMaps),L.push(O.numLightProbes),L.push(O.shadowMapType),L.push(O.toneMapping),L.push(O.numClippingPlanes),L.push(O.numClipIntersection),L.push(O.depthPacking)}function R(L,O){h.disableAll(),O.isWebGL2&&h.enable(0),O.supportsVertexTextures&&h.enable(1),O.instancing&&h.enable(2),O.instancingColor&&h.enable(3),O.matcap&&h.enable(4),O.envMap&&h.enable(5),O.normalMapObjectSpace&&h.enable(6),O.normalMapTangentSpace&&h.enable(7),O.clearcoat&&h.enable(8),O.iridescence&&h.enable(9),O.alphaTest&&h.enable(10),O.vertexColors&&h.enable(11),O.vertexAlphas&&h.enable(12),O.vertexUv1s&&h.enable(13),O.vertexUv2s&&h.enable(14),O.vertexUv3s&&h.enable(15),O.vertexTangents&&h.enable(16),O.anisotropy&&h.enable(17),O.alphaHash&&h.enable(18),O.batching&&h.enable(19),L.push(h.mask),h.disableAll(),O.fog&&h.enable(0),O.useFog&&h.enable(1),O.flatShading&&h.enable(2),O.logarithmicDepthBuffer&&h.enable(3),O.skinning&&h.enable(4),O.morphTargets&&h.enable(5),O.morphNormals&&h.enable(6),O.morphColors&&h.enable(7),O.premultipliedAlpha&&h.enable(8),O.shadowMapEnabled&&h.enable(9),O.useLegacyLights&&h.enable(10),O.doubleSided&&h.enable(11),O.flipSided&&h.enable(12),O.useDepthPacking&&h.enable(13),O.dithering&&h.enable(14),O.transmission&&h.enable(15),O.sheen&&h.enable(16),O.opaque&&h.enable(17),O.pointsUvs&&h.enable(18),O.decodeVideoTexture&&h.enable(19),L.push(h.mask)}function N(L){const O=A[L.type];let se;if(O){const oe=oi[O];se=X0.clone(oe.uniforms)}else se=L.uniforms;return se}function W(L,O){let se;for(let oe=0,pe=m.length;oe<pe;oe++){const V=m[oe];if(V.cacheKey===O){se=V,++se.usedTimes;break}}return se===void 0&&(se=new sM(l,O,L,c),m.push(se)),se}function k(L){if(--L.usedTimes===0){const O=m.indexOf(L);m[O]=m[m.length-1],m.pop(),L.destroy()}}function B(L){p.remove(L)}function ae(){p.dispose()}return{getParameters:M,getProgramCacheKey:S,getUniforms:N,acquireProgram:W,releaseProgram:k,releaseShaderCache:B,programs:m,dispose:ae}}function uM(){let l=new WeakMap;function e(c){let f=l.get(c);return f===void 0&&(f={},l.set(c,f)),f}function t(c){l.delete(c)}function r(c,f,h){l.get(c)[f]=h}function s(){l=new WeakMap}return{get:e,remove:t,update:r,dispose:s}}function fM(l,e){return l.groupOrder!==e.groupOrder?l.groupOrder-e.groupOrder:l.renderOrder!==e.renderOrder?l.renderOrder-e.renderOrder:l.material.id!==e.material.id?l.material.id-e.material.id:l.z!==e.z?l.z-e.z:l.id-e.id}function Bd(l,e){return l.groupOrder!==e.groupOrder?l.groupOrder-e.groupOrder:l.renderOrder!==e.renderOrder?l.renderOrder-e.renderOrder:l.z!==e.z?e.z-l.z:l.id-e.id}function kd(){const l=[];let e=0;const t=[],r=[],s=[];function c(){e=0,t.length=0,r.length=0,s.length=0}function f(_,x,T,A,w,M){let S=l[e];return S===void 0?(S={id:_.id,object:_,geometry:x,material:T,groupOrder:A,renderOrder:_.renderOrder,z:w,group:M},l[e]=S):(S.id=_.id,S.object=_,S.geometry=x,S.material=T,S.groupOrder=A,S.renderOrder=_.renderOrder,S.z=w,S.group=M),e++,S}function h(_,x,T,A,w,M){const S=f(_,x,T,A,w,M);T.transmission>0?r.push(S):T.transparent===!0?s.push(S):t.push(S)}function p(_,x,T,A,w,M){const S=f(_,x,T,A,w,M);T.transmission>0?r.unshift(S):T.transparent===!0?s.unshift(S):t.unshift(S)}function m(_,x){t.length>1&&t.sort(_||fM),r.length>1&&r.sort(x||Bd),s.length>1&&s.sort(x||Bd)}function g(){for(let _=e,x=l.length;_<x;_++){const T=l[_];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:t,transmissive:r,transparent:s,init:c,push:h,unshift:p,finish:g,sort:m}}function hM(){let l=new WeakMap;function e(r,s){const c=l.get(r);let f;return c===void 0?(f=new kd,l.set(r,[f])):s>=c.length?(f=new kd,c.push(f)):f=c[s],f}function t(){l=new WeakMap}return{get:e,dispose:t}}function dM(){const l={};return{get:function(e){if(l[e.id]!==void 0)return l[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new Qe};break;case"SpotLight":t={position:new Y,direction:new Y,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return l[e.id]=t,t}}}function pM(){const l={};return{get:function(e){if(l[e.id]!==void 0)return l[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return l[e.id]=t,t}}}let mM=0;function gM(l,e){return(e.castShadow?2:0)-(l.castShadow?2:0)+(e.map?1:0)-(l.map?1:0)}function vM(l,e){const t=new dM,r=pM(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let g=0;g<9;g++)s.probe.push(new Y);const c=new Y,f=new xt,h=new xt;function p(g,_){let x=0,T=0,A=0;for(let oe=0;oe<9;oe++)s.probe[oe].set(0,0,0);let w=0,M=0,S=0,I=0,R=0,N=0,W=0,k=0,B=0,ae=0,L=0;g.sort(gM);const O=_===!0?Math.PI:1;for(let oe=0,pe=g.length;oe<pe;oe++){const V=g[oe],X=V.color,H=V.intensity,K=V.distance,Q=V.shadow&&V.shadow.map?V.shadow.map.texture:null;if(V.isAmbientLight)x+=X.r*H*O,T+=X.g*H*O,A+=X.b*H*O;else if(V.isLightProbe){for(let Z=0;Z<9;Z++)s.probe[Z].addScaledVector(V.sh.coefficients[Z],H);L++}else if(V.isDirectionalLight){const Z=t.get(V);if(Z.color.copy(V.color).multiplyScalar(V.intensity*O),V.castShadow){const le=V.shadow,de=r.get(V);de.shadowBias=le.bias,de.shadowNormalBias=le.normalBias,de.shadowRadius=le.radius,de.shadowMapSize=le.mapSize,s.directionalShadow[w]=de,s.directionalShadowMap[w]=Q,s.directionalShadowMatrix[w]=V.shadow.matrix,N++}s.directional[w]=Z,w++}else if(V.isSpotLight){const Z=t.get(V);Z.position.setFromMatrixPosition(V.matrixWorld),Z.color.copy(X).multiplyScalar(H*O),Z.distance=K,Z.coneCos=Math.cos(V.angle),Z.penumbraCos=Math.cos(V.angle*(1-V.penumbra)),Z.decay=V.decay,s.spot[S]=Z;const le=V.shadow;if(V.map&&(s.spotLightMap[B]=V.map,B++,le.updateMatrices(V),V.castShadow&&ae++),s.spotLightMatrix[S]=le.matrix,V.castShadow){const de=r.get(V);de.shadowBias=le.bias,de.shadowNormalBias=le.normalBias,de.shadowRadius=le.radius,de.shadowMapSize=le.mapSize,s.spotShadow[S]=de,s.spotShadowMap[S]=Q,k++}S++}else if(V.isRectAreaLight){const Z=t.get(V);Z.color.copy(X).multiplyScalar(H),Z.halfWidth.set(V.width*.5,0,0),Z.halfHeight.set(0,V.height*.5,0),s.rectArea[I]=Z,I++}else if(V.isPointLight){const Z=t.get(V);if(Z.color.copy(V.color).multiplyScalar(V.intensity*O),Z.distance=V.distance,Z.decay=V.decay,V.castShadow){const le=V.shadow,de=r.get(V);de.shadowBias=le.bias,de.shadowNormalBias=le.normalBias,de.shadowRadius=le.radius,de.shadowMapSize=le.mapSize,de.shadowCameraNear=le.camera.near,de.shadowCameraFar=le.camera.far,s.pointShadow[M]=de,s.pointShadowMap[M]=Q,s.pointShadowMatrix[M]=V.shadow.matrix,W++}s.point[M]=Z,M++}else if(V.isHemisphereLight){const Z=t.get(V);Z.skyColor.copy(V.color).multiplyScalar(H*O),Z.groundColor.copy(V.groundColor).multiplyScalar(H*O),s.hemi[R]=Z,R++}}I>0&&(e.isWebGL2?l.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Re.LTC_FLOAT_1,s.rectAreaLTC2=Re.LTC_FLOAT_2):(s.rectAreaLTC1=Re.LTC_HALF_1,s.rectAreaLTC2=Re.LTC_HALF_2):l.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Re.LTC_FLOAT_1,s.rectAreaLTC2=Re.LTC_FLOAT_2):l.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=Re.LTC_HALF_1,s.rectAreaLTC2=Re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=x,s.ambient[1]=T,s.ambient[2]=A;const se=s.hash;(se.directionalLength!==w||se.pointLength!==M||se.spotLength!==S||se.rectAreaLength!==I||se.hemiLength!==R||se.numDirectionalShadows!==N||se.numPointShadows!==W||se.numSpotShadows!==k||se.numSpotMaps!==B||se.numLightProbes!==L)&&(s.directional.length=w,s.spot.length=S,s.rectArea.length=I,s.point.length=M,s.hemi.length=R,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.pointShadow.length=W,s.pointShadowMap.length=W,s.spotShadow.length=k,s.spotShadowMap.length=k,s.directionalShadowMatrix.length=N,s.pointShadowMatrix.length=W,s.spotLightMatrix.length=k+B-ae,s.spotLightMap.length=B,s.numSpotLightShadowsWithMaps=ae,s.numLightProbes=L,se.directionalLength=w,se.pointLength=M,se.spotLength=S,se.rectAreaLength=I,se.hemiLength=R,se.numDirectionalShadows=N,se.numPointShadows=W,se.numSpotShadows=k,se.numSpotMaps=B,se.numLightProbes=L,s.version=mM++)}function m(g,_){let x=0,T=0,A=0,w=0,M=0;const S=_.matrixWorldInverse;for(let I=0,R=g.length;I<R;I++){const N=g[I];if(N.isDirectionalLight){const W=s.directional[x];W.direction.setFromMatrixPosition(N.matrixWorld),c.setFromMatrixPosition(N.target.matrixWorld),W.direction.sub(c),W.direction.transformDirection(S),x++}else if(N.isSpotLight){const W=s.spot[A];W.position.setFromMatrixPosition(N.matrixWorld),W.position.applyMatrix4(S),W.direction.setFromMatrixPosition(N.matrixWorld),c.setFromMatrixPosition(N.target.matrixWorld),W.direction.sub(c),W.direction.transformDirection(S),A++}else if(N.isRectAreaLight){const W=s.rectArea[w];W.position.setFromMatrixPosition(N.matrixWorld),W.position.applyMatrix4(S),h.identity(),f.copy(N.matrixWorld),f.premultiply(S),h.extractRotation(f),W.halfWidth.set(N.width*.5,0,0),W.halfHeight.set(0,N.height*.5,0),W.halfWidth.applyMatrix4(h),W.halfHeight.applyMatrix4(h),w++}else if(N.isPointLight){const W=s.point[T];W.position.setFromMatrixPosition(N.matrixWorld),W.position.applyMatrix4(S),T++}else if(N.isHemisphereLight){const W=s.hemi[M];W.direction.setFromMatrixPosition(N.matrixWorld),W.direction.transformDirection(S),M++}}}return{setup:p,setupView:m,state:s}}function Hd(l,e){const t=new vM(l,e),r=[],s=[];function c(){r.length=0,s.length=0}function f(_){r.push(_)}function h(_){s.push(_)}function p(_){t.setup(r,_)}function m(_){t.setupView(r,_)}return{init:c,state:{lightsArray:r,shadowsArray:s,lights:t},setupLights:p,setupLightsView:m,pushLight:f,pushShadow:h}}function _M(l,e){let t=new WeakMap;function r(c,f=0){const h=t.get(c);let p;return h===void 0?(p=new Hd(l,e),t.set(c,[p])):f>=h.length?(p=new Hd(l,e),h.push(p)):p=h[f],p}function s(){t=new WeakMap}return{get:r,dispose:s}}class xM extends Xn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=n0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class yM extends Xn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const SM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,MM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function TM(l,e,t){let r=new cu;const s=new _t,c=new _t,f=new Dt,h=new xM({depthPacking:i0}),p=new yM,m={},g=t.maxTextureSize,_={[Pi]:Nn,[Nn]:Pi,[li]:li},x=new Rr({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:SM,fragmentShader:MM}),T=x.clone();T.defines.HORIZONTAL_PASS=1;const A=new ni;A.setAttribute("position",new Rn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const w=new Cn(A,x),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_p;let S=this.type;this.render=function(k,B,ae){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||k.length===0)return;const L=l.getRenderTarget(),O=l.getActiveCubeFace(),se=l.getActiveMipmapLevel(),oe=l.state;oe.setBlending(Qi),oe.buffers.color.setClear(1,1,1,1),oe.buffers.depth.setTest(!0),oe.setScissorTest(!1);const pe=S!==Ai&&this.type===Ai,V=S===Ai&&this.type!==Ai;for(let X=0,H=k.length;X<H;X++){const K=k[X],Q=K.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;s.copy(Q.mapSize);const Z=Q.getFrameExtents();if(s.multiply(Z),c.copy(Q.mapSize),(s.x>g||s.y>g)&&(s.x>g&&(c.x=Math.floor(g/Z.x),s.x=c.x*Z.x,Q.mapSize.x=c.x),s.y>g&&(c.y=Math.floor(g/Z.y),s.y=c.y*Z.y,Q.mapSize.y=c.y)),Q.map===null||pe===!0||V===!0){const de=this.type!==Ai?{minFilter:fn,magFilter:fn}:{};Q.map!==null&&Q.map.dispose(),Q.map=new Cr(s.x,s.y,de),Q.map.texture.name=K.name+".shadowMap",Q.camera.updateProjectionMatrix()}l.setRenderTarget(Q.map),l.clear();const le=Q.getViewportCount();for(let de=0;de<le;de++){const fe=Q.getViewport(de);f.set(c.x*fe.x,c.y*fe.y,c.x*fe.z,c.y*fe.w),oe.viewport(f),Q.updateMatrices(K,de),r=Q.getFrustum(),N(B,ae,Q.camera,K,this.type)}Q.isPointLightShadow!==!0&&this.type===Ai&&I(Q,ae),Q.needsUpdate=!1}S=this.type,M.needsUpdate=!1,l.setRenderTarget(L,O,se)};function I(k,B){const ae=e.update(w);x.defines.VSM_SAMPLES!==k.blurSamples&&(x.defines.VSM_SAMPLES=k.blurSamples,T.defines.VSM_SAMPLES=k.blurSamples,x.needsUpdate=!0,T.needsUpdate=!0),k.mapPass===null&&(k.mapPass=new Cr(s.x,s.y)),x.uniforms.shadow_pass.value=k.map.texture,x.uniforms.resolution.value=k.mapSize,x.uniforms.radius.value=k.radius,l.setRenderTarget(k.mapPass),l.clear(),l.renderBufferDirect(B,null,ae,x,w,null),T.uniforms.shadow_pass.value=k.mapPass.texture,T.uniforms.resolution.value=k.mapSize,T.uniforms.radius.value=k.radius,l.setRenderTarget(k.map),l.clear(),l.renderBufferDirect(B,null,ae,T,w,null)}function R(k,B,ae,L){let O=null;const se=ae.isPointLight===!0?k.customDistanceMaterial:k.customDepthMaterial;if(se!==void 0)O=se;else if(O=ae.isPointLight===!0?p:h,l.localClippingEnabled&&B.clipShadows===!0&&Array.isArray(B.clippingPlanes)&&B.clippingPlanes.length!==0||B.displacementMap&&B.displacementScale!==0||B.alphaMap&&B.alphaTest>0||B.map&&B.alphaTest>0){const oe=O.uuid,pe=B.uuid;let V=m[oe];V===void 0&&(V={},m[oe]=V);let X=V[pe];X===void 0&&(X=O.clone(),V[pe]=X,B.addEventListener("dispose",W)),O=X}if(O.visible=B.visible,O.wireframe=B.wireframe,L===Ai?O.side=B.shadowSide!==null?B.shadowSide:B.side:O.side=B.shadowSide!==null?B.shadowSide:_[B.side],O.alphaMap=B.alphaMap,O.alphaTest=B.alphaTest,O.map=B.map,O.clipShadows=B.clipShadows,O.clippingPlanes=B.clippingPlanes,O.clipIntersection=B.clipIntersection,O.displacementMap=B.displacementMap,O.displacementScale=B.displacementScale,O.displacementBias=B.displacementBias,O.wireframeLinewidth=B.wireframeLinewidth,O.linewidth=B.linewidth,ae.isPointLight===!0&&O.isMeshDistanceMaterial===!0){const oe=l.properties.get(O);oe.light=ae}return O}function N(k,B,ae,L,O){if(k.visible===!1)return;if(k.layers.test(B.layers)&&(k.isMesh||k.isLine||k.isPoints)&&(k.castShadow||k.receiveShadow&&O===Ai)&&(!k.frustumCulled||r.intersectsObject(k))){k.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,k.matrixWorld);const pe=e.update(k),V=k.material;if(Array.isArray(V)){const X=pe.groups;for(let H=0,K=X.length;H<K;H++){const Q=X[H],Z=V[Q.materialIndex];if(Z&&Z.visible){const le=R(k,Z,L,O);k.onBeforeShadow(l,k,B,ae,pe,le,Q),l.renderBufferDirect(ae,null,pe,le,k,Q),k.onAfterShadow(l,k,B,ae,pe,le,Q)}}}else if(V.visible){const X=R(k,V,L,O);k.onBeforeShadow(l,k,B,ae,pe,X,null),l.renderBufferDirect(ae,null,pe,X,k,null),k.onAfterShadow(l,k,B,ae,pe,X,null)}}const oe=k.children;for(let pe=0,V=oe.length;pe<V;pe++)N(oe[pe],B,ae,L,O)}function W(k){k.target.removeEventListener("dispose",W);for(const ae in m){const L=m[ae],O=k.target.uuid;O in L&&(L[O].dispose(),delete L[O])}}}function bM(l,e,t){const r=t.isWebGL2;function s(){let z=!1;const _e=new Dt;let xe=null;const it=new Dt(0,0,0,0);return{setMask:function(Fe){xe!==Fe&&!z&&(l.colorMask(Fe,Fe,Fe,Fe),xe=Fe)},setLocked:function(Fe){z=Fe},setClear:function(Fe,St,ht,Vt,$t){$t===!0&&(Fe*=Vt,St*=Vt,ht*=Vt),_e.set(Fe,St,ht,Vt),it.equals(_e)===!1&&(l.clearColor(Fe,St,ht,Vt),it.copy(_e))},reset:function(){z=!1,xe=null,it.set(-1,0,0,0)}}}function c(){let z=!1,_e=null,xe=null,it=null;return{setTest:function(Fe){Fe?je(l.DEPTH_TEST):Ye(l.DEPTH_TEST)},setMask:function(Fe){_e!==Fe&&!z&&(l.depthMask(Fe),_e=Fe)},setFunc:function(Fe){if(xe!==Fe){switch(Fe){case Lv:l.depthFunc(l.NEVER);break;case Pv:l.depthFunc(l.ALWAYS);break;case Dv:l.depthFunc(l.LESS);break;case qo:l.depthFunc(l.LEQUAL);break;case Iv:l.depthFunc(l.EQUAL);break;case Nv:l.depthFunc(l.GEQUAL);break;case Uv:l.depthFunc(l.GREATER);break;case Ov:l.depthFunc(l.NOTEQUAL);break;default:l.depthFunc(l.LEQUAL)}xe=Fe}},setLocked:function(Fe){z=Fe},setClear:function(Fe){it!==Fe&&(l.clearDepth(Fe),it=Fe)},reset:function(){z=!1,_e=null,xe=null,it=null}}}function f(){let z=!1,_e=null,xe=null,it=null,Fe=null,St=null,ht=null,Vt=null,$t=null;return{setTest:function(Mt){z||(Mt?je(l.STENCIL_TEST):Ye(l.STENCIL_TEST))},setMask:function(Mt){_e!==Mt&&!z&&(l.stencilMask(Mt),_e=Mt)},setFunc:function(Mt,en,Un){(xe!==Mt||it!==en||Fe!==Un)&&(l.stencilFunc(Mt,en,Un),xe=Mt,it=en,Fe=Un)},setOp:function(Mt,en,Un){(St!==Mt||ht!==en||Vt!==Un)&&(l.stencilOp(Mt,en,Un),St=Mt,ht=en,Vt=Un)},setLocked:function(Mt){z=Mt},setClear:function(Mt){$t!==Mt&&(l.clearStencil(Mt),$t=Mt)},reset:function(){z=!1,_e=null,xe=null,it=null,Fe=null,St=null,ht=null,Vt=null,$t=null}}}const h=new s,p=new c,m=new f,g=new WeakMap,_=new WeakMap;let x={},T={},A=new WeakMap,w=[],M=null,S=!1,I=null,R=null,N=null,W=null,k=null,B=null,ae=null,L=new Qe(0,0,0),O=0,se=!1,oe=null,pe=null,V=null,X=null,H=null;const K=l.getParameter(l.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Q=!1,Z=0;const le=l.getParameter(l.VERSION);le.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(le)[1]),Q=Z>=1):le.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),Q=Z>=2);let de=null,fe={};const ie=l.getParameter(l.SCISSOR_BOX),he=l.getParameter(l.VIEWPORT),we=new Dt().fromArray(ie),Ge=new Dt().fromArray(he);function We(z,_e,xe,it){const Fe=new Uint8Array(4),St=l.createTexture();l.bindTexture(z,St),l.texParameteri(z,l.TEXTURE_MIN_FILTER,l.NEAREST),l.texParameteri(z,l.TEXTURE_MAG_FILTER,l.NEAREST);for(let ht=0;ht<xe;ht++)r&&(z===l.TEXTURE_3D||z===l.TEXTURE_2D_ARRAY)?l.texImage3D(_e,0,l.RGBA,1,1,it,0,l.RGBA,l.UNSIGNED_BYTE,Fe):l.texImage2D(_e+ht,0,l.RGBA,1,1,0,l.RGBA,l.UNSIGNED_BYTE,Fe);return St}const nt={};nt[l.TEXTURE_2D]=We(l.TEXTURE_2D,l.TEXTURE_2D,1),nt[l.TEXTURE_CUBE_MAP]=We(l.TEXTURE_CUBE_MAP,l.TEXTURE_CUBE_MAP_POSITIVE_X,6),r&&(nt[l.TEXTURE_2D_ARRAY]=We(l.TEXTURE_2D_ARRAY,l.TEXTURE_2D_ARRAY,1,1),nt[l.TEXTURE_3D]=We(l.TEXTURE_3D,l.TEXTURE_3D,1,1)),h.setClear(0,0,0,1),p.setClear(1),m.setClear(0),je(l.DEPTH_TEST),p.setFunc(qo),lt(!1),U(xh),je(l.CULL_FACE),Oe(Qi);function je(z){x[z]!==!0&&(l.enable(z),x[z]=!0)}function Ye(z){x[z]!==!1&&(l.disable(z),x[z]=!1)}function Je(z,_e){return T[z]!==_e?(l.bindFramebuffer(z,_e),T[z]=_e,r&&(z===l.DRAW_FRAMEBUFFER&&(T[l.FRAMEBUFFER]=_e),z===l.FRAMEBUFFER&&(T[l.DRAW_FRAMEBUFFER]=_e)),!0):!1}function ee(z,_e){let xe=w,it=!1;if(z)if(xe=A.get(_e),xe===void 0&&(xe=[],A.set(_e,xe)),z.isWebGLMultipleRenderTargets){const Fe=z.texture;if(xe.length!==Fe.length||xe[0]!==l.COLOR_ATTACHMENT0){for(let St=0,ht=Fe.length;St<ht;St++)xe[St]=l.COLOR_ATTACHMENT0+St;xe.length=Fe.length,it=!0}}else xe[0]!==l.COLOR_ATTACHMENT0&&(xe[0]=l.COLOR_ATTACHMENT0,it=!0);else xe[0]!==l.BACK&&(xe[0]=l.BACK,it=!0);it&&(t.isWebGL2?l.drawBuffers(xe):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(xe))}function jt(z){return M!==z?(l.useProgram(z),M=z,!0):!1}const ke={[Sr]:l.FUNC_ADD,[mv]:l.FUNC_SUBTRACT,[gv]:l.FUNC_REVERSE_SUBTRACT};if(r)ke[Th]=l.MIN,ke[bh]=l.MAX;else{const z=e.get("EXT_blend_minmax");z!==null&&(ke[Th]=z.MIN_EXT,ke[bh]=z.MAX_EXT)}const rt={[vv]:l.ZERO,[_v]:l.ONE,[xv]:l.SRC_COLOR,[Vc]:l.SRC_ALPHA,[Ev]:l.SRC_ALPHA_SATURATE,[Tv]:l.DST_COLOR,[Sv]:l.DST_ALPHA,[yv]:l.ONE_MINUS_SRC_COLOR,[Xc]:l.ONE_MINUS_SRC_ALPHA,[bv]:l.ONE_MINUS_DST_COLOR,[Mv]:l.ONE_MINUS_DST_ALPHA,[Av]:l.CONSTANT_COLOR,[wv]:l.ONE_MINUS_CONSTANT_COLOR,[Cv]:l.CONSTANT_ALPHA,[Rv]:l.ONE_MINUS_CONSTANT_ALPHA};function Oe(z,_e,xe,it,Fe,St,ht,Vt,$t,Mt){if(z===Qi){S===!0&&(Ye(l.BLEND),S=!1);return}if(S===!1&&(je(l.BLEND),S=!0),z!==pv){if(z!==I||Mt!==se){if((R!==Sr||k!==Sr)&&(l.blendEquation(l.FUNC_ADD),R=Sr,k=Sr),Mt)switch(z){case Ss:l.blendFuncSeparate(l.ONE,l.ONE_MINUS_SRC_ALPHA,l.ONE,l.ONE_MINUS_SRC_ALPHA);break;case yh:l.blendFunc(l.ONE,l.ONE);break;case Sh:l.blendFuncSeparate(l.ZERO,l.ONE_MINUS_SRC_COLOR,l.ZERO,l.ONE);break;case Mh:l.blendFuncSeparate(l.ZERO,l.SRC_COLOR,l.ZERO,l.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Ss:l.blendFuncSeparate(l.SRC_ALPHA,l.ONE_MINUS_SRC_ALPHA,l.ONE,l.ONE_MINUS_SRC_ALPHA);break;case yh:l.blendFunc(l.SRC_ALPHA,l.ONE);break;case Sh:l.blendFuncSeparate(l.ZERO,l.ONE_MINUS_SRC_COLOR,l.ZERO,l.ONE);break;case Mh:l.blendFunc(l.ZERO,l.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}N=null,W=null,B=null,ae=null,L.set(0,0,0),O=0,I=z,se=Mt}return}Fe=Fe||_e,St=St||xe,ht=ht||it,(_e!==R||Fe!==k)&&(l.blendEquationSeparate(ke[_e],ke[Fe]),R=_e,k=Fe),(xe!==N||it!==W||St!==B||ht!==ae)&&(l.blendFuncSeparate(rt[xe],rt[it],rt[St],rt[ht]),N=xe,W=it,B=St,ae=ht),(Vt.equals(L)===!1||$t!==O)&&(l.blendColor(Vt.r,Vt.g,Vt.b,$t),L.copy(Vt),O=$t),I=z,se=!1}function Lt(z,_e){z.side===li?Ye(l.CULL_FACE):je(l.CULL_FACE);let xe=z.side===Nn;_e&&(xe=!xe),lt(xe),z.blending===Ss&&z.transparent===!1?Oe(Qi):Oe(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),p.setFunc(z.depthFunc),p.setTest(z.depthTest),p.setMask(z.depthWrite),h.setMask(z.colorWrite);const it=z.stencilWrite;m.setTest(it),it&&(m.setMask(z.stencilWriteMask),m.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),m.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),$(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?je(l.SAMPLE_ALPHA_TO_COVERAGE):Ye(l.SAMPLE_ALPHA_TO_COVERAGE)}function lt(z){oe!==z&&(z?l.frontFace(l.CW):l.frontFace(l.CCW),oe=z)}function U(z){z!==fv?(je(l.CULL_FACE),z!==pe&&(z===xh?l.cullFace(l.BACK):z===hv?l.cullFace(l.FRONT):l.cullFace(l.FRONT_AND_BACK))):Ye(l.CULL_FACE),pe=z}function C(z){z!==V&&(Q&&l.lineWidth(z),V=z)}function $(z,_e,xe){z?(je(l.POLYGON_OFFSET_FILL),(X!==_e||H!==xe)&&(l.polygonOffset(_e,xe),X=_e,H=xe)):Ye(l.POLYGON_OFFSET_FILL)}function ye(z){z?je(l.SCISSOR_TEST):Ye(l.SCISSOR_TEST)}function ve(z){z===void 0&&(z=l.TEXTURE0+K-1),de!==z&&(l.activeTexture(z),de=z)}function Se(z,_e,xe){xe===void 0&&(de===null?xe=l.TEXTURE0+K-1:xe=de);let it=fe[xe];it===void 0&&(it={type:void 0,texture:void 0},fe[xe]=it),(it.type!==z||it.texture!==_e)&&(de!==xe&&(l.activeTexture(xe),de=xe),l.bindTexture(z,_e||nt[z]),it.type=z,it.texture=_e)}function Ve(){const z=fe[de];z!==void 0&&z.type!==void 0&&(l.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function Le(){try{l.compressedTexImage2D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ne(){try{l.compressedTexImage3D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function $e(){try{l.texSubImage2D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function pt(){try{l.texSubImage3D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{l.compressedTexSubImage2D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function bt(){try{l.compressedTexSubImage3D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ct(){try{l.texStorage2D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function at(){try{l.texStorage3D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Xe(){try{l.texImage2D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ie(){try{l.texImage3D.apply(l,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ft(z){we.equals(z)===!1&&(l.scissor(z.x,z.y,z.z,z.w),we.copy(z))}function gt(z){Ge.equals(z)===!1&&(l.viewport(z.x,z.y,z.z,z.w),Ge.copy(z))}function Nt(z,_e){let xe=_.get(_e);xe===void 0&&(xe=new WeakMap,_.set(_e,xe));let it=xe.get(z);it===void 0&&(it=l.getUniformBlockIndex(_e,z.name),xe.set(z,it))}function Me(z,_e){const it=_.get(_e).get(z);g.get(_e)!==it&&(l.uniformBlockBinding(_e,it,z.__bindingPointIndex),g.set(_e,it))}function Ee(){l.disable(l.BLEND),l.disable(l.CULL_FACE),l.disable(l.DEPTH_TEST),l.disable(l.POLYGON_OFFSET_FILL),l.disable(l.SCISSOR_TEST),l.disable(l.STENCIL_TEST),l.disable(l.SAMPLE_ALPHA_TO_COVERAGE),l.blendEquation(l.FUNC_ADD),l.blendFunc(l.ONE,l.ZERO),l.blendFuncSeparate(l.ONE,l.ZERO,l.ONE,l.ZERO),l.blendColor(0,0,0,0),l.colorMask(!0,!0,!0,!0),l.clearColor(0,0,0,0),l.depthMask(!0),l.depthFunc(l.LESS),l.clearDepth(1),l.stencilMask(4294967295),l.stencilFunc(l.ALWAYS,0,4294967295),l.stencilOp(l.KEEP,l.KEEP,l.KEEP),l.clearStencil(0),l.cullFace(l.BACK),l.frontFace(l.CCW),l.polygonOffset(0,0),l.activeTexture(l.TEXTURE0),l.bindFramebuffer(l.FRAMEBUFFER,null),r===!0&&(l.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),l.bindFramebuffer(l.READ_FRAMEBUFFER,null)),l.useProgram(null),l.lineWidth(1),l.scissor(0,0,l.canvas.width,l.canvas.height),l.viewport(0,0,l.canvas.width,l.canvas.height),x={},de=null,fe={},T={},A=new WeakMap,w=[],M=null,S=!1,I=null,R=null,N=null,W=null,k=null,B=null,ae=null,L=new Qe(0,0,0),O=0,se=!1,oe=null,pe=null,V=null,X=null,H=null,we.set(0,0,l.canvas.width,l.canvas.height),Ge.set(0,0,l.canvas.width,l.canvas.height),h.reset(),p.reset(),m.reset()}return{buffers:{color:h,depth:p,stencil:m},enable:je,disable:Ye,bindFramebuffer:Je,drawBuffers:ee,useProgram:jt,setBlending:Oe,setMaterial:Lt,setFlipSided:lt,setCullFace:U,setLineWidth:C,setPolygonOffset:$,setScissorTest:ye,activeTexture:ve,bindTexture:Se,unbindTexture:Ve,compressedTexImage2D:Le,compressedTexImage3D:Ne,texImage2D:Xe,texImage3D:Ie,updateUBOMapping:Nt,uniformBlockBinding:Me,texStorage2D:ct,texStorage3D:at,texSubImage2D:$e,texSubImage3D:pt,compressedTexSubImage2D:me,compressedTexSubImage3D:bt,scissor:ft,viewport:gt,reset:Ee}}function EM(l,e,t,r,s,c,f){const h=s.isWebGL2,p=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,m=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const x=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(U,C){return T?new OffscreenCanvas(U,C):Ia("canvas")}function w(U,C,$,ye){let ve=1;if((U.width>ye||U.height>ye)&&(ve=ye/Math.max(U.width,U.height)),ve<1||C===!0)if(typeof HTMLImageElement<"u"&&U instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&U instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&U instanceof ImageBitmap){const Se=C?Qo:Math.floor,Ve=Se(ve*U.width),Le=Se(ve*U.height);_===void 0&&(_=A(Ve,Le));const Ne=$?A(Ve,Le):_;return Ne.width=Ve,Ne.height=Le,Ne.getContext("2d").drawImage(U,0,0,Ve,Le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+U.width+"x"+U.height+") to ("+Ve+"x"+Le+")."),Ne}else return"data"in U&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+U.width+"x"+U.height+")."),U;return U}function M(U){return Qc(U.width)&&Qc(U.height)}function S(U){return h?!1:U.wrapS!==Gn||U.wrapT!==Gn||U.minFilter!==fn&&U.minFilter!==Dn}function I(U,C){return U.generateMipmaps&&C&&U.minFilter!==fn&&U.minFilter!==Dn}function R(U){l.generateMipmap(U)}function N(U,C,$,ye,ve=!1){if(h===!1)return C;if(U!==null){if(l[U]!==void 0)return l[U];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+U+"'")}let Se=C;if(C===l.RED&&($===l.FLOAT&&(Se=l.R32F),$===l.HALF_FLOAT&&(Se=l.R16F),$===l.UNSIGNED_BYTE&&(Se=l.R8)),C===l.RED_INTEGER&&($===l.UNSIGNED_BYTE&&(Se=l.R8UI),$===l.UNSIGNED_SHORT&&(Se=l.R16UI),$===l.UNSIGNED_INT&&(Se=l.R32UI),$===l.BYTE&&(Se=l.R8I),$===l.SHORT&&(Se=l.R16I),$===l.INT&&(Se=l.R32I)),C===l.RG&&($===l.FLOAT&&(Se=l.RG32F),$===l.HALF_FLOAT&&(Se=l.RG16F),$===l.UNSIGNED_BYTE&&(Se=l.RG8)),C===l.RGBA){const Ve=ve?Ko:At.getTransfer(ye);$===l.FLOAT&&(Se=l.RGBA32F),$===l.HALF_FLOAT&&(Se=l.RGBA16F),$===l.UNSIGNED_BYTE&&(Se=Ve===Ot?l.SRGB8_ALPHA8:l.RGBA8),$===l.UNSIGNED_SHORT_4_4_4_4&&(Se=l.RGBA4),$===l.UNSIGNED_SHORT_5_5_5_1&&(Se=l.RGB5_A1)}return(Se===l.R16F||Se===l.R32F||Se===l.RG16F||Se===l.RG32F||Se===l.RGBA16F||Se===l.RGBA32F)&&e.get("EXT_color_buffer_float"),Se}function W(U,C,$){return I(U,$)===!0||U.isFramebufferTexture&&U.minFilter!==fn&&U.minFilter!==Dn?Math.log2(Math.max(C.width,C.height))+1:U.mipmaps!==void 0&&U.mipmaps.length>0?U.mipmaps.length:U.isCompressedTexture&&Array.isArray(U.image)?C.mipmaps.length:1}function k(U){return U===fn||U===Kc||U===Vo?l.NEAREST:l.LINEAR}function B(U){const C=U.target;C.removeEventListener("dispose",B),L(C),C.isVideoTexture&&g.delete(C)}function ae(U){const C=U.target;C.removeEventListener("dispose",ae),se(C)}function L(U){const C=r.get(U);if(C.__webglInit===void 0)return;const $=U.source,ye=x.get($);if(ye){const ve=ye[C.__cacheKey];ve.usedTimes--,ve.usedTimes===0&&O(U),Object.keys(ye).length===0&&x.delete($)}r.remove(U)}function O(U){const C=r.get(U);l.deleteTexture(C.__webglTexture);const $=U.source,ye=x.get($);delete ye[C.__cacheKey],f.memory.textures--}function se(U){const C=U.texture,$=r.get(U),ye=r.get(C);if(ye.__webglTexture!==void 0&&(l.deleteTexture(ye.__webglTexture),f.memory.textures--),U.depthTexture&&U.depthTexture.dispose(),U.isWebGLCubeRenderTarget)for(let ve=0;ve<6;ve++){if(Array.isArray($.__webglFramebuffer[ve]))for(let Se=0;Se<$.__webglFramebuffer[ve].length;Se++)l.deleteFramebuffer($.__webglFramebuffer[ve][Se]);else l.deleteFramebuffer($.__webglFramebuffer[ve]);$.__webglDepthbuffer&&l.deleteRenderbuffer($.__webglDepthbuffer[ve])}else{if(Array.isArray($.__webglFramebuffer))for(let ve=0;ve<$.__webglFramebuffer.length;ve++)l.deleteFramebuffer($.__webglFramebuffer[ve]);else l.deleteFramebuffer($.__webglFramebuffer);if($.__webglDepthbuffer&&l.deleteRenderbuffer($.__webglDepthbuffer),$.__webglMultisampledFramebuffer&&l.deleteFramebuffer($.__webglMultisampledFramebuffer),$.__webglColorRenderbuffer)for(let ve=0;ve<$.__webglColorRenderbuffer.length;ve++)$.__webglColorRenderbuffer[ve]&&l.deleteRenderbuffer($.__webglColorRenderbuffer[ve]);$.__webglDepthRenderbuffer&&l.deleteRenderbuffer($.__webglDepthRenderbuffer)}if(U.isWebGLMultipleRenderTargets)for(let ve=0,Se=C.length;ve<Se;ve++){const Ve=r.get(C[ve]);Ve.__webglTexture&&(l.deleteTexture(Ve.__webglTexture),f.memory.textures--),r.remove(C[ve])}r.remove(C),r.remove(U)}let oe=0;function pe(){oe=0}function V(){const U=oe;return U>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+U+" texture units while this GPU supports only "+s.maxTextures),oe+=1,U}function X(U){const C=[];return C.push(U.wrapS),C.push(U.wrapT),C.push(U.wrapR||0),C.push(U.magFilter),C.push(U.minFilter),C.push(U.anisotropy),C.push(U.internalFormat),C.push(U.format),C.push(U.type),C.push(U.generateMipmaps),C.push(U.premultiplyAlpha),C.push(U.flipY),C.push(U.unpackAlignment),C.push(U.colorSpace),C.join()}function H(U,C){const $=r.get(U);if(U.isVideoTexture&&Lt(U),U.isRenderTargetTexture===!1&&U.version>0&&$.__version!==U.version){const ye=U.image;if(ye===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ye.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{we($,U,C);return}}t.bindTexture(l.TEXTURE_2D,$.__webglTexture,l.TEXTURE0+C)}function K(U,C){const $=r.get(U);if(U.version>0&&$.__version!==U.version){we($,U,C);return}t.bindTexture(l.TEXTURE_2D_ARRAY,$.__webglTexture,l.TEXTURE0+C)}function Q(U,C){const $=r.get(U);if(U.version>0&&$.__version!==U.version){we($,U,C);return}t.bindTexture(l.TEXTURE_3D,$.__webglTexture,l.TEXTURE0+C)}function Z(U,C){const $=r.get(U);if(U.version>0&&$.__version!==U.version){Ge($,U,C);return}t.bindTexture(l.TEXTURE_CUBE_MAP,$.__webglTexture,l.TEXTURE0+C)}const le={[As]:l.REPEAT,[Gn]:l.CLAMP_TO_EDGE,[Yo]:l.MIRRORED_REPEAT},de={[fn]:l.NEAREST,[Kc]:l.NEAREST_MIPMAP_NEAREST,[Vo]:l.NEAREST_MIPMAP_LINEAR,[Dn]:l.LINEAR,[yp]:l.LINEAR_MIPMAP_NEAREST,[wr]:l.LINEAR_MIPMAP_LINEAR},fe={[s0]:l.NEVER,[f0]:l.ALWAYS,[a0]:l.LESS,[Lp]:l.LEQUAL,[o0]:l.EQUAL,[u0]:l.GEQUAL,[l0]:l.GREATER,[c0]:l.NOTEQUAL};function ie(U,C,$){if($?(l.texParameteri(U,l.TEXTURE_WRAP_S,le[C.wrapS]),l.texParameteri(U,l.TEXTURE_WRAP_T,le[C.wrapT]),(U===l.TEXTURE_3D||U===l.TEXTURE_2D_ARRAY)&&l.texParameteri(U,l.TEXTURE_WRAP_R,le[C.wrapR]),l.texParameteri(U,l.TEXTURE_MAG_FILTER,de[C.magFilter]),l.texParameteri(U,l.TEXTURE_MIN_FILTER,de[C.minFilter])):(l.texParameteri(U,l.TEXTURE_WRAP_S,l.CLAMP_TO_EDGE),l.texParameteri(U,l.TEXTURE_WRAP_T,l.CLAMP_TO_EDGE),(U===l.TEXTURE_3D||U===l.TEXTURE_2D_ARRAY)&&l.texParameteri(U,l.TEXTURE_WRAP_R,l.CLAMP_TO_EDGE),(C.wrapS!==Gn||C.wrapT!==Gn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),l.texParameteri(U,l.TEXTURE_MAG_FILTER,k(C.magFilter)),l.texParameteri(U,l.TEXTURE_MIN_FILTER,k(C.minFilter)),C.minFilter!==fn&&C.minFilter!==Dn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(l.texParameteri(U,l.TEXTURE_COMPARE_MODE,l.COMPARE_REF_TO_TEXTURE),l.texParameteri(U,l.TEXTURE_COMPARE_FUNC,fe[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const ye=e.get("EXT_texture_filter_anisotropic");if(C.magFilter===fn||C.minFilter!==Vo&&C.minFilter!==wr||C.type===wi&&e.has("OES_texture_float_linear")===!1||h===!1&&C.type===Pa&&e.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||r.get(C).__currentAnisotropy)&&(l.texParameterf(U,ye.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),r.get(C).__currentAnisotropy=C.anisotropy)}}function he(U,C){let $=!1;U.__webglInit===void 0&&(U.__webglInit=!0,C.addEventListener("dispose",B));const ye=C.source;let ve=x.get(ye);ve===void 0&&(ve={},x.set(ye,ve));const Se=X(C);if(Se!==U.__cacheKey){ve[Se]===void 0&&(ve[Se]={texture:l.createTexture(),usedTimes:0},f.memory.textures++,$=!0),ve[Se].usedTimes++;const Ve=ve[U.__cacheKey];Ve!==void 0&&(ve[U.__cacheKey].usedTimes--,Ve.usedTimes===0&&O(C)),U.__cacheKey=Se,U.__webglTexture=ve[Se].texture}return $}function we(U,C,$){let ye=l.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ye=l.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ye=l.TEXTURE_3D);const ve=he(U,C),Se=C.source;t.bindTexture(ye,U.__webglTexture,l.TEXTURE0+$);const Ve=r.get(Se);if(Se.version!==Ve.__version||ve===!0){t.activeTexture(l.TEXTURE0+$);const Le=At.getPrimaries(At.workingColorSpace),Ne=C.colorSpace===Vn?null:At.getPrimaries(C.colorSpace),$e=C.colorSpace===Vn||Le===Ne?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,C.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,C.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,$e);const pt=S(C)&&M(C.image)===!1;let me=w(C.image,pt,!1,s.maxTextureSize);me=lt(C,me);const bt=M(me)||h,ct=c.convert(C.format,C.colorSpace);let at=c.convert(C.type),Xe=N(C.internalFormat,ct,at,C.colorSpace,C.isVideoTexture);ie(ye,C,bt);let Ie;const ft=C.mipmaps,gt=h&&C.isVideoTexture!==!0&&Xe!==wp,Nt=Ve.__version===void 0||ve===!0,Me=W(C,me,bt);if(C.isDepthTexture)Xe=l.DEPTH_COMPONENT,h?C.type===wi?Xe=l.DEPTH_COMPONENT32F:C.type===Zi?Xe=l.DEPTH_COMPONENT24:C.type===br?Xe=l.DEPTH24_STENCIL8:Xe=l.DEPTH_COMPONENT16:C.type===wi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===Er&&Xe===l.DEPTH_COMPONENT&&C.type!==au&&C.type!==Zi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=Zi,at=c.convert(C.type)),C.format===ws&&Xe===l.DEPTH_COMPONENT&&(Xe=l.DEPTH_STENCIL,C.type!==br&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=br,at=c.convert(C.type))),Nt&&(gt?t.texStorage2D(l.TEXTURE_2D,1,Xe,me.width,me.height):t.texImage2D(l.TEXTURE_2D,0,Xe,me.width,me.height,0,ct,at,null));else if(C.isDataTexture)if(ft.length>0&&bt){gt&&Nt&&t.texStorage2D(l.TEXTURE_2D,Me,Xe,ft[0].width,ft[0].height);for(let Ee=0,z=ft.length;Ee<z;Ee++)Ie=ft[Ee],gt?t.texSubImage2D(l.TEXTURE_2D,Ee,0,0,Ie.width,Ie.height,ct,at,Ie.data):t.texImage2D(l.TEXTURE_2D,Ee,Xe,Ie.width,Ie.height,0,ct,at,Ie.data);C.generateMipmaps=!1}else gt?(Nt&&t.texStorage2D(l.TEXTURE_2D,Me,Xe,me.width,me.height),t.texSubImage2D(l.TEXTURE_2D,0,0,0,me.width,me.height,ct,at,me.data)):t.texImage2D(l.TEXTURE_2D,0,Xe,me.width,me.height,0,ct,at,me.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){gt&&Nt&&t.texStorage3D(l.TEXTURE_2D_ARRAY,Me,Xe,ft[0].width,ft[0].height,me.depth);for(let Ee=0,z=ft.length;Ee<z;Ee++)Ie=ft[Ee],C.format!==Wn?ct!==null?gt?t.compressedTexSubImage3D(l.TEXTURE_2D_ARRAY,Ee,0,0,0,Ie.width,Ie.height,me.depth,ct,Ie.data,0,0):t.compressedTexImage3D(l.TEXTURE_2D_ARRAY,Ee,Xe,Ie.width,Ie.height,me.depth,0,Ie.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?t.texSubImage3D(l.TEXTURE_2D_ARRAY,Ee,0,0,0,Ie.width,Ie.height,me.depth,ct,at,Ie.data):t.texImage3D(l.TEXTURE_2D_ARRAY,Ee,Xe,Ie.width,Ie.height,me.depth,0,ct,at,Ie.data)}else{gt&&Nt&&t.texStorage2D(l.TEXTURE_2D,Me,Xe,ft[0].width,ft[0].height);for(let Ee=0,z=ft.length;Ee<z;Ee++)Ie=ft[Ee],C.format!==Wn?ct!==null?gt?t.compressedTexSubImage2D(l.TEXTURE_2D,Ee,0,0,Ie.width,Ie.height,ct,Ie.data):t.compressedTexImage2D(l.TEXTURE_2D,Ee,Xe,Ie.width,Ie.height,0,Ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?t.texSubImage2D(l.TEXTURE_2D,Ee,0,0,Ie.width,Ie.height,ct,at,Ie.data):t.texImage2D(l.TEXTURE_2D,Ee,Xe,Ie.width,Ie.height,0,ct,at,Ie.data)}else if(C.isDataArrayTexture)gt?(Nt&&t.texStorage3D(l.TEXTURE_2D_ARRAY,Me,Xe,me.width,me.height,me.depth),t.texSubImage3D(l.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,ct,at,me.data)):t.texImage3D(l.TEXTURE_2D_ARRAY,0,Xe,me.width,me.height,me.depth,0,ct,at,me.data);else if(C.isData3DTexture)gt?(Nt&&t.texStorage3D(l.TEXTURE_3D,Me,Xe,me.width,me.height,me.depth),t.texSubImage3D(l.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,ct,at,me.data)):t.texImage3D(l.TEXTURE_3D,0,Xe,me.width,me.height,me.depth,0,ct,at,me.data);else if(C.isFramebufferTexture){if(Nt)if(gt)t.texStorage2D(l.TEXTURE_2D,Me,Xe,me.width,me.height);else{let Ee=me.width,z=me.height;for(let _e=0;_e<Me;_e++)t.texImage2D(l.TEXTURE_2D,_e,Xe,Ee,z,0,ct,at,null),Ee>>=1,z>>=1}}else if(ft.length>0&&bt){gt&&Nt&&t.texStorage2D(l.TEXTURE_2D,Me,Xe,ft[0].width,ft[0].height);for(let Ee=0,z=ft.length;Ee<z;Ee++)Ie=ft[Ee],gt?t.texSubImage2D(l.TEXTURE_2D,Ee,0,0,ct,at,Ie):t.texImage2D(l.TEXTURE_2D,Ee,Xe,ct,at,Ie);C.generateMipmaps=!1}else gt?(Nt&&t.texStorage2D(l.TEXTURE_2D,Me,Xe,me.width,me.height),t.texSubImage2D(l.TEXTURE_2D,0,0,0,ct,at,me)):t.texImage2D(l.TEXTURE_2D,0,Xe,ct,at,me);I(C,bt)&&R(ye),Ve.__version=Se.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function Ge(U,C,$){if(C.image.length!==6)return;const ye=he(U,C),ve=C.source;t.bindTexture(l.TEXTURE_CUBE_MAP,U.__webglTexture,l.TEXTURE0+$);const Se=r.get(ve);if(ve.version!==Se.__version||ye===!0){t.activeTexture(l.TEXTURE0+$);const Ve=At.getPrimaries(At.workingColorSpace),Le=C.colorSpace===Vn?null:At.getPrimaries(C.colorSpace),Ne=C.colorSpace===Vn||Ve===Le?l.NONE:l.BROWSER_DEFAULT_WEBGL;l.pixelStorei(l.UNPACK_FLIP_Y_WEBGL,C.flipY),l.pixelStorei(l.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),l.pixelStorei(l.UNPACK_ALIGNMENT,C.unpackAlignment),l.pixelStorei(l.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const $e=C.isCompressedTexture||C.image[0].isCompressedTexture,pt=C.image[0]&&C.image[0].isDataTexture,me=[];for(let Ee=0;Ee<6;Ee++)!$e&&!pt?me[Ee]=w(C.image[Ee],!1,!0,s.maxCubemapSize):me[Ee]=pt?C.image[Ee].image:C.image[Ee],me[Ee]=lt(C,me[Ee]);const bt=me[0],ct=M(bt)||h,at=c.convert(C.format,C.colorSpace),Xe=c.convert(C.type),Ie=N(C.internalFormat,at,Xe,C.colorSpace),ft=h&&C.isVideoTexture!==!0,gt=Se.__version===void 0||ye===!0;let Nt=W(C,bt,ct);ie(l.TEXTURE_CUBE_MAP,C,ct);let Me;if($e){ft&&gt&&t.texStorage2D(l.TEXTURE_CUBE_MAP,Nt,Ie,bt.width,bt.height);for(let Ee=0;Ee<6;Ee++){Me=me[Ee].mipmaps;for(let z=0;z<Me.length;z++){const _e=Me[z];C.format!==Wn?at!==null?ft?t.compressedTexSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z,0,0,_e.width,_e.height,at,_e.data):t.compressedTexImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z,Ie,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ft?t.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z,0,0,_e.width,_e.height,at,Xe,_e.data):t.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z,Ie,_e.width,_e.height,0,at,Xe,_e.data)}}}else{Me=C.mipmaps,ft&&gt&&(Me.length>0&&Nt++,t.texStorage2D(l.TEXTURE_CUBE_MAP,Nt,Ie,me[0].width,me[0].height));for(let Ee=0;Ee<6;Ee++)if(pt){ft?t.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,me[Ee].width,me[Ee].height,at,Xe,me[Ee].data):t.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,Ie,me[Ee].width,me[Ee].height,0,at,Xe,me[Ee].data);for(let z=0;z<Me.length;z++){const xe=Me[z].image[Ee].image;ft?t.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z+1,0,0,xe.width,xe.height,at,Xe,xe.data):t.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z+1,Ie,xe.width,xe.height,0,at,Xe,xe.data)}}else{ft?t.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,0,0,at,Xe,me[Ee]):t.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,Ie,at,Xe,me[Ee]);for(let z=0;z<Me.length;z++){const _e=Me[z];ft?t.texSubImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z+1,0,0,at,Xe,_e.image[Ee]):t.texImage2D(l.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,z+1,Ie,at,Xe,_e.image[Ee])}}}I(C,ct)&&R(l.TEXTURE_CUBE_MAP),Se.__version=ve.version,C.onUpdate&&C.onUpdate(C)}U.__version=C.version}function We(U,C,$,ye,ve,Se){const Ve=c.convert($.format,$.colorSpace),Le=c.convert($.type),Ne=N($.internalFormat,Ve,Le,$.colorSpace);if(!r.get(C).__hasExternalTextures){const pt=Math.max(1,C.width>>Se),me=Math.max(1,C.height>>Se);ve===l.TEXTURE_3D||ve===l.TEXTURE_2D_ARRAY?t.texImage3D(ve,Se,Ne,pt,me,C.depth,0,Ve,Le,null):t.texImage2D(ve,Se,Ne,pt,me,0,Ve,Le,null)}t.bindFramebuffer(l.FRAMEBUFFER,U),Oe(C)?p.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,ye,ve,r.get($).__webglTexture,0,rt(C)):(ve===l.TEXTURE_2D||ve>=l.TEXTURE_CUBE_MAP_POSITIVE_X&&ve<=l.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&l.framebufferTexture2D(l.FRAMEBUFFER,ye,ve,r.get($).__webglTexture,Se),t.bindFramebuffer(l.FRAMEBUFFER,null)}function nt(U,C,$){if(l.bindRenderbuffer(l.RENDERBUFFER,U),C.depthBuffer&&!C.stencilBuffer){let ye=h===!0?l.DEPTH_COMPONENT24:l.DEPTH_COMPONENT16;if($||Oe(C)){const ve=C.depthTexture;ve&&ve.isDepthTexture&&(ve.type===wi?ye=l.DEPTH_COMPONENT32F:ve.type===Zi&&(ye=l.DEPTH_COMPONENT24));const Se=rt(C);Oe(C)?p.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,Se,ye,C.width,C.height):l.renderbufferStorageMultisample(l.RENDERBUFFER,Se,ye,C.width,C.height)}else l.renderbufferStorage(l.RENDERBUFFER,ye,C.width,C.height);l.framebufferRenderbuffer(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.RENDERBUFFER,U)}else if(C.depthBuffer&&C.stencilBuffer){const ye=rt(C);$&&Oe(C)===!1?l.renderbufferStorageMultisample(l.RENDERBUFFER,ye,l.DEPTH24_STENCIL8,C.width,C.height):Oe(C)?p.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,ye,l.DEPTH24_STENCIL8,C.width,C.height):l.renderbufferStorage(l.RENDERBUFFER,l.DEPTH_STENCIL,C.width,C.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.RENDERBUFFER,U)}else{const ye=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ve=0;ve<ye.length;ve++){const Se=ye[ve],Ve=c.convert(Se.format,Se.colorSpace),Le=c.convert(Se.type),Ne=N(Se.internalFormat,Ve,Le,Se.colorSpace),$e=rt(C);$&&Oe(C)===!1?l.renderbufferStorageMultisample(l.RENDERBUFFER,$e,Ne,C.width,C.height):Oe(C)?p.renderbufferStorageMultisampleEXT(l.RENDERBUFFER,$e,Ne,C.width,C.height):l.renderbufferStorage(l.RENDERBUFFER,Ne,C.width,C.height)}}l.bindRenderbuffer(l.RENDERBUFFER,null)}function je(U,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(l.FRAMEBUFFER,U),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!r.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),H(C.depthTexture,0);const ye=r.get(C.depthTexture).__webglTexture,ve=rt(C);if(C.depthTexture.format===Er)Oe(C)?p.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,ye,0,ve):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_ATTACHMENT,l.TEXTURE_2D,ye,0);else if(C.depthTexture.format===ws)Oe(C)?p.framebufferTexture2DMultisampleEXT(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,ye,0,ve):l.framebufferTexture2D(l.FRAMEBUFFER,l.DEPTH_STENCIL_ATTACHMENT,l.TEXTURE_2D,ye,0);else throw new Error("Unknown depthTexture format")}function Ye(U){const C=r.get(U),$=U.isWebGLCubeRenderTarget===!0;if(U.depthTexture&&!C.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");je(C.__webglFramebuffer,U)}else if($){C.__webglDepthbuffer=[];for(let ye=0;ye<6;ye++)t.bindFramebuffer(l.FRAMEBUFFER,C.__webglFramebuffer[ye]),C.__webglDepthbuffer[ye]=l.createRenderbuffer(),nt(C.__webglDepthbuffer[ye],U,!1)}else t.bindFramebuffer(l.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=l.createRenderbuffer(),nt(C.__webglDepthbuffer,U,!1);t.bindFramebuffer(l.FRAMEBUFFER,null)}function Je(U,C,$){const ye=r.get(U);C!==void 0&&We(ye.__webglFramebuffer,U,U.texture,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,0),$!==void 0&&Ye(U)}function ee(U){const C=U.texture,$=r.get(U),ye=r.get(C);U.addEventListener("dispose",ae),U.isWebGLMultipleRenderTargets!==!0&&(ye.__webglTexture===void 0&&(ye.__webglTexture=l.createTexture()),ye.__version=C.version,f.memory.textures++);const ve=U.isWebGLCubeRenderTarget===!0,Se=U.isWebGLMultipleRenderTargets===!0,Ve=M(U)||h;if(ve){$.__webglFramebuffer=[];for(let Le=0;Le<6;Le++)if(h&&C.mipmaps&&C.mipmaps.length>0){$.__webglFramebuffer[Le]=[];for(let Ne=0;Ne<C.mipmaps.length;Ne++)$.__webglFramebuffer[Le][Ne]=l.createFramebuffer()}else $.__webglFramebuffer[Le]=l.createFramebuffer()}else{if(h&&C.mipmaps&&C.mipmaps.length>0){$.__webglFramebuffer=[];for(let Le=0;Le<C.mipmaps.length;Le++)$.__webglFramebuffer[Le]=l.createFramebuffer()}else $.__webglFramebuffer=l.createFramebuffer();if(Se)if(s.drawBuffers){const Le=U.texture;for(let Ne=0,$e=Le.length;Ne<$e;Ne++){const pt=r.get(Le[Ne]);pt.__webglTexture===void 0&&(pt.__webglTexture=l.createTexture(),f.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(h&&U.samples>0&&Oe(U)===!1){const Le=Se?C:[C];$.__webglMultisampledFramebuffer=l.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(l.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let Ne=0;Ne<Le.length;Ne++){const $e=Le[Ne];$.__webglColorRenderbuffer[Ne]=l.createRenderbuffer(),l.bindRenderbuffer(l.RENDERBUFFER,$.__webglColorRenderbuffer[Ne]);const pt=c.convert($e.format,$e.colorSpace),me=c.convert($e.type),bt=N($e.internalFormat,pt,me,$e.colorSpace,U.isXRRenderTarget===!0),ct=rt(U);l.renderbufferStorageMultisample(l.RENDERBUFFER,ct,bt,U.width,U.height),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+Ne,l.RENDERBUFFER,$.__webglColorRenderbuffer[Ne])}l.bindRenderbuffer(l.RENDERBUFFER,null),U.depthBuffer&&($.__webglDepthRenderbuffer=l.createRenderbuffer(),nt($.__webglDepthRenderbuffer,U,!0)),t.bindFramebuffer(l.FRAMEBUFFER,null)}}if(ve){t.bindTexture(l.TEXTURE_CUBE_MAP,ye.__webglTexture),ie(l.TEXTURE_CUBE_MAP,C,Ve);for(let Le=0;Le<6;Le++)if(h&&C.mipmaps&&C.mipmaps.length>0)for(let Ne=0;Ne<C.mipmaps.length;Ne++)We($.__webglFramebuffer[Le][Ne],U,C,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+Le,Ne);else We($.__webglFramebuffer[Le],U,C,l.COLOR_ATTACHMENT0,l.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0);I(C,Ve)&&R(l.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Se){const Le=U.texture;for(let Ne=0,$e=Le.length;Ne<$e;Ne++){const pt=Le[Ne],me=r.get(pt);t.bindTexture(l.TEXTURE_2D,me.__webglTexture),ie(l.TEXTURE_2D,pt,Ve),We($.__webglFramebuffer,U,pt,l.COLOR_ATTACHMENT0+Ne,l.TEXTURE_2D,0),I(pt,Ve)&&R(l.TEXTURE_2D)}t.unbindTexture()}else{let Le=l.TEXTURE_2D;if((U.isWebGL3DRenderTarget||U.isWebGLArrayRenderTarget)&&(h?Le=U.isWebGL3DRenderTarget?l.TEXTURE_3D:l.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(Le,ye.__webglTexture),ie(Le,C,Ve),h&&C.mipmaps&&C.mipmaps.length>0)for(let Ne=0;Ne<C.mipmaps.length;Ne++)We($.__webglFramebuffer[Ne],U,C,l.COLOR_ATTACHMENT0,Le,Ne);else We($.__webglFramebuffer,U,C,l.COLOR_ATTACHMENT0,Le,0);I(C,Ve)&&R(Le),t.unbindTexture()}U.depthBuffer&&Ye(U)}function jt(U){const C=M(U)||h,$=U.isWebGLMultipleRenderTargets===!0?U.texture:[U.texture];for(let ye=0,ve=$.length;ye<ve;ye++){const Se=$[ye];if(I(Se,C)){const Ve=U.isWebGLCubeRenderTarget?l.TEXTURE_CUBE_MAP:l.TEXTURE_2D,Le=r.get(Se).__webglTexture;t.bindTexture(Ve,Le),R(Ve),t.unbindTexture()}}}function ke(U){if(h&&U.samples>0&&Oe(U)===!1){const C=U.isWebGLMultipleRenderTargets?U.texture:[U.texture],$=U.width,ye=U.height;let ve=l.COLOR_BUFFER_BIT;const Se=[],Ve=U.stencilBuffer?l.DEPTH_STENCIL_ATTACHMENT:l.DEPTH_ATTACHMENT,Le=r.get(U),Ne=U.isWebGLMultipleRenderTargets===!0;if(Ne)for(let $e=0;$e<C.length;$e++)t.bindFramebuffer(l.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+$e,l.RENDERBUFFER,null),t.bindFramebuffer(l.FRAMEBUFFER,Le.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+$e,l.TEXTURE_2D,null,0);t.bindFramebuffer(l.READ_FRAMEBUFFER,Le.__webglMultisampledFramebuffer),t.bindFramebuffer(l.DRAW_FRAMEBUFFER,Le.__webglFramebuffer);for(let $e=0;$e<C.length;$e++){Se.push(l.COLOR_ATTACHMENT0+$e),U.depthBuffer&&Se.push(Ve);const pt=Le.__ignoreDepthValues!==void 0?Le.__ignoreDepthValues:!1;if(pt===!1&&(U.depthBuffer&&(ve|=l.DEPTH_BUFFER_BIT),U.stencilBuffer&&(ve|=l.STENCIL_BUFFER_BIT)),Ne&&l.framebufferRenderbuffer(l.READ_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.RENDERBUFFER,Le.__webglColorRenderbuffer[$e]),pt===!0&&(l.invalidateFramebuffer(l.READ_FRAMEBUFFER,[Ve]),l.invalidateFramebuffer(l.DRAW_FRAMEBUFFER,[Ve])),Ne){const me=r.get(C[$e]).__webglTexture;l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0,l.TEXTURE_2D,me,0)}l.blitFramebuffer(0,0,$,ye,0,0,$,ye,ve,l.NEAREST),m&&l.invalidateFramebuffer(l.READ_FRAMEBUFFER,Se)}if(t.bindFramebuffer(l.READ_FRAMEBUFFER,null),t.bindFramebuffer(l.DRAW_FRAMEBUFFER,null),Ne)for(let $e=0;$e<C.length;$e++){t.bindFramebuffer(l.FRAMEBUFFER,Le.__webglMultisampledFramebuffer),l.framebufferRenderbuffer(l.FRAMEBUFFER,l.COLOR_ATTACHMENT0+$e,l.RENDERBUFFER,Le.__webglColorRenderbuffer[$e]);const pt=r.get(C[$e]).__webglTexture;t.bindFramebuffer(l.FRAMEBUFFER,Le.__webglFramebuffer),l.framebufferTexture2D(l.DRAW_FRAMEBUFFER,l.COLOR_ATTACHMENT0+$e,l.TEXTURE_2D,pt,0)}t.bindFramebuffer(l.DRAW_FRAMEBUFFER,Le.__webglMultisampledFramebuffer)}}function rt(U){return Math.min(s.maxSamples,U.samples)}function Oe(U){const C=r.get(U);return h&&U.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Lt(U){const C=f.render.frame;g.get(U)!==C&&(g.set(U,C),U.update())}function lt(U,C){const $=U.colorSpace,ye=U.format,ve=U.type;return U.isCompressedTexture===!0||U.isVideoTexture===!0||U.format===Jc||$!==hn&&$!==Vn&&(At.getTransfer($)===Ot?h===!1?e.has("EXT_sRGB")===!0&&ye===Wn?(U.format=Jc,U.minFilter=Dn,U.generateMipmaps=!1):C=Dp.sRGBToLinear(C):(ye!==Wn||ve!==er)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),C}this.allocateTextureUnit=V,this.resetTextureUnits=pe,this.setTexture2D=H,this.setTexture2DArray=K,this.setTexture3D=Q,this.setTextureCube=Z,this.rebindTextures=Je,this.setupRenderTarget=ee,this.updateRenderTargetMipmap=jt,this.updateMultisampleRenderTarget=ke,this.setupDepthRenderbuffer=Ye,this.setupFrameBufferTexture=We,this.useMultisampledRTT=Oe}function AM(l,e,t){const r=t.isWebGL2;function s(c,f=Vn){let h;const p=At.getTransfer(f);if(c===er)return l.UNSIGNED_BYTE;if(c===Mp)return l.UNSIGNED_SHORT_4_4_4_4;if(c===Tp)return l.UNSIGNED_SHORT_5_5_5_1;if(c===qv)return l.BYTE;if(c===Yv)return l.SHORT;if(c===au)return l.UNSIGNED_SHORT;if(c===Sp)return l.INT;if(c===Zi)return l.UNSIGNED_INT;if(c===wi)return l.FLOAT;if(c===Pa)return r?l.HALF_FLOAT:(h=e.get("OES_texture_half_float"),h!==null?h.HALF_FLOAT_OES:null);if(c===Kv)return l.ALPHA;if(c===Wn)return l.RGBA;if(c===jv)return l.LUMINANCE;if(c===Zv)return l.LUMINANCE_ALPHA;if(c===Er)return l.DEPTH_COMPONENT;if(c===ws)return l.DEPTH_STENCIL;if(c===Jc)return h=e.get("EXT_sRGB"),h!==null?h.SRGB_ALPHA_EXT:null;if(c===Jv)return l.RED;if(c===bp)return l.RED_INTEGER;if(c===Qv)return l.RG;if(c===Ep)return l.RG_INTEGER;if(c===Ap)return l.RGBA_INTEGER;if(c===rc||c===sc||c===ac||c===oc)if(p===Ot)if(h=e.get("WEBGL_compressed_texture_s3tc_srgb"),h!==null){if(c===rc)return h.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(c===sc)return h.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(c===ac)return h.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(c===oc)return h.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(h=e.get("WEBGL_compressed_texture_s3tc"),h!==null){if(c===rc)return h.COMPRESSED_RGB_S3TC_DXT1_EXT;if(c===sc)return h.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(c===ac)return h.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(c===oc)return h.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(c===Ah||c===wh||c===Ch||c===Rh)if(h=e.get("WEBGL_compressed_texture_pvrtc"),h!==null){if(c===Ah)return h.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(c===wh)return h.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(c===Ch)return h.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(c===Rh)return h.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(c===wp)return h=e.get("WEBGL_compressed_texture_etc1"),h!==null?h.COMPRESSED_RGB_ETC1_WEBGL:null;if(c===Lh||c===Ph)if(h=e.get("WEBGL_compressed_texture_etc"),h!==null){if(c===Lh)return p===Ot?h.COMPRESSED_SRGB8_ETC2:h.COMPRESSED_RGB8_ETC2;if(c===Ph)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:h.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(c===Dh||c===Ih||c===Nh||c===Uh||c===Oh||c===Fh||c===Bh||c===kh||c===Hh||c===zh||c===Gh||c===Wh||c===Vh||c===Xh)if(h=e.get("WEBGL_compressed_texture_astc"),h!==null){if(c===Dh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:h.COMPRESSED_RGBA_ASTC_4x4_KHR;if(c===Ih)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:h.COMPRESSED_RGBA_ASTC_5x4_KHR;if(c===Nh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:h.COMPRESSED_RGBA_ASTC_5x5_KHR;if(c===Uh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:h.COMPRESSED_RGBA_ASTC_6x5_KHR;if(c===Oh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:h.COMPRESSED_RGBA_ASTC_6x6_KHR;if(c===Fh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:h.COMPRESSED_RGBA_ASTC_8x5_KHR;if(c===Bh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:h.COMPRESSED_RGBA_ASTC_8x6_KHR;if(c===kh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:h.COMPRESSED_RGBA_ASTC_8x8_KHR;if(c===Hh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:h.COMPRESSED_RGBA_ASTC_10x5_KHR;if(c===zh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:h.COMPRESSED_RGBA_ASTC_10x6_KHR;if(c===Gh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:h.COMPRESSED_RGBA_ASTC_10x8_KHR;if(c===Wh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:h.COMPRESSED_RGBA_ASTC_10x10_KHR;if(c===Vh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:h.COMPRESSED_RGBA_ASTC_12x10_KHR;if(c===Xh)return p===Ot?h.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:h.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(c===lc||c===qh||c===Yh)if(h=e.get("EXT_texture_compression_bptc"),h!==null){if(c===lc)return p===Ot?h.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:h.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(c===qh)return h.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(c===Yh)return h.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(c===$v||c===Kh||c===jh||c===Zh)if(h=e.get("EXT_texture_compression_rgtc"),h!==null){if(c===lc)return h.COMPRESSED_RED_RGTC1_EXT;if(c===Kh)return h.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(c===jh)return h.COMPRESSED_RED_GREEN_RGTC2_EXT;if(c===Zh)return h.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return c===br?r?l.UNSIGNED_INT_24_8:(h=e.get("WEBGL_depth_texture"),h!==null?h.UNSIGNED_INT_24_8_WEBGL:null):l[c]!==void 0?l[c]:null}return{convert:s}}class wM extends In{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ri extends kt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const CM={type:"move"};class Dc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ri,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ri,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ri,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const r of e.hand.values())this._getHandJoint(t,r)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,r){let s=null,c=null,f=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(m&&e.hand){f=!0;for(const w of e.hand.values()){const M=t.getJointPose(w,r),S=this._getHandJoint(m,w);M!==null&&(S.matrix.fromArray(M.transform.matrix),S.matrix.decompose(S.position,S.rotation,S.scale),S.matrixWorldNeedsUpdate=!0,S.jointRadius=M.radius),S.visible=M!==null}const g=m.joints["index-finger-tip"],_=m.joints["thumb-tip"],x=g.position.distanceTo(_.position),T=.02,A=.005;m.inputState.pinching&&x>T+A?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=T-A&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(c=t.getPose(e.gripSpace,r),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(s=t.getPose(e.targetRaySpace,r),s===null&&c!==null&&(s=c),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(CM)))}return h!==null&&(h.visible=s!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=f!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const r=new Ri;r.matrixAutoUpdate=!1,r.visible=!1,e.joints[t.jointName]=r,e.add(r)}return e.joints[t.jointName]}}class RM extends Us{constructor(e,t){super();const r=this;let s=null,c=1,f=null,h="local-floor",p=1,m=null,g=null,_=null,x=null,T=null,A=null;const w=t.getContextAttributes();let M=null,S=null;const I=[],R=[],N=new _t;let W=null;const k=new In;k.layers.enable(1),k.viewport=new Dt;const B=new In;B.layers.enable(2),B.viewport=new Dt;const ae=[k,B],L=new wM;L.layers.enable(1),L.layers.enable(2);let O=null,se=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let he=I[ie];return he===void 0&&(he=new Dc,I[ie]=he),he.getTargetRaySpace()},this.getControllerGrip=function(ie){let he=I[ie];return he===void 0&&(he=new Dc,I[ie]=he),he.getGripSpace()},this.getHand=function(ie){let he=I[ie];return he===void 0&&(he=new Dc,I[ie]=he),he.getHandSpace()};function oe(ie){const he=R.indexOf(ie.inputSource);if(he===-1)return;const we=I[he];we!==void 0&&(we.update(ie.inputSource,ie.frame,m||f),we.dispatchEvent({type:ie.type,data:ie.inputSource}))}function pe(){s.removeEventListener("select",oe),s.removeEventListener("selectstart",oe),s.removeEventListener("selectend",oe),s.removeEventListener("squeeze",oe),s.removeEventListener("squeezestart",oe),s.removeEventListener("squeezeend",oe),s.removeEventListener("end",pe),s.removeEventListener("inputsourceschange",V);for(let ie=0;ie<I.length;ie++){const he=R[ie];he!==null&&(R[ie]=null,I[ie].disconnect(he))}O=null,se=null,e.setRenderTarget(M),T=null,x=null,_=null,s=null,S=null,fe.stop(),r.isPresenting=!1,e.setPixelRatio(W),e.setSize(N.width,N.height,!1),r.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){c=ie,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){h=ie,r.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||f},this.setReferenceSpace=function(ie){m=ie},this.getBaseLayer=function(){return x!==null?x:T},this.getBinding=function(){return _},this.getFrame=function(){return A},this.getSession=function(){return s},this.setSession=async function(ie){if(s=ie,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",oe),s.addEventListener("selectstart",oe),s.addEventListener("selectend",oe),s.addEventListener("squeeze",oe),s.addEventListener("squeezestart",oe),s.addEventListener("squeezeend",oe),s.addEventListener("end",pe),s.addEventListener("inputsourceschange",V),w.xrCompatible!==!0&&await t.makeXRCompatible(),W=e.getPixelRatio(),e.getSize(N),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const he={antialias:s.renderState.layers===void 0?w.antialias:!0,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:c};T=new XRWebGLLayer(s,t,he),s.updateRenderState({baseLayer:T}),e.setPixelRatio(1),e.setSize(T.framebufferWidth,T.framebufferHeight,!1),S=new Cr(T.framebufferWidth,T.framebufferHeight,{format:Wn,type:er,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil})}else{let he=null,we=null,Ge=null;w.depth&&(Ge=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,he=w.stencil?ws:Er,we=w.stencil?br:Zi);const We={colorFormat:t.RGBA8,depthFormat:Ge,scaleFactor:c};_=new XRWebGLBinding(s,t),x=_.createProjectionLayer(We),s.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),S=new Cr(x.textureWidth,x.textureHeight,{format:Wn,type:er,depthTexture:new Wp(x.textureWidth,x.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0});const nt=e.properties.get(S);nt.__ignoreDepthValues=x.ignoreDepthValues}S.isXRRenderTarget=!0,this.setFoveation(p),m=null,f=await s.requestReferenceSpace(h),fe.setContext(s),fe.start(),r.isPresenting=!0,r.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function V(ie){for(let he=0;he<ie.removed.length;he++){const we=ie.removed[he],Ge=R.indexOf(we);Ge>=0&&(R[Ge]=null,I[Ge].disconnect(we))}for(let he=0;he<ie.added.length;he++){const we=ie.added[he];let Ge=R.indexOf(we);if(Ge===-1){for(let nt=0;nt<I.length;nt++)if(nt>=R.length){R.push(we),Ge=nt;break}else if(R[nt]===null){R[nt]=we,Ge=nt;break}if(Ge===-1)break}const We=I[Ge];We&&We.connect(we)}}const X=new Y,H=new Y;function K(ie,he,we){X.setFromMatrixPosition(he.matrixWorld),H.setFromMatrixPosition(we.matrixWorld);const Ge=X.distanceTo(H),We=he.projectionMatrix.elements,nt=we.projectionMatrix.elements,je=We[14]/(We[10]-1),Ye=We[14]/(We[10]+1),Je=(We[9]+1)/We[5],ee=(We[9]-1)/We[5],jt=(We[8]-1)/We[0],ke=(nt[8]+1)/nt[0],rt=je*jt,Oe=je*ke,Lt=Ge/(-jt+ke),lt=Lt*-jt;he.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(lt),ie.translateZ(Lt),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert();const U=je+Lt,C=Ye+Lt,$=rt-lt,ye=Oe+(Ge-lt),ve=Je*Ye/C*U,Se=ee*Ye/C*U;ie.projectionMatrix.makePerspective($,ye,ve,Se,U,C),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}function Q(ie,he){he===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(he.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(s===null)return;L.near=B.near=k.near=ie.near,L.far=B.far=k.far=ie.far,(O!==L.near||se!==L.far)&&(s.updateRenderState({depthNear:L.near,depthFar:L.far}),O=L.near,se=L.far);const he=ie.parent,we=L.cameras;Q(L,he);for(let Ge=0;Ge<we.length;Ge++)Q(we[Ge],he);we.length===2?K(L,k,B):L.projectionMatrix.copy(k.projectionMatrix),Z(ie,L,he)};function Z(ie,he,we){we===null?ie.matrix.copy(he.matrixWorld):(ie.matrix.copy(we.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(he.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(he.projectionMatrix),ie.projectionMatrixInverse.copy(he.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Rs*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(x===null&&T===null))return p},this.setFoveation=function(ie){p=ie,x!==null&&(x.fixedFoveation=ie),T!==null&&T.fixedFoveation!==void 0&&(T.fixedFoveation=ie)};let le=null;function de(ie,he){if(g=he.getViewerPose(m||f),A=he,g!==null){const we=g.views;T!==null&&(e.setRenderTargetFramebuffer(S,T.framebuffer),e.setRenderTarget(S));let Ge=!1;we.length!==L.cameras.length&&(L.cameras.length=0,Ge=!0);for(let We=0;We<we.length;We++){const nt=we[We];let je=null;if(T!==null)je=T.getViewport(nt);else{const Je=_.getViewSubImage(x,nt);je=Je.viewport,We===0&&(e.setRenderTargetTextures(S,Je.colorTexture,x.ignoreDepthValues?void 0:Je.depthStencilTexture),e.setRenderTarget(S))}let Ye=ae[We];Ye===void 0&&(Ye=new In,Ye.layers.enable(We),Ye.viewport=new Dt,ae[We]=Ye),Ye.matrix.fromArray(nt.transform.matrix),Ye.matrix.decompose(Ye.position,Ye.quaternion,Ye.scale),Ye.projectionMatrix.fromArray(nt.projectionMatrix),Ye.projectionMatrixInverse.copy(Ye.projectionMatrix).invert(),Ye.viewport.set(je.x,je.y,je.width,je.height),We===0&&(L.matrix.copy(Ye.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Ge===!0&&L.cameras.push(Ye)}}for(let we=0;we<I.length;we++){const Ge=R[we],We=I[we];Ge!==null&&We!==void 0&&We.update(Ge,he,m||f)}le&&le(ie,he),he.detectedPlanes&&r.dispatchEvent({type:"planesdetected",data:he}),A=null}const fe=new Gp;fe.setAnimationLoop(de),this.setAnimationLoop=function(ie){le=ie},this.dispose=function(){}}}function LM(l,e){function t(M,S){M.matrixAutoUpdate===!0&&M.updateMatrix(),S.value.copy(M.matrix)}function r(M,S){S.color.getRGB(M.fogColor.value,kp(l)),S.isFog?(M.fogNear.value=S.near,M.fogFar.value=S.far):S.isFogExp2&&(M.fogDensity.value=S.density)}function s(M,S,I,R,N){S.isMeshBasicMaterial||S.isMeshLambertMaterial?c(M,S):S.isMeshToonMaterial?(c(M,S),_(M,S)):S.isMeshPhongMaterial?(c(M,S),g(M,S)):S.isMeshStandardMaterial?(c(M,S),x(M,S),S.isMeshPhysicalMaterial&&T(M,S,N)):S.isMeshMatcapMaterial?(c(M,S),A(M,S)):S.isMeshDepthMaterial?c(M,S):S.isMeshDistanceMaterial?(c(M,S),w(M,S)):S.isMeshNormalMaterial?c(M,S):S.isLineBasicMaterial?(f(M,S),S.isLineDashedMaterial&&h(M,S)):S.isPointsMaterial?p(M,S,I,R):S.isSpriteMaterial?m(M,S):S.isShadowMaterial?(M.color.value.copy(S.color),M.opacity.value=S.opacity):S.isShaderMaterial&&(S.uniformsNeedUpdate=!1)}function c(M,S){M.opacity.value=S.opacity,S.color&&M.diffuse.value.copy(S.color),S.emissive&&M.emissive.value.copy(S.emissive).multiplyScalar(S.emissiveIntensity),S.map&&(M.map.value=S.map,t(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,t(S.alphaMap,M.alphaMapTransform)),S.bumpMap&&(M.bumpMap.value=S.bumpMap,t(S.bumpMap,M.bumpMapTransform),M.bumpScale.value=S.bumpScale,S.side===Nn&&(M.bumpScale.value*=-1)),S.normalMap&&(M.normalMap.value=S.normalMap,t(S.normalMap,M.normalMapTransform),M.normalScale.value.copy(S.normalScale),S.side===Nn&&M.normalScale.value.negate()),S.displacementMap&&(M.displacementMap.value=S.displacementMap,t(S.displacementMap,M.displacementMapTransform),M.displacementScale.value=S.displacementScale,M.displacementBias.value=S.displacementBias),S.emissiveMap&&(M.emissiveMap.value=S.emissiveMap,t(S.emissiveMap,M.emissiveMapTransform)),S.specularMap&&(M.specularMap.value=S.specularMap,t(S.specularMap,M.specularMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest);const I=e.get(S).envMap;if(I&&(M.envMap.value=I,M.flipEnvMap.value=I.isCubeTexture&&I.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=S.reflectivity,M.ior.value=S.ior,M.refractionRatio.value=S.refractionRatio),S.lightMap){M.lightMap.value=S.lightMap;const R=l._useLegacyLights===!0?Math.PI:1;M.lightMapIntensity.value=S.lightMapIntensity*R,t(S.lightMap,M.lightMapTransform)}S.aoMap&&(M.aoMap.value=S.aoMap,M.aoMapIntensity.value=S.aoMapIntensity,t(S.aoMap,M.aoMapTransform))}function f(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,S.map&&(M.map.value=S.map,t(S.map,M.mapTransform))}function h(M,S){M.dashSize.value=S.dashSize,M.totalSize.value=S.dashSize+S.gapSize,M.scale.value=S.scale}function p(M,S,I,R){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.size.value=S.size*I,M.scale.value=R*.5,S.map&&(M.map.value=S.map,t(S.map,M.uvTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,t(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function m(M,S){M.diffuse.value.copy(S.color),M.opacity.value=S.opacity,M.rotation.value=S.rotation,S.map&&(M.map.value=S.map,t(S.map,M.mapTransform)),S.alphaMap&&(M.alphaMap.value=S.alphaMap,t(S.alphaMap,M.alphaMapTransform)),S.alphaTest>0&&(M.alphaTest.value=S.alphaTest)}function g(M,S){M.specular.value.copy(S.specular),M.shininess.value=Math.max(S.shininess,1e-4)}function _(M,S){S.gradientMap&&(M.gradientMap.value=S.gradientMap)}function x(M,S){M.metalness.value=S.metalness,S.metalnessMap&&(M.metalnessMap.value=S.metalnessMap,t(S.metalnessMap,M.metalnessMapTransform)),M.roughness.value=S.roughness,S.roughnessMap&&(M.roughnessMap.value=S.roughnessMap,t(S.roughnessMap,M.roughnessMapTransform)),e.get(S).envMap&&(M.envMapIntensity.value=S.envMapIntensity)}function T(M,S,I){M.ior.value=S.ior,S.sheen>0&&(M.sheenColor.value.copy(S.sheenColor).multiplyScalar(S.sheen),M.sheenRoughness.value=S.sheenRoughness,S.sheenColorMap&&(M.sheenColorMap.value=S.sheenColorMap,t(S.sheenColorMap,M.sheenColorMapTransform)),S.sheenRoughnessMap&&(M.sheenRoughnessMap.value=S.sheenRoughnessMap,t(S.sheenRoughnessMap,M.sheenRoughnessMapTransform))),S.clearcoat>0&&(M.clearcoat.value=S.clearcoat,M.clearcoatRoughness.value=S.clearcoatRoughness,S.clearcoatMap&&(M.clearcoatMap.value=S.clearcoatMap,t(S.clearcoatMap,M.clearcoatMapTransform)),S.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=S.clearcoatRoughnessMap,t(S.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),S.clearcoatNormalMap&&(M.clearcoatNormalMap.value=S.clearcoatNormalMap,t(S.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(S.clearcoatNormalScale),S.side===Nn&&M.clearcoatNormalScale.value.negate())),S.iridescence>0&&(M.iridescence.value=S.iridescence,M.iridescenceIOR.value=S.iridescenceIOR,M.iridescenceThicknessMinimum.value=S.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=S.iridescenceThicknessRange[1],S.iridescenceMap&&(M.iridescenceMap.value=S.iridescenceMap,t(S.iridescenceMap,M.iridescenceMapTransform)),S.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=S.iridescenceThicknessMap,t(S.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),S.transmission>0&&(M.transmission.value=S.transmission,M.transmissionSamplerMap.value=I.texture,M.transmissionSamplerSize.value.set(I.width,I.height),S.transmissionMap&&(M.transmissionMap.value=S.transmissionMap,t(S.transmissionMap,M.transmissionMapTransform)),M.thickness.value=S.thickness,S.thicknessMap&&(M.thicknessMap.value=S.thicknessMap,t(S.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=S.attenuationDistance,M.attenuationColor.value.copy(S.attenuationColor)),S.anisotropy>0&&(M.anisotropyVector.value.set(S.anisotropy*Math.cos(S.anisotropyRotation),S.anisotropy*Math.sin(S.anisotropyRotation)),S.anisotropyMap&&(M.anisotropyMap.value=S.anisotropyMap,t(S.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=S.specularIntensity,M.specularColor.value.copy(S.specularColor),S.specularColorMap&&(M.specularColorMap.value=S.specularColorMap,t(S.specularColorMap,M.specularColorMapTransform)),S.specularIntensityMap&&(M.specularIntensityMap.value=S.specularIntensityMap,t(S.specularIntensityMap,M.specularIntensityMapTransform))}function A(M,S){S.matcap&&(M.matcap.value=S.matcap)}function w(M,S){const I=e.get(S).light;M.referencePosition.value.setFromMatrixPosition(I.matrixWorld),M.nearDistance.value=I.shadow.camera.near,M.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:s}}function PM(l,e,t,r){let s={},c={},f=[];const h=t.isWebGL2?l.getParameter(l.MAX_UNIFORM_BUFFER_BINDINGS):0;function p(I,R){const N=R.program;r.uniformBlockBinding(I,N)}function m(I,R){let N=s[I.id];N===void 0&&(A(I),N=g(I),s[I.id]=N,I.addEventListener("dispose",M));const W=R.program;r.updateUBOMapping(I,W);const k=e.render.frame;c[I.id]!==k&&(x(I),c[I.id]=k)}function g(I){const R=_();I.__bindingPointIndex=R;const N=l.createBuffer(),W=I.__size,k=I.usage;return l.bindBuffer(l.UNIFORM_BUFFER,N),l.bufferData(l.UNIFORM_BUFFER,W,k),l.bindBuffer(l.UNIFORM_BUFFER,null),l.bindBufferBase(l.UNIFORM_BUFFER,R,N),N}function _(){for(let I=0;I<h;I++)if(f.indexOf(I)===-1)return f.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const R=s[I.id],N=I.uniforms,W=I.__cache;l.bindBuffer(l.UNIFORM_BUFFER,R);for(let k=0,B=N.length;k<B;k++){const ae=Array.isArray(N[k])?N[k]:[N[k]];for(let L=0,O=ae.length;L<O;L++){const se=ae[L];if(T(se,k,L,W)===!0){const oe=se.__offset,pe=Array.isArray(se.value)?se.value:[se.value];let V=0;for(let X=0;X<pe.length;X++){const H=pe[X],K=w(H);typeof H=="number"||typeof H=="boolean"?(se.__data[0]=H,l.bufferSubData(l.UNIFORM_BUFFER,oe+V,se.__data)):H.isMatrix3?(se.__data[0]=H.elements[0],se.__data[1]=H.elements[1],se.__data[2]=H.elements[2],se.__data[3]=0,se.__data[4]=H.elements[3],se.__data[5]=H.elements[4],se.__data[6]=H.elements[5],se.__data[7]=0,se.__data[8]=H.elements[6],se.__data[9]=H.elements[7],se.__data[10]=H.elements[8],se.__data[11]=0):(H.toArray(se.__data,V),V+=K.storage/Float32Array.BYTES_PER_ELEMENT)}l.bufferSubData(l.UNIFORM_BUFFER,oe,se.__data)}}}l.bindBuffer(l.UNIFORM_BUFFER,null)}function T(I,R,N,W){const k=I.value,B=R+"_"+N;if(W[B]===void 0)return typeof k=="number"||typeof k=="boolean"?W[B]=k:W[B]=k.clone(),!0;{const ae=W[B];if(typeof k=="number"||typeof k=="boolean"){if(ae!==k)return W[B]=k,!0}else if(ae.equals(k)===!1)return ae.copy(k),!0}return!1}function A(I){const R=I.uniforms;let N=0;const W=16;for(let B=0,ae=R.length;B<ae;B++){const L=Array.isArray(R[B])?R[B]:[R[B]];for(let O=0,se=L.length;O<se;O++){const oe=L[O],pe=Array.isArray(oe.value)?oe.value:[oe.value];for(let V=0,X=pe.length;V<X;V++){const H=pe[V],K=w(H),Q=N%W;Q!==0&&W-Q<K.boundary&&(N+=W-Q),oe.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),oe.__offset=N,N+=K.storage}}}const k=N%W;return k>0&&(N+=W-k),I.__size=N,I.__cache={},this}function w(I){const R={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(R.boundary=4,R.storage=4):I.isVector2?(R.boundary=8,R.storage=8):I.isVector3||I.isColor?(R.boundary=16,R.storage=12):I.isVector4?(R.boundary=16,R.storage=16):I.isMatrix3?(R.boundary=48,R.storage=48):I.isMatrix4?(R.boundary=64,R.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),R}function M(I){const R=I.target;R.removeEventListener("dispose",M);const N=f.indexOf(R.__bindingPointIndex);f.splice(N,1),l.deleteBuffer(s[R.id]),delete s[R.id],delete c[R.id]}function S(){for(const I in s)l.deleteBuffer(s[I]);f=[],s={},c={}}return{bind:p,update:m,dispose:S}}class jp{constructor(e={}){const{canvas:t=w0(),context:r=null,depth:s=!0,stencil:c=!0,alpha:f=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:g="default",failIfMajorPerformanceCaveat:_=!1}=e;this.isWebGLRenderer=!0;let x;r!==null?x=r.getContextAttributes().alpha:x=f;const T=new Uint32Array(4),A=new Int32Array(4);let w=null,M=null;const S=[],I=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Wt,this._useLegacyLights=!1,this.toneMapping=$i,this.toneMappingExposure=1;const R=this;let N=!1,W=0,k=0,B=null,ae=-1,L=null;const O=new Dt,se=new Dt;let oe=null;const pe=new Qe(0);let V=0,X=t.width,H=t.height,K=1,Q=null,Z=null;const le=new Dt(0,0,X,H),de=new Dt(0,0,X,H);let fe=!1;const ie=new cu;let he=!1,we=!1,Ge=null;const We=new xt,nt=new _t,je=new Y,Ye={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Je(){return B===null?K:1}let ee=r;function jt(P,j){for(let te=0;te<P.length;te++){const re=P[te],J=t.getContext(re,j);if(J!==null)return J}return null}try{const P={alpha:!0,depth:s,stencil:c,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:g,failIfMajorPerformanceCaveat:_};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${su}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",z,!1),t.addEventListener("webglcontextcreationerror",_e,!1),ee===null){const j=["webgl2","webgl","experimental-webgl"];if(R.isWebGL1Renderer===!0&&j.shift(),ee=jt(j,P),ee===null)throw jt(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&ee instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),ee.getShaderPrecisionFormat===void 0&&(ee.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let ke,rt,Oe,Lt,lt,U,C,$,ye,ve,Se,Ve,Le,Ne,$e,pt,me,bt,ct,at,Xe,Ie,ft,gt;function Nt(){ke=new zy(ee),rt=new Uy(ee,ke,e),ke.init(rt),Ie=new AM(ee,ke,rt),Oe=new bM(ee,ke,rt),Lt=new Vy(ee),lt=new uM,U=new EM(ee,ke,Oe,lt,rt,Ie,Lt),C=new Fy(R),$=new Hy(R),ye=new Q0(ee,rt),ft=new Iy(ee,ke,ye,rt),ve=new Gy(ee,ye,Lt,ft),Se=new Ky(ee,ve,ye,Lt),ct=new Yy(ee,rt,U),pt=new Oy(lt),Ve=new cM(R,C,$,ke,rt,ft,pt),Le=new LM(R,lt),Ne=new hM,$e=new _M(ke,rt),bt=new Dy(R,C,$,Oe,Se,x,p),me=new TM(R,Se,rt),gt=new PM(ee,Lt,rt,Oe),at=new Ny(ee,ke,Lt,rt),Xe=new Wy(ee,ke,Lt,rt),Lt.programs=Ve.programs,R.capabilities=rt,R.extensions=ke,R.properties=lt,R.renderLists=Ne,R.shadowMap=me,R.state=Oe,R.info=Lt}Nt();const Me=new RM(R,ee);this.xr=Me,this.getContext=function(){return ee},this.getContextAttributes=function(){return ee.getContextAttributes()},this.forceContextLoss=function(){const P=ke.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=ke.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(P){P!==void 0&&(K=P,this.setSize(X,H,!1))},this.getSize=function(P){return P.set(X,H)},this.setSize=function(P,j,te=!0){if(Me.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=P,H=j,t.width=Math.floor(P*K),t.height=Math.floor(j*K),te===!0&&(t.style.width=P+"px",t.style.height=j+"px"),this.setViewport(0,0,P,j)},this.getDrawingBufferSize=function(P){return P.set(X*K,H*K).floor()},this.setDrawingBufferSize=function(P,j,te){X=P,H=j,K=te,t.width=Math.floor(P*te),t.height=Math.floor(j*te),this.setViewport(0,0,P,j)},this.getCurrentViewport=function(P){return P.copy(O)},this.getViewport=function(P){return P.copy(le)},this.setViewport=function(P,j,te,re){P.isVector4?le.set(P.x,P.y,P.z,P.w):le.set(P,j,te,re),Oe.viewport(O.copy(le).multiplyScalar(K).floor())},this.getScissor=function(P){return P.copy(de)},this.setScissor=function(P,j,te,re){P.isVector4?de.set(P.x,P.y,P.z,P.w):de.set(P,j,te,re),Oe.scissor(se.copy(de).multiplyScalar(K).floor())},this.getScissorTest=function(){return fe},this.setScissorTest=function(P){Oe.setScissorTest(fe=P)},this.setOpaqueSort=function(P){Q=P},this.setTransparentSort=function(P){Z=P},this.getClearColor=function(P){return P.copy(bt.getClearColor())},this.setClearColor=function(){bt.setClearColor.apply(bt,arguments)},this.getClearAlpha=function(){return bt.getClearAlpha()},this.setClearAlpha=function(){bt.setClearAlpha.apply(bt,arguments)},this.clear=function(P=!0,j=!0,te=!0){let re=0;if(P){let J=!1;if(B!==null){const De=B.texture.format;J=De===Ap||De===Ep||De===bp}if(J){const De=B.texture.type,Be=De===er||De===Zi||De===au||De===br||De===Mp||De===Tp,et=bt.getClearColor(),Ze=bt.getClearAlpha(),ut=et.r,ot=et.g,Ue=et.b;Be?(T[0]=ut,T[1]=ot,T[2]=Ue,T[3]=Ze,ee.clearBufferuiv(ee.COLOR,0,T)):(A[0]=ut,A[1]=ot,A[2]=Ue,A[3]=Ze,ee.clearBufferiv(ee.COLOR,0,A))}else re|=ee.COLOR_BUFFER_BIT}j&&(re|=ee.DEPTH_BUFFER_BIT),te&&(re|=ee.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ee.clear(re)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",z,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),Ne.dispose(),$e.dispose(),lt.dispose(),C.dispose(),$.dispose(),Se.dispose(),ft.dispose(),gt.dispose(),Ve.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",$t),Me.removeEventListener("sessionend",Mt),Ge&&(Ge.dispose(),Ge=null),en.stop()};function Ee(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),N=!0}function z(){console.log("THREE.WebGLRenderer: Context Restored."),N=!1;const P=Lt.autoReset,j=me.enabled,te=me.autoUpdate,re=me.needsUpdate,J=me.type;Nt(),Lt.autoReset=P,me.enabled=j,me.autoUpdate=te,me.needsUpdate=re,me.type=J}function _e(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function xe(P){const j=P.target;j.removeEventListener("dispose",xe),it(j)}function it(P){Fe(P),lt.remove(P)}function Fe(P){const j=lt.get(P).programs;j!==void 0&&(j.forEach(function(te){Ve.releaseProgram(te)}),P.isShaderMaterial&&Ve.releaseShaderCache(P))}this.renderBufferDirect=function(P,j,te,re,J,De){j===null&&(j=Ye);const Be=J.isMesh&&J.matrixWorld.determinant()<0,et=cl(P,j,te,re,J);Oe.setMaterial(re,Be);let Ze=te.index,ut=1;if(re.wireframe===!0){if(Ze=ve.getWireframeAttribute(te),Ze===void 0)return;ut=2}const ot=te.drawRange,Ue=te.attributes.position;let Ae=ot.start*ut,Xt=(ot.start+ot.count)*ut;De!==null&&(Ae=Math.max(Ae,De.start*ut),Xt=Math.min(Xt,(De.start+De.count)*ut)),Ze!==null?(Ae=Math.max(Ae,0),Xt=Math.min(Xt,Ze.count)):Ue!=null&&(Ae=Math.max(Ae,0),Xt=Math.min(Xt,Ue.count));const Ht=Xt-Ae;if(Ht<0||Ht===1/0)return;ft.setup(J,re,et,te,Ze);let Zt,Ke=at;if(Ze!==null&&(Zt=ye.get(Ze),Ke=Xe,Ke.setIndex(Zt)),J.isMesh)re.wireframe===!0?(Oe.setLineWidth(re.wireframeLinewidth*Je()),Ke.setMode(ee.LINES)):Ke.setMode(ee.TRIANGLES);else if(J.isLine){let st=re.linewidth;st===void 0&&(st=1),Oe.setLineWidth(st*Je()),J.isLineSegments?Ke.setMode(ee.LINES):J.isLineLoop?Ke.setMode(ee.LINE_LOOP):Ke.setMode(ee.LINE_STRIP)}else J.isPoints?Ke.setMode(ee.POINTS):J.isSprite&&Ke.setMode(ee.TRIANGLES);if(J.isBatchedMesh)Ke.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)Ke.renderInstances(Ae,Ht,J.count);else if(te.isInstancedBufferGeometry){const st=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,hi=Math.min(te.instanceCount,st);Ke.renderInstances(Ae,Ht,hi)}else Ke.render(Ae,Ht)};function St(P,j,te){P.transparent===!0&&P.side===li&&P.forceSinglePass===!1?(P.side=Nn,P.needsUpdate=!0,Nr(P,j,te),P.side=Pi,P.needsUpdate=!0,Nr(P,j,te),P.side=li):Nr(P,j,te)}this.compile=function(P,j,te=null){te===null&&(te=P),M=$e.get(te),M.init(),I.push(M),te.traverseVisible(function(J){J.isLight&&J.layers.test(j.layers)&&(M.pushLight(J),J.castShadow&&M.pushShadow(J))}),P!==te&&P.traverseVisible(function(J){J.isLight&&J.layers.test(j.layers)&&(M.pushLight(J),J.castShadow&&M.pushShadow(J))}),M.setupLights(R._useLegacyLights);const re=new Set;return P.traverse(function(J){const De=J.material;if(De)if(Array.isArray(De))for(let Be=0;Be<De.length;Be++){const et=De[Be];St(et,te,J),re.add(et)}else St(De,te,J),re.add(De)}),I.pop(),M=null,re},this.compileAsync=function(P,j,te=null){const re=this.compile(P,j,te);return new Promise(J=>{function De(){if(re.forEach(function(Be){lt.get(Be).currentProgram.isReady()&&re.delete(Be)}),re.size===0){J(P);return}setTimeout(De,10)}ke.get("KHR_parallel_shader_compile")!==null?De():setTimeout(De,10)})};let ht=null;function Vt(P){ht&&ht(P)}function $t(){en.stop()}function Mt(){en.start()}const en=new Gp;en.setAnimationLoop(Vt),typeof self<"u"&&en.setContext(self),this.setAnimationLoop=function(P){ht=P,Me.setAnimationLoop(P),P===null?en.stop():en.start()},Me.addEventListener("sessionstart",$t),Me.addEventListener("sessionend",Mt),this.render=function(P,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(j),j=Me.getCamera()),P.isScene===!0&&P.onBeforeRender(R,P,j,B),M=$e.get(P,I.length),M.init(),I.push(M),We.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),ie.setFromProjectionMatrix(We),we=this.localClippingEnabled,he=pt.init(this.clippingPlanes,we),w=Ne.get(P,S.length),w.init(),S.push(w),Un(P,j,0,R.sortObjects),w.finish(),R.sortObjects===!0&&w.sort(Q,Z),this.info.render.frame++,he===!0&&pt.beginShadows();const te=M.state.shadowsArray;if(me.render(te,P,j),he===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset(),bt.render(w,P),M.setupLights(R._useLegacyLights),j.isArrayCamera){const re=j.cameras;for(let J=0,De=re.length;J<De;J++){const Be=re[J];Fa(w,P,Be,Be.viewport)}}else Fa(w,P,j);B!==null&&(U.updateMultisampleRenderTarget(B),U.updateRenderTargetMipmap(B)),P.isScene===!0&&P.onAfterRender(R,P,j),ft.resetDefaultState(),ae=-1,L=null,I.pop(),I.length>0?M=I[I.length-1]:M=null,S.pop(),S.length>0?w=S[S.length-1]:w=null};function Un(P,j,te,re){if(P.visible===!1)return;if(P.layers.test(j.layers)){if(P.isGroup)te=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(j);else if(P.isLight)M.pushLight(P),P.castShadow&&M.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||ie.intersectsSprite(P)){re&&je.setFromMatrixPosition(P.matrixWorld).applyMatrix4(We);const Be=Se.update(P),et=P.material;et.visible&&w.push(P,Be,et,te,je.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||ie.intersectsObject(P))){const Be=Se.update(P),et=P.material;if(re&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),je.copy(P.boundingSphere.center)):(Be.boundingSphere===null&&Be.computeBoundingSphere(),je.copy(Be.boundingSphere.center)),je.applyMatrix4(P.matrixWorld).applyMatrix4(We)),Array.isArray(et)){const Ze=Be.groups;for(let ut=0,ot=Ze.length;ut<ot;ut++){const Ue=Ze[ut],Ae=et[Ue.materialIndex];Ae&&Ae.visible&&w.push(P,Be,Ae,te,je.z,Ue)}}else et.visible&&w.push(P,Be,et,te,je.z,null)}}const De=P.children;for(let Be=0,et=De.length;Be<et;Be++)Un(De[Be],j,te,re)}function Fa(P,j,te,re){const J=P.opaque,De=P.transmissive,Be=P.transparent;M.setupLightsView(te),he===!0&&pt.setGlobalState(R.clippingPlanes,te),De.length>0&&Hs(J,De,j,te),re&&Oe.viewport(O.copy(re)),J.length>0&&Dr(J,j,te),De.length>0&&Dr(De,j,te),Be.length>0&&Dr(Be,j,te),Oe.buffers.depth.setTest(!0),Oe.buffers.depth.setMask(!0),Oe.buffers.color.setMask(!0),Oe.setPolygonOffset(!1)}function Hs(P,j,te,re){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;const De=rt.isWebGL2;Ge===null&&(Ge=new Cr(1,1,{generateMipmaps:!0,type:ke.has("EXT_color_buffer_half_float")?Pa:er,minFilter:wr,samples:De?4:0})),R.getDrawingBufferSize(nt),De?Ge.setSize(nt.x,nt.y):Ge.setSize(Qo(nt.x),Qo(nt.y));const Be=R.getRenderTarget();R.setRenderTarget(Ge),R.getClearColor(pe),V=R.getClearAlpha(),V<1&&R.setClearColor(16777215,.5),R.clear();const et=R.toneMapping;R.toneMapping=$i,Dr(P,te,re),U.updateMultisampleRenderTarget(Ge),U.updateRenderTargetMipmap(Ge);let Ze=!1;for(let ut=0,ot=j.length;ut<ot;ut++){const Ue=j[ut],Ae=Ue.object,Xt=Ue.geometry,Ht=Ue.material,Zt=Ue.group;if(Ht.side===li&&Ae.layers.test(re.layers)){const Ke=Ht.side;Ht.side=Nn,Ht.needsUpdate=!0,Ir(Ae,te,re,Xt,Ht,Zt),Ht.side=Ke,Ht.needsUpdate=!0,Ze=!0}}Ze===!0&&(U.updateMultisampleRenderTarget(Ge),U.updateRenderTargetMipmap(Ge)),R.setRenderTarget(Be),R.setClearColor(pe,V),R.toneMapping=et}function Dr(P,j,te){const re=j.isScene===!0?j.overrideMaterial:null;for(let J=0,De=P.length;J<De;J++){const Be=P[J],et=Be.object,Ze=Be.geometry,ut=re===null?Be.material:re,ot=Be.group;et.layers.test(te.layers)&&Ir(et,j,te,Ze,ut,ot)}}function Ir(P,j,te,re,J,De){P.onBeforeRender(R,j,te,re,J,De),P.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),J.onBeforeRender(R,j,te,re,P,De),J.transparent===!0&&J.side===li&&J.forceSinglePass===!1?(J.side=Nn,J.needsUpdate=!0,R.renderBufferDirect(te,j,re,J,P,De),J.side=Pi,J.needsUpdate=!0,R.renderBufferDirect(te,j,re,J,P,De),J.side=li):R.renderBufferDirect(te,j,re,J,P,De),P.onAfterRender(R,j,te,re,J,De)}function Nr(P,j,te){j.isScene!==!0&&(j=Ye);const re=lt.get(P),J=M.state.lights,De=M.state.shadowsArray,Be=J.state.version,et=Ve.getParameters(P,J.state,De,j,te),Ze=Ve.getProgramCacheKey(et);let ut=re.programs;re.environment=P.isMeshStandardMaterial?j.environment:null,re.fog=j.fog,re.envMap=(P.isMeshStandardMaterial?$:C).get(P.envMap||re.environment),ut===void 0&&(P.addEventListener("dispose",xe),ut=new Map,re.programs=ut);let ot=ut.get(Ze);if(ot!==void 0){if(re.currentProgram===ot&&re.lightsStateVersion===Be)return Ba(P,et),ot}else et.uniforms=Ve.getUniforms(P),P.onBuild(te,et,R),P.onBeforeCompile(et,R),ot=Ve.acquireProgram(et,Ze),ut.set(Ze,ot),re.uniforms=et.uniforms;const Ue=re.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ue.clippingPlanes=pt.uniform),Ba(P,et),re.needsLights=ul(P),re.lightsStateVersion=Be,re.needsLights&&(Ue.ambientLightColor.value=J.state.ambient,Ue.lightProbe.value=J.state.probe,Ue.directionalLights.value=J.state.directional,Ue.directionalLightShadows.value=J.state.directionalShadow,Ue.spotLights.value=J.state.spot,Ue.spotLightShadows.value=J.state.spotShadow,Ue.rectAreaLights.value=J.state.rectArea,Ue.ltc_1.value=J.state.rectAreaLTC1,Ue.ltc_2.value=J.state.rectAreaLTC2,Ue.pointLights.value=J.state.point,Ue.pointLightShadows.value=J.state.pointShadow,Ue.hemisphereLights.value=J.state.hemi,Ue.directionalShadowMap.value=J.state.directionalShadowMap,Ue.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Ue.spotShadowMap.value=J.state.spotShadowMap,Ue.spotLightMatrix.value=J.state.spotLightMatrix,Ue.spotLightMap.value=J.state.spotLightMap,Ue.pointShadowMap.value=J.state.pointShadowMap,Ue.pointShadowMatrix.value=J.state.pointShadowMatrix),re.currentProgram=ot,re.uniformsList=null,ot}function Ur(P){if(P.uniformsList===null){const j=P.currentProgram.getUniforms();P.uniformsList=Xo.seqWithValue(j.seq,P.uniforms)}return P.uniformsList}function Ba(P,j){const te=lt.get(P);te.outputColorSpace=j.outputColorSpace,te.batching=j.batching,te.instancing=j.instancing,te.instancingColor=j.instancingColor,te.skinning=j.skinning,te.morphTargets=j.morphTargets,te.morphNormals=j.morphNormals,te.morphColors=j.morphColors,te.morphTargetsCount=j.morphTargetsCount,te.numClippingPlanes=j.numClippingPlanes,te.numIntersection=j.numClipIntersection,te.vertexAlphas=j.vertexAlphas,te.vertexTangents=j.vertexTangents,te.toneMapping=j.toneMapping}function cl(P,j,te,re,J){j.isScene!==!0&&(j=Ye),U.resetTextureUnits();const De=j.fog,Be=re.isMeshStandardMaterial?j.environment:null,et=B===null?R.outputColorSpace:B.isXRRenderTarget===!0?B.texture.colorSpace:hn,Ze=(re.isMeshStandardMaterial?$:C).get(re.envMap||Be),ut=re.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,ot=!!te.attributes.tangent&&(!!re.normalMap||re.anisotropy>0),Ue=!!te.morphAttributes.position,Ae=!!te.morphAttributes.normal,Xt=!!te.morphAttributes.color;let Ht=$i;re.toneMapped&&(B===null||B.isXRRenderTarget===!0)&&(Ht=R.toneMapping);const Zt=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,Ke=Zt!==void 0?Zt.length:0,st=lt.get(re),hi=M.state.lights;if(he===!0&&(we===!0||P!==L)){const He=P===L&&re.id===ae;pt.setState(re,P,He)}let It=!1;re.version===st.__version?(st.needsLights&&st.lightsStateVersion!==hi.state.version||st.outputColorSpace!==et||J.isBatchedMesh&&st.batching===!1||!J.isBatchedMesh&&st.batching===!0||J.isInstancedMesh&&st.instancing===!1||!J.isInstancedMesh&&st.instancing===!0||J.isSkinnedMesh&&st.skinning===!1||!J.isSkinnedMesh&&st.skinning===!0||J.isInstancedMesh&&st.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&st.instancingColor===!1&&J.instanceColor!==null||st.envMap!==Ze||re.fog===!0&&st.fog!==De||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==pt.numPlanes||st.numIntersection!==pt.numIntersection)||st.vertexAlphas!==ut||st.vertexTangents!==ot||st.morphTargets!==Ue||st.morphNormals!==Ae||st.morphColors!==Xt||st.toneMapping!==Ht||rt.isWebGL2===!0&&st.morphTargetsCount!==Ke)&&(It=!0):(It=!0,st.__version=re.version);let ue=st.currentProgram;It===!0&&(ue=Nr(re,j,J));let tt=!1,di=!1,nr=!1;const qt=ue.getUniforms(),kn=st.uniforms;if(Oe.useProgram(ue.program)&&(tt=!0,di=!0,nr=!0),re.id!==ae&&(ae=re.id,di=!0),tt||L!==P){qt.setValue(ee,"projectionMatrix",P.projectionMatrix),qt.setValue(ee,"viewMatrix",P.matrixWorldInverse);const He=qt.map.cameraPosition;He!==void 0&&He.setValue(ee,je.setFromMatrixPosition(P.matrixWorld)),rt.logarithmicDepthBuffer&&qt.setValue(ee,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(re.isMeshPhongMaterial||re.isMeshToonMaterial||re.isMeshLambertMaterial||re.isMeshBasicMaterial||re.isMeshStandardMaterial||re.isShaderMaterial)&&qt.setValue(ee,"isOrthographic",P.isOrthographicCamera===!0),L!==P&&(L=P,di=!0,nr=!0)}if(J.isSkinnedMesh){qt.setOptional(ee,J,"bindMatrix"),qt.setOptional(ee,J,"bindMatrixInverse");const He=J.skeleton;He&&(rt.floatVertexTextures?(He.boneTexture===null&&He.computeBoneTexture(),qt.setValue(ee,"boneTexture",He.boneTexture,U)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(qt.setOptional(ee,J,"batchingTexture"),qt.setValue(ee,"batchingTexture",J._matricesTexture,U));const Or=te.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0&&rt.isWebGL2===!0)&&ct.update(J,te,ue),(di||st.receiveShadow!==J.receiveShadow)&&(st.receiveShadow=J.receiveShadow,qt.setValue(ee,"receiveShadow",J.receiveShadow)),re.isMeshGouraudMaterial&&re.envMap!==null&&(kn.envMap.value=Ze,kn.flipEnvMap.value=Ze.isCubeTexture&&Ze.isRenderTargetTexture===!1?-1:1),di&&(qt.setValue(ee,"toneMappingExposure",R.toneMappingExposure),st.needsLights&&zs(kn,nr),De&&re.fog===!0&&Le.refreshFogUniforms(kn,De),Le.refreshMaterialUniforms(kn,re,K,H,Ge),Xo.upload(ee,Ur(st),kn,U)),re.isShaderMaterial&&re.uniformsNeedUpdate===!0&&(Xo.upload(ee,Ur(st),kn,U),re.uniformsNeedUpdate=!1),re.isSpriteMaterial&&qt.setValue(ee,"center",J.center),qt.setValue(ee,"modelViewMatrix",J.modelViewMatrix),qt.setValue(ee,"normalMatrix",J.normalMatrix),qt.setValue(ee,"modelMatrix",J.matrixWorld),re.isShaderMaterial||re.isRawShaderMaterial){const He=re.uniformsGroups;for(let Gs=0,ka=He.length;Gs<ka;Gs++)if(rt.isWebGL2){const ir=He[Gs];gt.update(ir,ue),gt.bind(ir,ue)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ue}function zs(P,j){P.ambientLightColor.needsUpdate=j,P.lightProbe.needsUpdate=j,P.directionalLights.needsUpdate=j,P.directionalLightShadows.needsUpdate=j,P.pointLights.needsUpdate=j,P.pointLightShadows.needsUpdate=j,P.spotLights.needsUpdate=j,P.spotLightShadows.needsUpdate=j,P.rectAreaLights.needsUpdate=j,P.hemisphereLights.needsUpdate=j}function ul(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return W},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return B},this.setRenderTargetTextures=function(P,j,te){lt.get(P.texture).__webglTexture=j,lt.get(P.depthTexture).__webglTexture=te;const re=lt.get(P);re.__hasExternalTextures=!0,re.__hasExternalTextures&&(re.__autoAllocateDepthBuffer=te===void 0,re.__autoAllocateDepthBuffer||ke.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),re.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,j){const te=lt.get(P);te.__webglFramebuffer=j,te.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(P,j=0,te=0){B=P,W=j,k=te;let re=!0,J=null,De=!1,Be=!1;if(P){const Ze=lt.get(P);Ze.__useDefaultFramebuffer!==void 0?(Oe.bindFramebuffer(ee.FRAMEBUFFER,null),re=!1):Ze.__webglFramebuffer===void 0?U.setupRenderTarget(P):Ze.__hasExternalTextures&&U.rebindTextures(P,lt.get(P.texture).__webglTexture,lt.get(P.depthTexture).__webglTexture);const ut=P.texture;(ut.isData3DTexture||ut.isDataArrayTexture||ut.isCompressedArrayTexture)&&(Be=!0);const ot=lt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(ot[j])?J=ot[j][te]:J=ot[j],De=!0):rt.isWebGL2&&P.samples>0&&U.useMultisampledRTT(P)===!1?J=lt.get(P).__webglMultisampledFramebuffer:Array.isArray(ot)?J=ot[te]:J=ot,O.copy(P.viewport),se.copy(P.scissor),oe=P.scissorTest}else O.copy(le).multiplyScalar(K).floor(),se.copy(de).multiplyScalar(K).floor(),oe=fe;if(Oe.bindFramebuffer(ee.FRAMEBUFFER,J)&&rt.drawBuffers&&re&&Oe.drawBuffers(P,J),Oe.viewport(O),Oe.scissor(se),Oe.setScissorTest(oe),De){const Ze=lt.get(P.texture);ee.framebufferTexture2D(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,ee.TEXTURE_CUBE_MAP_POSITIVE_X+j,Ze.__webglTexture,te)}else if(Be){const Ze=lt.get(P.texture),ut=j||0;ee.framebufferTextureLayer(ee.FRAMEBUFFER,ee.COLOR_ATTACHMENT0,Ze.__webglTexture,te||0,ut)}ae=-1},this.readRenderTargetPixels=function(P,j,te,re,J,De,Be){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let et=lt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Be!==void 0&&(et=et[Be]),et){Oe.bindFramebuffer(ee.FRAMEBUFFER,et);try{const Ze=P.texture,ut=Ze.format,ot=Ze.type;if(ut!==Wn&&Ie.convert(ut)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ue=ot===Pa&&(ke.has("EXT_color_buffer_half_float")||rt.isWebGL2&&ke.has("EXT_color_buffer_float"));if(ot!==er&&Ie.convert(ot)!==ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ot===wi&&(rt.isWebGL2||ke.has("OES_texture_float")||ke.has("WEBGL_color_buffer_float")))&&!Ue){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=P.width-re&&te>=0&&te<=P.height-J&&ee.readPixels(j,te,re,J,Ie.convert(ut),Ie.convert(ot),De)}finally{const Ze=B!==null?lt.get(B).__webglFramebuffer:null;Oe.bindFramebuffer(ee.FRAMEBUFFER,Ze)}}},this.copyFramebufferToTexture=function(P,j,te=0){const re=Math.pow(2,-te),J=Math.floor(j.image.width*re),De=Math.floor(j.image.height*re);U.setTexture2D(j,0),ee.copyTexSubImage2D(ee.TEXTURE_2D,te,0,0,P.x,P.y,J,De),Oe.unbindTexture()},this.copyTextureToTexture=function(P,j,te,re=0){const J=j.image.width,De=j.image.height,Be=Ie.convert(te.format),et=Ie.convert(te.type);U.setTexture2D(te,0),ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,te.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,te.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,te.unpackAlignment),j.isDataTexture?ee.texSubImage2D(ee.TEXTURE_2D,re,P.x,P.y,J,De,Be,et,j.image.data):j.isCompressedTexture?ee.compressedTexSubImage2D(ee.TEXTURE_2D,re,P.x,P.y,j.mipmaps[0].width,j.mipmaps[0].height,Be,j.mipmaps[0].data):ee.texSubImage2D(ee.TEXTURE_2D,re,P.x,P.y,Be,et,j.image),re===0&&te.generateMipmaps&&ee.generateMipmap(ee.TEXTURE_2D),Oe.unbindTexture()},this.copyTextureToTexture3D=function(P,j,te,re,J=0){if(R.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const De=P.max.x-P.min.x+1,Be=P.max.y-P.min.y+1,et=P.max.z-P.min.z+1,Ze=Ie.convert(re.format),ut=Ie.convert(re.type);let ot;if(re.isData3DTexture)U.setTexture3D(re,0),ot=ee.TEXTURE_3D;else if(re.isDataArrayTexture||re.isCompressedArrayTexture)U.setTexture2DArray(re,0),ot=ee.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL,re.flipY),ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL,re.premultiplyAlpha),ee.pixelStorei(ee.UNPACK_ALIGNMENT,re.unpackAlignment);const Ue=ee.getParameter(ee.UNPACK_ROW_LENGTH),Ae=ee.getParameter(ee.UNPACK_IMAGE_HEIGHT),Xt=ee.getParameter(ee.UNPACK_SKIP_PIXELS),Ht=ee.getParameter(ee.UNPACK_SKIP_ROWS),Zt=ee.getParameter(ee.UNPACK_SKIP_IMAGES),Ke=te.isCompressedTexture?te.mipmaps[J]:te.image;ee.pixelStorei(ee.UNPACK_ROW_LENGTH,Ke.width),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,Ke.height),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,P.min.x),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,P.min.y),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,P.min.z),te.isDataTexture||te.isData3DTexture?ee.texSubImage3D(ot,J,j.x,j.y,j.z,De,Be,et,Ze,ut,Ke.data):te.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),ee.compressedTexSubImage3D(ot,J,j.x,j.y,j.z,De,Be,et,Ze,Ke.data)):ee.texSubImage3D(ot,J,j.x,j.y,j.z,De,Be,et,Ze,ut,Ke),ee.pixelStorei(ee.UNPACK_ROW_LENGTH,Ue),ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT,Ae),ee.pixelStorei(ee.UNPACK_SKIP_PIXELS,Xt),ee.pixelStorei(ee.UNPACK_SKIP_ROWS,Ht),ee.pixelStorei(ee.UNPACK_SKIP_IMAGES,Zt),J===0&&re.generateMipmaps&&ee.generateMipmap(ot),Oe.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?U.setTextureCube(P,0):P.isData3DTexture?U.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?U.setTexture2DArray(P,0):U.setTexture2D(P,0),Oe.unbindTexture()},this.resetState=function(){W=0,k=0,B=null,Oe.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ci}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ou?"display-p3":"srgb",t.unpackColorSpace=At.workingColorSpace===nl?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Wt?Ar:Rp}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Ar?Wt:hn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class DM extends jp{}DM.prototype.isWebGL1Renderer=!0;class ol{constructor(e,t=1,r=1e3){this.isFog=!0,this.name="",this.color=new Qe(e),this.near=t,this.far=r}clone(){return new ol(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class IM extends kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class NM{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=ti()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,r){e*=this.stride,r*=t.stride;for(let s=0,c=this.stride;s<c;s++)this.array[e+s]=t.array[r+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),r=new this.constructor(t,this.stride);return r.setUsage(this.usage),r}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ti()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const An=new Y;class hu{constructor(e,t,r,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=r,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,r=this.data.count;t<r;t++)An.fromBufferAttribute(this,t),An.applyMatrix4(e),this.setXYZ(t,An.x,An.y,An.z);return this}applyNormalMatrix(e){for(let t=0,r=this.count;t<r;t++)An.fromBufferAttribute(this,t),An.applyNormalMatrix(e),this.setXYZ(t,An.x,An.y,An.z);return this}transformDirection(e){for(let t=0,r=this.count;t<r;t++)An.fromBufferAttribute(this,t),An.transformDirection(e),this.setXYZ(t,An.x,An.y,An.z);return this}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ci(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ci(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ci(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ci(t,this.array)),t}setXY(e,t,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),r=Rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this}setXYZ(e,t,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),r=Rt(r,this.array),s=Rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=s,this}setXYZW(e,t,r,s,c){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),r=Rt(r,this.array),s=Rt(s,this.array),c=Rt(c,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=r,this.data.array[e+2]=s,this.data.array[e+3]=c,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const s=r*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)t.push(this.data.array[s+c])}return new Rn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new hu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let r=0;r<this.count;r++){const s=r*this.data.stride+this.offset;for(let c=0;c<this.itemSize;c++)t.push(this.data.array[s+c])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const zd=new Y,Gd=new Dt,Wd=new Dt,UM=new Y,Vd=new xt,Bo=new Y,Ic=new ui,Xd=new xt,Nc=new il;class OM extends Cn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Eh,this.bindMatrix=new xt,this.bindMatrixInverse=new xt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Di),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let r=0;r<t.count;r++)this.getVertexPosition(r,Bo),this.boundingBox.expandByPoint(Bo)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ui),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let r=0;r<t.count;r++)this.getVertexPosition(r,Bo),this.boundingSphere.expandByPoint(Bo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const r=this.material,s=this.matrixWorld;r!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ic.copy(this.boundingSphere),Ic.applyMatrix4(s),e.ray.intersectsSphere(Ic)!==!1&&(Xd.copy(s).invert(),Nc.copy(e.ray).applyMatrix4(Xd),!(this.boundingBox!==null&&Nc.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Nc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Dt,t=this.geometry.attributes.skinWeight;for(let r=0,s=t.count;r<s;r++){e.fromBufferAttribute(t,r);const c=1/e.manhattanLength();c!==1/0?e.multiplyScalar(c):e.set(1,0,0,0),t.setXYZW(r,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Eh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Xv?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const r=this.skeleton,s=this.geometry;Gd.fromBufferAttribute(s.attributes.skinIndex,e),Wd.fromBufferAttribute(s.attributes.skinWeight,e),zd.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let c=0;c<4;c++){const f=Wd.getComponent(c);if(f!==0){const h=Gd.getComponent(c);Vd.multiplyMatrices(r.bones[h].matrixWorld,r.boneInverses[h]),t.addScaledVector(UM.copy(zd).applyMatrix4(Vd),f)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class Zp extends kt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class FM extends mn{constructor(e=null,t=1,r=1,s,c,f,h,p,m=fn,g=fn,_,x){super(null,f,h,p,m,g,s,c,_,x),this.isDataTexture=!0,this.image={data:e,width:t,height:r},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qd=new xt,BM=new xt;class du{constructor(e=[],t=[]){this.uuid=ti(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let r=0,s=this.bones.length;r<s;r++)this.boneInverses.push(new xt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const r=new xt;this.bones[e]&&r.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(r)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const r=this.bones[e];r&&r.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const r=this.bones[e];r&&(r.parent&&r.parent.isBone?(r.matrix.copy(r.parent.matrixWorld).invert(),r.matrix.multiply(r.matrixWorld)):r.matrix.copy(r.matrixWorld),r.matrix.decompose(r.position,r.quaternion,r.scale))}}update(){const e=this.bones,t=this.boneInverses,r=this.boneMatrices,s=this.boneTexture;for(let c=0,f=e.length;c<f;c++){const h=e[c]?e[c].matrixWorld:BM;qd.multiplyMatrices(h,t[c]),qd.toArray(r,c*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new du(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const r=new FM(t,e,e,Wn,wi);return r.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=r,this}getBoneByName(e){for(let t=0,r=this.bones.length;t<r;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let r=0,s=e.bones.length;r<s;r++){const c=e.bones[r];let f=t[c];f===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",c),f=new Zp),this.bones.push(f),this.boneInverses.push(new xt().fromArray(e.boneInverses[r]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,r=this.boneInverses;for(let s=0,c=t.length;s<c;s++){const f=t[s];e.bones.push(f.uuid);const h=r[s];e.boneInverses.push(h.toArray())}return e}}class eu extends Rn{constructor(e,t,r,s=1){super(e,t,r),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _s=new xt,Yd=new xt,ko=[],Kd=new Di,kM=new xt,ya=new Cn,Sa=new ui;class HM extends Cn{constructor(e,t,r){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new eu(new Float32Array(r*16),16),this.instanceColor=null,this.count=r,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<r;s++)this.setMatrixAt(s,kM)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Di),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,_s),Kd.copy(e.boundingBox).applyMatrix4(_s),this.boundingBox.union(Kd)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new ui),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let r=0;r<t;r++)this.getMatrixAt(r,_s),Sa.copy(e.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(Sa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const r=this.matrixWorld,s=this.count;if(ya.geometry=this.geometry,ya.material=this.material,ya.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Sa.copy(this.boundingSphere),Sa.applyMatrix4(r),e.ray.intersectsSphere(Sa)!==!1))for(let c=0;c<s;c++){this.getMatrixAt(c,_s),Yd.multiplyMatrices(r,_s),ya.matrixWorld=Yd,ya.raycast(e,ko);for(let f=0,h=ko.length;f<h;f++){const p=ko[f];p.instanceId=c,p.object=this,t.push(p)}ko.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new eu(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Jp extends Xn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const jd=new Y,Zd=new Y,Jd=new xt,Uc=new il,Ho=new ui;class pu extends kt{constructor(e=new ni,t=new Jp){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[0];for(let s=1,c=t.count;s<c;s++)jd.fromBufferAttribute(t,s-1),Zd.fromBufferAttribute(t,s),r[s]=r[s-1],r[s]+=jd.distanceTo(Zd);e.setAttribute("lineDistance",new qn(r,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,c=e.params.Line.threshold,f=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),Ho.copy(r.boundingSphere),Ho.applyMatrix4(s),Ho.radius+=c,e.ray.intersectsSphere(Ho)===!1)return;Jd.copy(s).invert(),Uc.copy(e.ray).applyMatrix4(Jd);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=new Y,g=new Y,_=new Y,x=new Y,T=this.isLineSegments?2:1,A=r.index,M=r.attributes.position;if(A!==null){const S=Math.max(0,f.start),I=Math.min(A.count,f.start+f.count);for(let R=S,N=I-1;R<N;R+=T){const W=A.getX(R),k=A.getX(R+1);if(m.fromBufferAttribute(M,W),g.fromBufferAttribute(M,k),Uc.distanceSqToSegment(m,g,x,_)>p)continue;x.applyMatrix4(this.matrixWorld);const ae=e.ray.origin.distanceTo(x);ae<e.near||ae>e.far||t.push({distance:ae,point:_.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}else{const S=Math.max(0,f.start),I=Math.min(M.count,f.start+f.count);for(let R=S,N=I-1;R<N;R+=T){if(m.fromBufferAttribute(M,R),g.fromBufferAttribute(M,R+1),Uc.distanceSqToSegment(m,g,x,_)>p)continue;x.applyMatrix4(this.matrixWorld);const k=e.ray.origin.distanceTo(x);k<e.near||k>e.far||t.push({distance:k,point:_.clone().applyMatrix4(this.matrixWorld),index:R,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=s.length;c<f;c++){const h=s[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}const Qd=new Y,$d=new Y;class zM extends pu{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,r=[];for(let s=0,c=t.count;s<c;s+=2)Qd.fromBufferAttribute(t,s),$d.fromBufferAttribute(t,s+1),r[s]=s===0?0:r[s-1],r[s+1]=r[s]+Qd.distanceTo($d);e.setAttribute("lineDistance",new qn(r,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class GM extends pu{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Qp extends Xn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ep=new xt,tu=new il,zo=new ui,Go=new Y;class WM extends kt{constructor(e=new ni,t=new Qp){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const r=this.geometry,s=this.matrixWorld,c=e.params.Points.threshold,f=r.drawRange;if(r.boundingSphere===null&&r.computeBoundingSphere(),zo.copy(r.boundingSphere),zo.applyMatrix4(s),zo.radius+=c,e.ray.intersectsSphere(zo)===!1)return;ep.copy(s).invert(),tu.copy(e.ray).applyMatrix4(ep);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=r.index,_=r.attributes.position;if(m!==null){const x=Math.max(0,f.start),T=Math.min(m.count,f.start+f.count);for(let A=x,w=T;A<w;A++){const M=m.getX(A);Go.fromBufferAttribute(_,M),tp(Go,M,p,s,e,t,this)}}else{const x=Math.max(0,f.start),T=Math.min(_.count,f.start+f.count);for(let A=x,w=T;A<w;A++)Go.fromBufferAttribute(_,A),tp(Go,A,p,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,r=Object.keys(t);if(r.length>0){const s=t[r[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,f=s.length;c<f;c++){const h=s[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function tp(l,e,t,r,s,c,f){const h=tu.distanceSqToPoint(l);if(h<t){const p=new Y;tu.closestPointToPoint(l,p),p.applyMatrix4(r);const m=s.ray.origin.distanceTo(p);if(m<s.near||m>s.far)return;c.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:e,face:null,object:f})}}class mu extends ni{constructor(e=1,t=1,r=1,s=32,c=1,f=!1,h=0,p=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:r,radialSegments:s,heightSegments:c,openEnded:f,thetaStart:h,thetaLength:p};const m=this;s=Math.floor(s),c=Math.floor(c);const g=[],_=[],x=[],T=[];let A=0;const w=[],M=r/2;let S=0;I(),f===!1&&(e>0&&R(!0),t>0&&R(!1)),this.setIndex(g),this.setAttribute("position",new qn(_,3)),this.setAttribute("normal",new qn(x,3)),this.setAttribute("uv",new qn(T,2));function I(){const N=new Y,W=new Y;let k=0;const B=(t-e)/r;for(let ae=0;ae<=c;ae++){const L=[],O=ae/c,se=O*(t-e)+e;for(let oe=0;oe<=s;oe++){const pe=oe/s,V=pe*p+h,X=Math.sin(V),H=Math.cos(V);W.x=se*X,W.y=-O*r+M,W.z=se*H,_.push(W.x,W.y,W.z),N.set(X,B,H).normalize(),x.push(N.x,N.y,N.z),T.push(pe,1-O),L.push(A++)}w.push(L)}for(let ae=0;ae<s;ae++)for(let L=0;L<c;L++){const O=w[L][ae],se=w[L+1][ae],oe=w[L+1][ae+1],pe=w[L][ae+1];g.push(O,se,pe),g.push(se,oe,pe),k+=6}m.addGroup(S,k,0),S+=k}function R(N){const W=A,k=new _t,B=new Y;let ae=0;const L=N===!0?e:t,O=N===!0?1:-1;for(let oe=1;oe<=s;oe++)_.push(0,M*O,0),x.push(0,O,0),T.push(.5,.5),A++;const se=A;for(let oe=0;oe<=s;oe++){const V=oe/s*p+h,X=Math.cos(V),H=Math.sin(V);B.x=L*H,B.y=M*O,B.z=L*X,_.push(B.x,B.y,B.z),x.push(0,O,0),k.x=X*.5+.5,k.y=H*.5*O+.5,T.push(k.x,k.y),A++}for(let oe=0;oe<s;oe++){const pe=W+oe,V=se+oe;N===!0?g.push(V,V+1,pe):g.push(V+1,V,pe),ae+=3}m.addGroup(S,ae,N===!0?1:2),S+=ae}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mu(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class gu extends mu{constructor(e=1,t=1,r=32,s=1,c=!1,f=0,h=Math.PI*2){super(0,e,t,r,s,c,f,h),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:r,heightSegments:s,openEnded:c,thetaStart:f,thetaLength:h}}static fromJSON(e){return new gu(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class vu extends Xn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ii extends vu{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new _t(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return yn(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class np extends Xn{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Qe(16777215),this.specular=new Qe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=$o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Oc extends Xn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=$o,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Wo(l,e,t){return!l||!t&&l.constructor===e?l:typeof e.BYTES_PER_ELEMENT=="number"?new e(l):Array.prototype.slice.call(l)}function VM(l){return ArrayBuffer.isView(l)&&!(l instanceof DataView)}function XM(l){function e(s,c){return l[s]-l[c]}const t=l.length,r=new Array(t);for(let s=0;s!==t;++s)r[s]=s;return r.sort(e),r}function ip(l,e,t){const r=l.length,s=new l.constructor(r);for(let c=0,f=0;f!==r;++c){const h=t[c]*e;for(let p=0;p!==e;++p)s[f++]=l[h+p]}return s}function $p(l,e,t,r){let s=1,c=l[0];for(;c!==void 0&&c[r]===void 0;)c=l[s++];if(c===void 0)return;let f=c[r];if(f!==void 0)if(Array.isArray(f))do f=c[r],f!==void 0&&(e.push(c.time),t.push.apply(t,f)),c=l[s++];while(c!==void 0);else if(f.toArray!==void 0)do f=c[r],f!==void 0&&(e.push(c.time),f.toArray(t,t.length)),c=l[s++];while(c!==void 0);else do f=c[r],f!==void 0&&(e.push(c.time),t.push(f)),c=l[s++];while(c!==void 0)}class Oa{constructor(e,t,r,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(r),this.sampleValues=t,this.valueSize=r,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let r=this._cachedIndex,s=t[r],c=t[r-1];e:{t:{let f;n:{i:if(!(e<s)){for(let h=r+2;;){if(s===void 0){if(e<c)break i;return r=t.length,this._cachedIndex=r,this.copySampleValue_(r-1)}if(r===h)break;if(c=s,s=t[++r],e<s)break t}f=t.length;break n}if(!(e>=c)){const h=t[1];e<h&&(r=2,c=h);for(let p=r-2;;){if(c===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===p)break;if(s=c,c=t[--r-1],e>=c)break t}f=r,r=0;break n}break e}for(;r<f;){const h=r+f>>>1;e<t[h]?f=h:r=h+1}if(s=t[r],c=t[r-1],c===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return r=t.length,this._cachedIndex=r,this.copySampleValue_(r-1)}this._cachedIndex=r,this.intervalChanged_(r,c,s)}return this.interpolate_(r,c,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,r=this.sampleValues,s=this.valueSize,c=e*s;for(let f=0;f!==s;++f)t[f]=r[c+f];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class qM extends Oa{constructor(e,t,r,s){super(e,t,r,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Jh,endingEnd:Jh}}intervalChanged_(e,t,r){const s=this.parameterPositions;let c=e-2,f=e+1,h=s[c],p=s[f];if(h===void 0)switch(this.getSettings_().endingStart){case Qh:c=e,h=2*t-r;break;case $h:c=s.length-2,h=t+s[c]-s[c+1];break;default:c=e,h=r}if(p===void 0)switch(this.getSettings_().endingEnd){case Qh:f=e,p=2*r-t;break;case $h:f=1,p=r+s[1]-s[0];break;default:f=e-1,p=t}const m=(r-t)*.5,g=this.valueSize;this._weightPrev=m/(t-h),this._weightNext=m/(p-r),this._offsetPrev=c*g,this._offsetNext=f*g}interpolate_(e,t,r,s){const c=this.resultBuffer,f=this.sampleValues,h=this.valueSize,p=e*h,m=p-h,g=this._offsetPrev,_=this._offsetNext,x=this._weightPrev,T=this._weightNext,A=(r-t)/(s-t),w=A*A,M=w*A,S=-x*M+2*x*w-x*A,I=(1+x)*M+(-1.5-2*x)*w+(-.5+x)*A+1,R=(-1-T)*M+(1.5+T)*w+.5*A,N=T*M-T*w;for(let W=0;W!==h;++W)c[W]=S*f[g+W]+I*f[m+W]+R*f[p+W]+N*f[_+W];return c}}class YM extends Oa{constructor(e,t,r,s){super(e,t,r,s)}interpolate_(e,t,r,s){const c=this.resultBuffer,f=this.sampleValues,h=this.valueSize,p=e*h,m=p-h,g=(r-t)/(s-t),_=1-g;for(let x=0;x!==h;++x)c[x]=f[m+x]*_+f[p+x]*g;return c}}class KM extends Oa{constructor(e,t,r,s){super(e,t,r,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class fi{constructor(e,t,r,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Wo(t,this.TimeBufferType),this.values=Wo(r,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let r;if(t.toJSON!==this.toJSON)r=t.toJSON(e);else{r={name:e.name,times:Wo(e.times,Array),values:Wo(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(r.interpolation=s)}return r.type=e.ValueTypeName,r}InterpolantFactoryMethodDiscrete(e){return new KM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new YM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new qM(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Da:t=this.InterpolantFactoryMethodDiscrete;break;case Cs:t=this.InterpolantFactoryMethodLinear;break;case cc:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const r="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(r);return console.warn("THREE.KeyframeTrack:",r),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Da;case this.InterpolantFactoryMethodLinear:return Cs;case this.InterpolantFactoryMethodSmooth:return cc}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let r=0,s=t.length;r!==s;++r)t[r]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let r=0,s=t.length;r!==s;++r)t[r]*=e}return this}trim(e,t){const r=this.times,s=r.length;let c=0,f=s-1;for(;c!==s&&r[c]<e;)++c;for(;f!==-1&&r[f]>t;)--f;if(++f,c!==0||f!==s){c>=f&&(f=Math.max(f,1),c=f-1);const h=this.getValueSize();this.times=r.slice(c,f),this.values=this.values.slice(c*h,f*h)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const r=this.times,s=this.values,c=r.length;c===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let f=null;for(let h=0;h!==c;h++){const p=r[h];if(typeof p=="number"&&isNaN(p)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,h,p),e=!1;break}if(f!==null&&f>p){console.error("THREE.KeyframeTrack: Out of order keys.",this,h,p,f),e=!1;break}f=p}if(s!==void 0&&VM(s))for(let h=0,p=s.length;h!==p;++h){const m=s[h];if(isNaN(m)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,h,m),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),r=this.getValueSize(),s=this.getInterpolation()===cc,c=e.length-1;let f=1;for(let h=1;h<c;++h){let p=!1;const m=e[h],g=e[h+1];if(m!==g&&(h!==1||m!==e[0]))if(s)p=!0;else{const _=h*r,x=_-r,T=_+r;for(let A=0;A!==r;++A){const w=t[_+A];if(w!==t[x+A]||w!==t[T+A]){p=!0;break}}}if(p){if(h!==f){e[f]=e[h];const _=h*r,x=f*r;for(let T=0;T!==r;++T)t[x+T]=t[_+T]}++f}}if(c>0){e[f]=e[c];for(let h=c*r,p=f*r,m=0;m!==r;++m)t[p+m]=t[h+m];++f}return f!==e.length?(this.times=e.slice(0,f),this.values=t.slice(0,f*r)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),r=this.constructor,s=new r(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}fi.prototype.TimeBufferType=Float32Array;fi.prototype.ValueBufferType=Float32Array;fi.prototype.DefaultInterpolation=Cs;class Fs extends fi{}Fs.prototype.ValueTypeName="bool";Fs.prototype.ValueBufferType=Array;Fs.prototype.DefaultInterpolation=Da;Fs.prototype.InterpolantFactoryMethodLinear=void 0;Fs.prototype.InterpolantFactoryMethodSmooth=void 0;class em extends fi{}em.prototype.ValueTypeName="color";class Ps extends fi{}Ps.prototype.ValueTypeName="number";class jM extends Oa{constructor(e,t,r,s){super(e,t,r,s)}interpolate_(e,t,r,s){const c=this.resultBuffer,f=this.sampleValues,h=this.valueSize,p=(r-t)/(s-t);let m=e*h;for(let g=m+h;m!==g;m+=4)tr.slerpFlat(c,0,f,m-h,f,m,p);return c}}class Lr extends fi{InterpolantFactoryMethodLinear(e){return new jM(this.times,this.values,this.getValueSize(),e)}}Lr.prototype.ValueTypeName="quaternion";Lr.prototype.DefaultInterpolation=Cs;Lr.prototype.InterpolantFactoryMethodSmooth=void 0;class Bs extends fi{}Bs.prototype.ValueTypeName="string";Bs.prototype.ValueBufferType=Array;Bs.prototype.DefaultInterpolation=Da;Bs.prototype.InterpolantFactoryMethodLinear=void 0;Bs.prototype.InterpolantFactoryMethodSmooth=void 0;class Ds extends fi{}Ds.prototype.ValueTypeName="vector";class ZM{constructor(e,t=-1,r,s=e0){this.name=e,this.tracks=r,this.duration=t,this.blendMode=s,this.uuid=ti(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],r=e.tracks,s=1/(e.fps||1);for(let f=0,h=r.length;f!==h;++f)t.push(QM(r[f]).scale(s));const c=new this(e.name,e.duration,t,e.blendMode);return c.uuid=e.uuid,c}static toJSON(e){const t=[],r=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let c=0,f=r.length;c!==f;++c)t.push(fi.toJSON(r[c]));return s}static CreateFromMorphTargetSequence(e,t,r,s){const c=t.length,f=[];for(let h=0;h<c;h++){let p=[],m=[];p.push((h+c-1)%c,h,(h+1)%c),m.push(0,1,0);const g=XM(p);p=ip(p,1,g),m=ip(m,1,g),!s&&p[0]===0&&(p.push(c),m.push(m[0])),f.push(new Ps(".morphTargetInfluences["+t[h].name+"]",p,m).scale(1/r))}return new this(e,-1,f)}static findByName(e,t){let r=e;if(!Array.isArray(e)){const s=e;r=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<r.length;s++)if(r[s].name===t)return r[s];return null}static CreateClipsFromMorphTargetSequences(e,t,r){const s={},c=/^([\w-]*?)([\d]+)$/;for(let h=0,p=e.length;h<p;h++){const m=e[h],g=m.name.match(c);if(g&&g.length>1){const _=g[1];let x=s[_];x||(s[_]=x=[]),x.push(m)}}const f=[];for(const h in s)f.push(this.CreateFromMorphTargetSequence(h,s[h],t,r));return f}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const r=function(_,x,T,A,w){if(T.length!==0){const M=[],S=[];$p(T,M,S,A),M.length!==0&&w.push(new _(x,M,S))}},s=[],c=e.name||"default",f=e.fps||30,h=e.blendMode;let p=e.length||-1;const m=e.hierarchy||[];for(let _=0;_<m.length;_++){const x=m[_].keys;if(!(!x||x.length===0))if(x[0].morphTargets){const T={};let A;for(A=0;A<x.length;A++)if(x[A].morphTargets)for(let w=0;w<x[A].morphTargets.length;w++)T[x[A].morphTargets[w]]=-1;for(const w in T){const M=[],S=[];for(let I=0;I!==x[A].morphTargets.length;++I){const R=x[A];M.push(R.time),S.push(R.morphTarget===w?1:0)}s.push(new Ps(".morphTargetInfluence["+w+"]",M,S))}p=T.length*f}else{const T=".bones["+t[_].name+"]";r(Ds,T+".position",x,"pos",s),r(Lr,T+".quaternion",x,"rot",s),r(Ds,T+".scale",x,"scl",s)}}return s.length===0?null:new this(c,p,s,h)}resetDuration(){const e=this.tracks;let t=0;for(let r=0,s=e.length;r!==s;++r){const c=this.tracks[r];t=Math.max(t,c.times[c.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function JM(l){switch(l.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ps;case"vector":case"vector2":case"vector3":case"vector4":return Ds;case"color":return em;case"quaternion":return Lr;case"bool":case"boolean":return Fs;case"string":return Bs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+l)}function QM(l){if(l.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=JM(l.type);if(l.times===void 0){const t=[],r=[];$p(l.keys,t,r,"value"),l.times=t,l.values=r}return e.parse!==void 0?e.parse(l):new e(l.name,l.times,l.values,l.interpolation)}const Ji={enabled:!1,files:{},add:function(l,e){this.enabled!==!1&&(this.files[l]=e)},get:function(l){if(this.enabled!==!1)return this.files[l]},remove:function(l){delete this.files[l]},clear:function(){this.files={}}};class $M{constructor(e,t,r){const s=this;let c=!1,f=0,h=0,p;const m=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=r,this.itemStart=function(g){h++,c===!1&&s.onStart!==void 0&&s.onStart(g,f,h),c=!0},this.itemEnd=function(g){f++,s.onProgress!==void 0&&s.onProgress(g,f,h),f===h&&(c=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(g){s.onError!==void 0&&s.onError(g)},this.resolveURL=function(g){return p?p(g):g},this.setURLModifier=function(g){return p=g,this},this.addHandler=function(g,_){return m.push(g,_),this},this.removeHandler=function(g){const _=m.indexOf(g);return _!==-1&&m.splice(_,2),this},this.getHandler=function(g){for(let _=0,x=m.length;_<x;_+=2){const T=m[_],A=m[_+1];if(T.global&&(T.lastIndex=0),T.test(g))return A}return null}}}const eT=new $M;class ks{constructor(e){this.manager=e!==void 0?e:eT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const r=this;return new Promise(function(s,c){r.load(e,s,t,c)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ks.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ei={};class tT extends Error{constructor(e,t){super(e),this.response=t}}class tm extends ks{constructor(e){super(e)}load(e,t,r,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=Ji.get(e);if(c!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(c),this.manager.itemEnd(e)},0),c;if(Ei[e]!==void 0){Ei[e].push({onLoad:t,onProgress:r,onError:s});return}Ei[e]=[],Ei[e].push({onLoad:t,onProgress:r,onError:s});const f=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),h=this.mimeType,p=this.responseType;fetch(f).then(m=>{if(m.status===200||m.status===0){if(m.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||m.body===void 0||m.body.getReader===void 0)return m;const g=Ei[e],_=m.body.getReader(),x=m.headers.get("Content-Length")||m.headers.get("X-File-Size"),T=x?parseInt(x):0,A=T!==0;let w=0;const M=new ReadableStream({start(S){I();function I(){_.read().then(({done:R,value:N})=>{if(R)S.close();else{w+=N.byteLength;const W=new ProgressEvent("progress",{lengthComputable:A,loaded:w,total:T});for(let k=0,B=g.length;k<B;k++){const ae=g[k];ae.onProgress&&ae.onProgress(W)}S.enqueue(N),I()}})}}});return new Response(M)}else throw new tT(`fetch for "${m.url}" responded with ${m.status}: ${m.statusText}`,m)}).then(m=>{switch(p){case"arraybuffer":return m.arrayBuffer();case"blob":return m.blob();case"document":return m.text().then(g=>new DOMParser().parseFromString(g,h));case"json":return m.json();default:if(h===void 0)return m.text();{const _=/charset="?([^;"\s]*)"?/i.exec(h),x=_&&_[1]?_[1].toLowerCase():void 0,T=new TextDecoder(x);return m.arrayBuffer().then(A=>T.decode(A))}}}).then(m=>{Ji.add(e,m);const g=Ei[e];delete Ei[e];for(let _=0,x=g.length;_<x;_++){const T=g[_];T.onLoad&&T.onLoad(m)}}).catch(m=>{const g=Ei[e];if(g===void 0)throw this.manager.itemError(e),m;delete Ei[e];for(let _=0,x=g.length;_<x;_++){const T=g[_];T.onError&&T.onError(m)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class nT extends ks{constructor(e){super(e)}load(e,t,r,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=Ji.get(e);if(f!==void 0)return c.manager.itemStart(e),setTimeout(function(){t&&t(f),c.manager.itemEnd(e)},0),f;const h=Ia("img");function p(){g(),Ji.add(e,this),t&&t(this),c.manager.itemEnd(e)}function m(_){g(),s&&s(_),c.manager.itemError(e),c.manager.itemEnd(e)}function g(){h.removeEventListener("load",p,!1),h.removeEventListener("error",m,!1)}return h.addEventListener("load",p,!1),h.addEventListener("error",m,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(h.crossOrigin=this.crossOrigin),c.manager.itemStart(e),h.src=e,h}}class iT extends ks{constructor(e){super(e)}load(e,t,r,s){const c=new mn,f=new nT(this.manager);return f.setCrossOrigin(this.crossOrigin),f.setPath(this.path),f.load(e,function(h){c.image=h,c.needsUpdate=!0,t!==void 0&&t(c)},r,s),c}}class ll extends kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Fc=new xt,rp=new Y,sp=new Y;class _u{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cu,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new Dt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,r=this.matrix;rp.setFromMatrixPosition(e.matrixWorld),t.position.copy(rp),sp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sp),t.updateMatrixWorld(),Fc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fc),r.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),r.multiply(Fc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class rT extends _u{constructor(){super(new In(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,r=Rs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,c=e.distance||t.far;(r!==t.fov||s!==t.aspect||c!==t.far)&&(t.fov=r,t.aspect=s,t.far=c,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class sT extends ll{constructor(e,t,r=0,s=Math.PI/3,c=0,f=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.distance=r,this.angle=s,this.penumbra=c,this.decay=f,this.map=null,this.shadow=new rT}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ap=new xt,Ma=new Y,Bc=new Y;class aT extends _u{constructor(){super(new In(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _t(4,2),this._viewportCount=6,this._viewports=[new Dt(2,1,1,1),new Dt(0,1,1,1),new Dt(3,1,1,1),new Dt(1,1,1,1),new Dt(3,0,1,1),new Dt(1,0,1,1)],this._cubeDirections=[new Y(1,0,0),new Y(-1,0,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,1,0),new Y(0,-1,0)],this._cubeUps=[new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,0,1),new Y(0,0,-1)]}updateMatrices(e,t=0){const r=this.camera,s=this.matrix,c=e.distance||r.far;c!==r.far&&(r.far=c,r.updateProjectionMatrix()),Ma.setFromMatrixPosition(e.matrixWorld),r.position.copy(Ma),Bc.copy(r.position),Bc.add(this._cubeDirections[t]),r.up.copy(this._cubeUps[t]),r.lookAt(Bc),r.updateMatrixWorld(),s.makeTranslation(-Ma.x,-Ma.y,-Ma.z),ap.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ap)}}class oT extends ll{constructor(e,t,r=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=r,this.decay=s,this.shadow=new aT}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class lT extends _u{constructor(){super(new sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nm extends ll{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(kt.DEFAULT_UP),this.updateMatrix(),this.target=new kt,this.shadow=new lT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class cT extends ll{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Ca{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let r=0,s=e.length;r<s;r++)t+=String.fromCharCode(e[r]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class uT extends ks{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,r,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const c=this,f=Ji.get(e);if(f!==void 0){if(c.manager.itemStart(e),f.then){f.then(m=>{t&&t(m),c.manager.itemEnd(e)}).catch(m=>{s&&s(m)});return}return setTimeout(function(){t&&t(f),c.manager.itemEnd(e)},0),f}const h={};h.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",h.headers=this.requestHeader;const p=fetch(e,h).then(function(m){return m.blob()}).then(function(m){return createImageBitmap(m,Object.assign(c.options,{colorSpaceConversion:"none"}))}).then(function(m){return Ji.add(e,m),t&&t(m),c.manager.itemEnd(e),m}).catch(function(m){s&&s(m),Ji.remove(e),c.manager.itemError(e),c.manager.itemEnd(e)});Ji.add(e,p),c.manager.itemStart(e)}}class fT{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=op(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=op();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function op(){return(typeof performance>"u"?Date:performance).now()}const xu="\\[\\]\\.:\\/",hT=new RegExp("["+xu+"]","g"),yu="[^"+xu+"]",dT="[^"+xu.replace("\\.","")+"]",pT=/((?:WC+[\/:])*)/.source.replace("WC",yu),mT=/(WCOD+)?/.source.replace("WCOD",dT),gT=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",yu),vT=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",yu),_T=new RegExp("^"+pT+mT+gT+vT+"$"),xT=["material","materials","bones","map"];class yT{constructor(e,t,r){const s=r||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const r=this._targetGroup.nCachedObjects_,s=this._bindings[r];s!==void 0&&s.getValue(e,t)}setValue(e,t){const r=this._bindings;for(let s=this._targetGroup.nCachedObjects_,c=r.length;s!==c;++s)r[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,r=e.length;t!==r;++t)e[t].unbind()}}class wt{constructor(e,t,r){this.path=t,this.parsedPath=r||wt.parseTrackName(t),this.node=wt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,r){return e&&e.isAnimationObjectGroup?new wt.Composite(e,t,r):new wt(e,t,r)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(hT,"")}static parseTrackName(e){const t=_T.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const r={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=r.nodeName&&r.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const c=r.nodeName.substring(s+1);xT.indexOf(c)!==-1&&(r.nodeName=r.nodeName.substring(0,s),r.objectName=c)}if(r.propertyName===null||r.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return r}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const r=e.skeleton.getBoneByName(t);if(r!==void 0)return r}if(e.children){const r=function(c){for(let f=0;f<c.length;f++){const h=c[f];if(h.name===t||h.uuid===t)return h;const p=r(h.children);if(p)return p}return null},s=r(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const r=this.resolvedProperty;for(let s=0,c=r.length;s!==c;++s)e[t++]=r[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const r=this.resolvedProperty;for(let s=0,c=r.length;s!==c;++s)r[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const r=this.resolvedProperty;for(let s=0,c=r.length;s!==c;++s)r[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const r=this.resolvedProperty;for(let s=0,c=r.length;s!==c;++s)r[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,r=t.objectName,s=t.propertyName;let c=t.propertyIndex;if(e||(e=wt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(r){let m=t.objectIndex;switch(r){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let g=0;g<e.length;g++)if(e[g].name===m){m=g;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[r]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[r]}if(m!==void 0){if(e[m]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[m]}}const f=e[s];if(f===void 0){const m=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+m+"."+s+" but it wasn't found.",e);return}let h=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?h=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(h=this.Versioning.MatrixWorldNeedsUpdate);let p=this.BindingType.Direct;if(c!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[c]!==void 0&&(c=e.morphTargetDictionary[c])}p=this.BindingType.ArrayElement,this.resolvedProperty=f,this.propertyIndex=c}else f.fromArray!==void 0&&f.toArray!==void 0?(p=this.BindingType.HasFromToArray,this.resolvedProperty=f):Array.isArray(f)?(p=this.BindingType.EntireArray,this.resolvedProperty=f):this.propertyName=s;this.getValue=this.GetterByBindingType[p],this.setValue=this.SetterByBindingTypeAndVersioning[p][h]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}wt.Composite=yT;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:su}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=su);function lp(l,e){if(e===t0)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),l;if(e===jc||e===Cp){let t=l.getIndex();if(t===null){const f=[],h=l.getAttribute("position");if(h!==void 0){for(let p=0;p<h.count;p++)f.push(p);l.setIndex(f),t=l.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),l}const r=t.count-2,s=[];if(e===jc)for(let f=1;f<=r;f++)s.push(t.getX(0)),s.push(t.getX(f)),s.push(t.getX(f+1));else for(let f=0;f<r;f++)f%2===0?(s.push(t.getX(f)),s.push(t.getX(f+1)),s.push(t.getX(f+2))):(s.push(t.getX(f+2)),s.push(t.getX(f+1)),s.push(t.getX(f)));s.length/3!==r&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const c=l.clone();return c.setIndex(s),c.clearGroups(),c}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),l}class ST extends ks{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new AT(t)}),this.register(function(t){return new UT(t)}),this.register(function(t){return new OT(t)}),this.register(function(t){return new FT(t)}),this.register(function(t){return new CT(t)}),this.register(function(t){return new RT(t)}),this.register(function(t){return new LT(t)}),this.register(function(t){return new PT(t)}),this.register(function(t){return new ET(t)}),this.register(function(t){return new DT(t)}),this.register(function(t){return new wT(t)}),this.register(function(t){return new NT(t)}),this.register(function(t){return new IT(t)}),this.register(function(t){return new TT(t)}),this.register(function(t){return new BT(t)}),this.register(function(t){return new kT(t)})}load(e,t,r,s){const c=this;let f;if(this.resourcePath!=="")f=this.resourcePath;else if(this.path!==""){const m=Ca.extractUrlBase(e);f=Ca.resolveURL(m,this.path)}else f=Ca.extractUrlBase(e);this.manager.itemStart(e);const h=function(m){s?s(m):console.error(m),c.manager.itemError(e),c.manager.itemEnd(e)},p=new tm(this.manager);p.setPath(this.path),p.setResponseType("arraybuffer"),p.setRequestHeader(this.requestHeader),p.setWithCredentials(this.withCredentials),p.load(e,function(m){try{c.parse(m,f,function(g){t(g),c.manager.itemEnd(e)},h)}catch(g){h(g)}},r,h)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,r,s){let c;const f={},h={},p=new TextDecoder;if(typeof e=="string")c=JSON.parse(e);else if(e instanceof ArrayBuffer)if(p.decode(new Uint8Array(e,0,4))===im){try{f[yt.KHR_BINARY_GLTF]=new HT(e)}catch(_){s&&s(_);return}c=JSON.parse(f[yt.KHR_BINARY_GLTF].content)}else c=JSON.parse(p.decode(e));else c=e;if(c.asset===void 0||c.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const m=new $T(c,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});m.fileLoader.setRequestHeader(this.requestHeader);for(let g=0;g<this.pluginCallbacks.length;g++){const _=this.pluginCallbacks[g](m);_.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),h[_.name]=_,f[_.name]=!0}if(c.extensionsUsed)for(let g=0;g<c.extensionsUsed.length;++g){const _=c.extensionsUsed[g],x=c.extensionsRequired||[];switch(_){case yt.KHR_MATERIALS_UNLIT:f[_]=new bT;break;case yt.KHR_DRACO_MESH_COMPRESSION:f[_]=new zT(c,this.dracoLoader);break;case yt.KHR_TEXTURE_TRANSFORM:f[_]=new GT;break;case yt.KHR_MESH_QUANTIZATION:f[_]=new WT;break;default:x.indexOf(_)>=0&&h[_]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+_+'".')}}m.setExtensions(f),m.setPlugins(h),m.parse(r,s)}parseAsync(e,t){const r=this;return new Promise(function(s,c){r.parse(e,t,s,c)})}}function MT(){let l={};return{get:function(e){return l[e]},add:function(e,t){l[e]=t},remove:function(e){delete l[e]},removeAll:function(){l={}}}}const yt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class TT{constructor(e){this.parser=e,this.name=yt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let r=0,s=t.length;r<s;r++){const c=t[r];c.extensions&&c.extensions[this.name]&&c.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,c.extensions[this.name].light)}}_loadLight(e){const t=this.parser,r="light:"+e;let s=t.cache.get(r);if(s)return s;const c=t.json,p=((c.extensions&&c.extensions[this.name]||{}).lights||[])[e];let m;const g=new Qe(16777215);p.color!==void 0&&g.setRGB(p.color[0],p.color[1],p.color[2],hn);const _=p.range!==void 0?p.range:0;switch(p.type){case"directional":m=new nm(g),m.target.position.set(0,0,-1),m.add(m.target);break;case"point":m=new oT(g),m.distance=_;break;case"spot":m=new sT(g),m.distance=_,p.spot=p.spot||{},p.spot.innerConeAngle=p.spot.innerConeAngle!==void 0?p.spot.innerConeAngle:0,p.spot.outerConeAngle=p.spot.outerConeAngle!==void 0?p.spot.outerConeAngle:Math.PI/4,m.angle=p.spot.outerConeAngle,m.penumbra=1-p.spot.innerConeAngle/p.spot.outerConeAngle,m.target.position.set(0,0,-1),m.add(m.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+p.type)}return m.position.set(0,0,0),m.decay=2,ji(m,p),p.intensity!==void 0&&(m.intensity=p.intensity),m.name=t.createUniqueName(p.name||"light_"+e),s=Promise.resolve(m),t.cache.add(r,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,r=this.parser,c=r.json.nodes[e],h=(c.extensions&&c.extensions[this.name]||{}).light;return h===void 0?null:this._loadLight(h).then(function(p){return r._getNodeRef(t.cache,h,p)})}}class bT{constructor(){this.name=yt.KHR_MATERIALS_UNLIT}getMaterialType(){return Tr}extendParams(e,t,r){const s=[];e.color=new Qe(1,1,1),e.opacity=1;const c=t.pbrMetallicRoughness;if(c){if(Array.isArray(c.baseColorFactor)){const f=c.baseColorFactor;e.color.setRGB(f[0],f[1],f[2],hn),e.opacity=f[3]}c.baseColorTexture!==void 0&&s.push(r.assignTexture(e,"map",c.baseColorTexture,Wt))}return Promise.all(s)}}class ET{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=s.extensions[this.name].emissiveStrength;return c!==void 0&&(t.emissiveIntensity=c),Promise.resolve()}}class AT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[],f=s.extensions[this.name];if(f.clearcoatFactor!==void 0&&(t.clearcoat=f.clearcoatFactor),f.clearcoatTexture!==void 0&&c.push(r.assignTexture(t,"clearcoatMap",f.clearcoatTexture)),f.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=f.clearcoatRoughnessFactor),f.clearcoatRoughnessTexture!==void 0&&c.push(r.assignTexture(t,"clearcoatRoughnessMap",f.clearcoatRoughnessTexture)),f.clearcoatNormalTexture!==void 0&&(c.push(r.assignTexture(t,"clearcoatNormalMap",f.clearcoatNormalTexture)),f.clearcoatNormalTexture.scale!==void 0)){const h=f.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new _t(h,h)}return Promise.all(c)}}class wT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[],f=s.extensions[this.name];return f.iridescenceFactor!==void 0&&(t.iridescence=f.iridescenceFactor),f.iridescenceTexture!==void 0&&c.push(r.assignTexture(t,"iridescenceMap",f.iridescenceTexture)),f.iridescenceIor!==void 0&&(t.iridescenceIOR=f.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),f.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=f.iridescenceThicknessMinimum),f.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=f.iridescenceThicknessMaximum),f.iridescenceThicknessTexture!==void 0&&c.push(r.assignTexture(t,"iridescenceThicknessMap",f.iridescenceThicknessTexture)),Promise.all(c)}}class CT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SHEEN}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[];t.sheenColor=new Qe(0,0,0),t.sheenRoughness=0,t.sheen=1;const f=s.extensions[this.name];if(f.sheenColorFactor!==void 0){const h=f.sheenColorFactor;t.sheenColor.setRGB(h[0],h[1],h[2],hn)}return f.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=f.sheenRoughnessFactor),f.sheenColorTexture!==void 0&&c.push(r.assignTexture(t,"sheenColorMap",f.sheenColorTexture,Wt)),f.sheenRoughnessTexture!==void 0&&c.push(r.assignTexture(t,"sheenRoughnessMap",f.sheenRoughnessTexture)),Promise.all(c)}}class RT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[],f=s.extensions[this.name];return f.transmissionFactor!==void 0&&(t.transmission=f.transmissionFactor),f.transmissionTexture!==void 0&&c.push(r.assignTexture(t,"transmissionMap",f.transmissionTexture)),Promise.all(c)}}class LT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_VOLUME}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[],f=s.extensions[this.name];t.thickness=f.thicknessFactor!==void 0?f.thicknessFactor:0,f.thicknessTexture!==void 0&&c.push(r.assignTexture(t,"thicknessMap",f.thicknessTexture)),t.attenuationDistance=f.attenuationDistance||1/0;const h=f.attenuationColor||[1,1,1];return t.attenuationColor=new Qe().setRGB(h[0],h[1],h[2],hn),Promise.all(c)}}class PT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_IOR}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=s.extensions[this.name];return t.ior=c.ior!==void 0?c.ior:1.5,Promise.resolve()}}class DT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[],f=s.extensions[this.name];t.specularIntensity=f.specularFactor!==void 0?f.specularFactor:1,f.specularTexture!==void 0&&c.push(r.assignTexture(t,"specularIntensityMap",f.specularTexture));const h=f.specularColorFactor||[1,1,1];return t.specularColor=new Qe().setRGB(h[0],h[1],h[2],hn),f.specularColorTexture!==void 0&&c.push(r.assignTexture(t,"specularColorMap",f.specularColorTexture,Wt)),Promise.all(c)}}class IT{constructor(e){this.parser=e,this.name=yt.EXT_MATERIALS_BUMP}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[],f=s.extensions[this.name];return t.bumpScale=f.bumpFactor!==void 0?f.bumpFactor:1,f.bumpTexture!==void 0&&c.push(r.assignTexture(t,"bumpMap",f.bumpTexture)),Promise.all(c)}}class NT{constructor(e){this.parser=e,this.name=yt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const r=this.parser.json.materials[e];return!r.extensions||!r.extensions[this.name]?null:Ii}extendMaterialParams(e,t){const r=this.parser,s=r.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const c=[],f=s.extensions[this.name];return f.anisotropyStrength!==void 0&&(t.anisotropy=f.anisotropyStrength),f.anisotropyRotation!==void 0&&(t.anisotropyRotation=f.anisotropyRotation),f.anisotropyTexture!==void 0&&c.push(r.assignTexture(t,"anisotropyMap",f.anisotropyTexture)),Promise.all(c)}}class UT{constructor(e){this.parser=e,this.name=yt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,r=t.json,s=r.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const c=s.extensions[this.name],f=t.options.ktx2Loader;if(!f){if(r.extensionsRequired&&r.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,c.source,f)}}class OT{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,r=this.parser,s=r.json,c=s.textures[e];if(!c.extensions||!c.extensions[t])return null;const f=c.extensions[t],h=s.images[f.source];let p=r.textureLoader;if(h.uri){const m=r.options.manager.getHandler(h.uri);m!==null&&(p=m)}return this.detectSupport().then(function(m){if(m)return r.loadTextureImage(e,f.source,p);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return r.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class FT{constructor(e){this.parser=e,this.name=yt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,r=this.parser,s=r.json,c=s.textures[e];if(!c.extensions||!c.extensions[t])return null;const f=c.extensions[t],h=s.images[f.source];let p=r.textureLoader;if(h.uri){const m=r.options.manager.getHandler(h.uri);m!==null&&(p=m)}return this.detectSupport().then(function(m){if(m)return r.loadTextureImage(e,f.source,p);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return r.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class BT{constructor(e){this.name=yt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,r=t.bufferViews[e];if(r.extensions&&r.extensions[this.name]){const s=r.extensions[this.name],c=this.parser.getDependency("buffer",s.buffer),f=this.parser.options.meshoptDecoder;if(!f||!f.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return c.then(function(h){const p=s.byteOffset||0,m=s.byteLength||0,g=s.count,_=s.byteStride,x=new Uint8Array(h,p,m);return f.decodeGltfBufferAsync?f.decodeGltfBufferAsync(g,_,x,s.mode,s.filter).then(function(T){return T.buffer}):f.ready.then(function(){const T=new ArrayBuffer(g*_);return f.decodeGltfBuffer(new Uint8Array(T),g,_,x,s.mode,s.filter),T})})}else return null}}class kT{constructor(e){this.name=yt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,r=t.nodes[e];if(!r.extensions||!r.extensions[this.name]||r.mesh===void 0)return null;const s=t.meshes[r.mesh];for(const m of s.primitives)if(m.mode!==zn.TRIANGLES&&m.mode!==zn.TRIANGLE_STRIP&&m.mode!==zn.TRIANGLE_FAN&&m.mode!==void 0)return null;const f=r.extensions[this.name].attributes,h=[],p={};for(const m in f)h.push(this.parser.getDependency("accessor",f[m]).then(g=>(p[m]=g,p[m])));return h.length<1?null:(h.push(this.parser.createNodeMesh(e)),Promise.all(h).then(m=>{const g=m.pop(),_=g.isGroup?g.children:[g],x=m[0].count,T=[];for(const A of _){const w=new xt,M=new Y,S=new tr,I=new Y(1,1,1),R=new HM(A.geometry,A.material,x);for(let N=0;N<x;N++)p.TRANSLATION&&M.fromBufferAttribute(p.TRANSLATION,N),p.ROTATION&&S.fromBufferAttribute(p.ROTATION,N),p.SCALE&&I.fromBufferAttribute(p.SCALE,N),R.setMatrixAt(N,w.compose(M,S,I));for(const N in p)if(N==="_COLOR_0"){const W=p[N];R.instanceColor=new eu(W.array,W.itemSize,W.normalized)}else N!=="TRANSLATION"&&N!=="ROTATION"&&N!=="SCALE"&&A.geometry.setAttribute(N,p[N]);kt.prototype.copy.call(R,A),this.parser.assignFinalMaterial(R),T.push(R)}return g.isGroup?(g.clear(),g.add(...T),g):T[0]}))}}const im="glTF",Ta=12,cp={JSON:1313821514,BIN:5130562};class HT{constructor(e){this.name=yt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ta),r=new TextDecoder;if(this.header={magic:r.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==im)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Ta,c=new DataView(e,Ta);let f=0;for(;f<s;){const h=c.getUint32(f,!0);f+=4;const p=c.getUint32(f,!0);if(f+=4,p===cp.JSON){const m=new Uint8Array(e,Ta+f,h);this.content=r.decode(m)}else if(p===cp.BIN){const m=Ta+f;this.body=e.slice(m,m+h)}f+=h}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class zT{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=yt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const r=this.json,s=this.dracoLoader,c=e.extensions[this.name].bufferView,f=e.extensions[this.name].attributes,h={},p={},m={};for(const g in f){const _=nu[g]||g.toLowerCase();h[_]=f[g]}for(const g in e.attributes){const _=nu[g]||g.toLowerCase();if(f[g]!==void 0){const x=r.accessors[e.attributes[g]],T=Ts[x.componentType];m[_]=T.name,p[_]=x.normalized===!0}}return t.getDependency("bufferView",c).then(function(g){return new Promise(function(_,x){s.decodeDracoFile(g,function(T){for(const A in T.attributes){const w=T.attributes[A],M=p[A];M!==void 0&&(w.normalized=M)}_(T)},h,m,hn,x)})})}}class GT{constructor(){this.name=yt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class WT{constructor(){this.name=yt.KHR_MESH_QUANTIZATION}}class rm extends Oa{constructor(e,t,r,s){super(e,t,r,s)}copySampleValue_(e){const t=this.resultBuffer,r=this.sampleValues,s=this.valueSize,c=e*s*3+s;for(let f=0;f!==s;f++)t[f]=r[c+f];return t}interpolate_(e,t,r,s){const c=this.resultBuffer,f=this.sampleValues,h=this.valueSize,p=h*2,m=h*3,g=s-t,_=(r-t)/g,x=_*_,T=x*_,A=e*m,w=A-m,M=-2*T+3*x,S=T-x,I=1-M,R=S-x+_;for(let N=0;N!==h;N++){const W=f[w+N+h],k=f[w+N+p]*g,B=f[A+N+h],ae=f[A+N]*g;c[N]=I*W+R*k+M*B+S*ae}return c}}const VT=new tr;class XT extends rm{interpolate_(e,t,r,s){const c=super.interpolate_(e,t,r,s);return VT.fromArray(c).normalize().toArray(c),c}}const zn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ts={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},up={9728:fn,9729:Dn,9984:Kc,9985:yp,9986:Vo,9987:wr},fp={33071:Gn,33648:Yo,10497:As},kc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},nu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Ki={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},qT={CUBICSPLINE:void 0,LINEAR:Cs,STEP:Da},Hc={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function YT(l){return l.DefaultMaterial===void 0&&(l.DefaultMaterial=new vu({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Pi})),l.DefaultMaterial}function _r(l,e,t){for(const r in t.extensions)l[r]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[r]=t.extensions[r])}function ji(l,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(l.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function KT(l,e,t){let r=!1,s=!1,c=!1;for(let m=0,g=e.length;m<g;m++){const _=e[m];if(_.POSITION!==void 0&&(r=!0),_.NORMAL!==void 0&&(s=!0),_.COLOR_0!==void 0&&(c=!0),r&&s&&c)break}if(!r&&!s&&!c)return Promise.resolve(l);const f=[],h=[],p=[];for(let m=0,g=e.length;m<g;m++){const _=e[m];if(r){const x=_.POSITION!==void 0?t.getDependency("accessor",_.POSITION):l.attributes.position;f.push(x)}if(s){const x=_.NORMAL!==void 0?t.getDependency("accessor",_.NORMAL):l.attributes.normal;h.push(x)}if(c){const x=_.COLOR_0!==void 0?t.getDependency("accessor",_.COLOR_0):l.attributes.color;p.push(x)}}return Promise.all([Promise.all(f),Promise.all(h),Promise.all(p)]).then(function(m){const g=m[0],_=m[1],x=m[2];return r&&(l.morphAttributes.position=g),s&&(l.morphAttributes.normal=_),c&&(l.morphAttributes.color=x),l.morphTargetsRelative=!0,l})}function jT(l,e){if(l.updateMorphTargets(),e.weights!==void 0)for(let t=0,r=e.weights.length;t<r;t++)l.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(l.morphTargetInfluences.length===t.length){l.morphTargetDictionary={};for(let r=0,s=t.length;r<s;r++)l.morphTargetDictionary[t[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function ZT(l){let e;const t=l.extensions&&l.extensions[yt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+zc(t.attributes):e=l.indices+":"+zc(l.attributes)+":"+l.mode,l.targets!==void 0)for(let r=0,s=l.targets.length;r<s;r++)e+=":"+zc(l.targets[r]);return e}function zc(l){let e="";const t=Object.keys(l).sort();for(let r=0,s=t.length;r<s;r++)e+=t[r]+":"+l[t[r]]+";";return e}function iu(l){switch(l){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function JT(l){return l.search(/\.jpe?g($|\?)/i)>0||l.search(/^data\:image\/jpeg/)===0?"image/jpeg":l.search(/\.webp($|\?)/i)>0||l.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const QT=new xt;class $T{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new MT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let r=!1,s=!1,c=-1;typeof navigator<"u"&&(r=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,s=navigator.userAgent.indexOf("Firefox")>-1,c=s?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||r||s&&c<98?this.textureLoader=new iT(this.options.manager):this.textureLoader=new uT(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new tm(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const r=this,s=this.json,c=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(f){return f._markDefs&&f._markDefs()}),Promise.all(this._invokeAll(function(f){return f.beforeRoot&&f.beforeRoot()})).then(function(){return Promise.all([r.getDependencies("scene"),r.getDependencies("animation"),r.getDependencies("camera")])}).then(function(f){const h={scene:f[0][s.scene||0],scenes:f[0],animations:f[1],cameras:f[2],asset:s.asset,parser:r,userData:{}};return _r(c,h,s),ji(h,s),Promise.all(r._invokeAll(function(p){return p.afterRoot&&p.afterRoot(h)})).then(function(){e(h)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],r=this.json.meshes||[];for(let s=0,c=t.length;s<c;s++){const f=t[s].joints;for(let h=0,p=f.length;h<p;h++)e[f[h]].isBone=!0}for(let s=0,c=e.length;s<c;s++){const f=e[s];f.mesh!==void 0&&(this._addNodeRef(this.meshCache,f.mesh),f.skin!==void 0&&(r[f.mesh].isSkinnedMesh=!0)),f.camera!==void 0&&this._addNodeRef(this.cameraCache,f.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,r){if(e.refs[t]<=1)return r;const s=r.clone(),c=(f,h)=>{const p=this.associations.get(f);p!=null&&this.associations.set(h,p);for(const[m,g]of f.children.entries())c(g,h.children[m])};return c(r,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let r=0;r<t.length;r++){const s=e(t[r]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const r=[];for(let s=0;s<t.length;s++){const c=e(t[s]);c&&r.push(c)}return r}getDependency(e,t){const r=e+":"+t;let s=this.cache.get(r);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(c){return c.loadNode&&c.loadNode(t)});break;case"mesh":s=this._invokeOne(function(c){return c.loadMesh&&c.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(c){return c.loadBufferView&&c.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(c){return c.loadMaterial&&c.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(c){return c.loadTexture&&c.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(c){return c.loadAnimation&&c.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(c){return c!=this&&c.getDependency&&c.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(r,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const r=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(c,f){return r.getDependency(e,f)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],r=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[yt.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(c,f){r.load(Ca.resolveURL(t.uri,s.path),c,void 0,function(){f(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(r){const s=t.byteLength||0,c=t.byteOffset||0;return r.slice(c,c+s)})}loadAccessor(e){const t=this,r=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const f=kc[s.type],h=Ts[s.componentType],p=s.normalized===!0,m=new h(s.count*f);return Promise.resolve(new Rn(m,f,p))}const c=[];return s.bufferView!==void 0?c.push(this.getDependency("bufferView",s.bufferView)):c.push(null),s.sparse!==void 0&&(c.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),c.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(c).then(function(f){const h=f[0],p=kc[s.type],m=Ts[s.componentType],g=m.BYTES_PER_ELEMENT,_=g*p,x=s.byteOffset||0,T=s.bufferView!==void 0?r.bufferViews[s.bufferView].byteStride:void 0,A=s.normalized===!0;let w,M;if(T&&T!==_){const S=Math.floor(x/T),I="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+S+":"+s.count;let R=t.cache.get(I);R||(w=new m(h,S*T,s.count*T/g),R=new NM(w,T/g),t.cache.add(I,R)),M=new hu(R,p,x%T/g,A)}else h===null?w=new m(s.count*p):w=new m(h,x,s.count*p),M=new Rn(w,p,A);if(s.sparse!==void 0){const S=kc.SCALAR,I=Ts[s.sparse.indices.componentType],R=s.sparse.indices.byteOffset||0,N=s.sparse.values.byteOffset||0,W=new I(f[1],R,s.sparse.count*S),k=new m(f[2],N,s.sparse.count*p);h!==null&&(M=new Rn(M.array.slice(),M.itemSize,M.normalized));for(let B=0,ae=W.length;B<ae;B++){const L=W[B];if(M.setX(L,k[B*p]),p>=2&&M.setY(L,k[B*p+1]),p>=3&&M.setZ(L,k[B*p+2]),p>=4&&M.setW(L,k[B*p+3]),p>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return M})}loadTexture(e){const t=this.json,r=this.options,c=t.textures[e].source,f=t.images[c];let h=this.textureLoader;if(f.uri){const p=r.manager.getHandler(f.uri);p!==null&&(h=p)}return this.loadTextureImage(e,c,h)}loadTextureImage(e,t,r){const s=this,c=this.json,f=c.textures[e],h=c.images[t],p=(h.uri||h.bufferView)+":"+f.sampler;if(this.textureCache[p])return this.textureCache[p];const m=this.loadImageSource(t,r).then(function(g){g.flipY=!1,g.name=f.name||h.name||"",g.name===""&&typeof h.uri=="string"&&h.uri.startsWith("data:image/")===!1&&(g.name=h.uri);const x=(c.samplers||{})[f.sampler]||{};return g.magFilter=up[x.magFilter]||Dn,g.minFilter=up[x.minFilter]||wr,g.wrapS=fp[x.wrapS]||As,g.wrapT=fp[x.wrapT]||As,s.associations.set(g,{textures:e}),g}).catch(function(){return null});return this.textureCache[p]=m,m}loadImageSource(e,t){const r=this,s=this.json,c=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(_=>_.clone());const f=s.images[e],h=self.URL||self.webkitURL;let p=f.uri||"",m=!1;if(f.bufferView!==void 0)p=r.getDependency("bufferView",f.bufferView).then(function(_){m=!0;const x=new Blob([_],{type:f.mimeType});return p=h.createObjectURL(x),p});else if(f.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const g=Promise.resolve(p).then(function(_){return new Promise(function(x,T){let A=x;t.isImageBitmapLoader===!0&&(A=function(w){const M=new mn(w);M.needsUpdate=!0,x(M)}),t.load(Ca.resolveURL(_,c.path),A,void 0,T)})}).then(function(_){return m===!0&&h.revokeObjectURL(p),_.userData.mimeType=f.mimeType||JT(f.uri),_}).catch(function(_){throw console.error("THREE.GLTFLoader: Couldn't load texture",p),_});return this.sourceCache[e]=g,g}assignTexture(e,t,r,s){const c=this;return this.getDependency("texture",r.index).then(function(f){if(!f)return null;if(r.texCoord!==void 0&&r.texCoord>0&&(f=f.clone(),f.channel=r.texCoord),c.extensions[yt.KHR_TEXTURE_TRANSFORM]){const h=r.extensions!==void 0?r.extensions[yt.KHR_TEXTURE_TRANSFORM]:void 0;if(h){const p=c.associations.get(f);f=c.extensions[yt.KHR_TEXTURE_TRANSFORM].extendTexture(f,h),c.associations.set(f,p)}}return s!==void 0&&(f.colorSpace=s),e[t]=f,f})}assignFinalMaterial(e){const t=e.geometry;let r=e.material;const s=t.attributes.tangent===void 0,c=t.attributes.color!==void 0,f=t.attributes.normal===void 0;if(e.isPoints){const h="PointsMaterial:"+r.uuid;let p=this.cache.get(h);p||(p=new Qp,Xn.prototype.copy.call(p,r),p.color.copy(r.color),p.map=r.map,p.sizeAttenuation=!1,this.cache.add(h,p)),r=p}else if(e.isLine){const h="LineBasicMaterial:"+r.uuid;let p=this.cache.get(h);p||(p=new Jp,Xn.prototype.copy.call(p,r),p.color.copy(r.color),p.map=r.map,this.cache.add(h,p)),r=p}if(s||c||f){let h="ClonedMaterial:"+r.uuid+":";s&&(h+="derivative-tangents:"),c&&(h+="vertex-colors:"),f&&(h+="flat-shading:");let p=this.cache.get(h);p||(p=r.clone(),c&&(p.vertexColors=!0),f&&(p.flatShading=!0),s&&(p.normalScale&&(p.normalScale.y*=-1),p.clearcoatNormalScale&&(p.clearcoatNormalScale.y*=-1)),this.cache.add(h,p),this.associations.set(p,this.associations.get(r))),r=p}e.material=r}getMaterialType(){return vu}loadMaterial(e){const t=this,r=this.json,s=this.extensions,c=r.materials[e];let f;const h={},p=c.extensions||{},m=[];if(p[yt.KHR_MATERIALS_UNLIT]){const _=s[yt.KHR_MATERIALS_UNLIT];f=_.getMaterialType(),m.push(_.extendParams(h,c,t))}else{const _=c.pbrMetallicRoughness||{};if(h.color=new Qe(1,1,1),h.opacity=1,Array.isArray(_.baseColorFactor)){const x=_.baseColorFactor;h.color.setRGB(x[0],x[1],x[2],hn),h.opacity=x[3]}_.baseColorTexture!==void 0&&m.push(t.assignTexture(h,"map",_.baseColorTexture,Wt)),h.metalness=_.metallicFactor!==void 0?_.metallicFactor:1,h.roughness=_.roughnessFactor!==void 0?_.roughnessFactor:1,_.metallicRoughnessTexture!==void 0&&(m.push(t.assignTexture(h,"metalnessMap",_.metallicRoughnessTexture)),m.push(t.assignTexture(h,"roughnessMap",_.metallicRoughnessTexture))),f=this._invokeOne(function(x){return x.getMaterialType&&x.getMaterialType(e)}),m.push(Promise.all(this._invokeAll(function(x){return x.extendMaterialParams&&x.extendMaterialParams(e,h)})))}c.doubleSided===!0&&(h.side=li);const g=c.alphaMode||Hc.OPAQUE;if(g===Hc.BLEND?(h.transparent=!0,h.depthWrite=!1):(h.transparent=!1,g===Hc.MASK&&(h.alphaTest=c.alphaCutoff!==void 0?c.alphaCutoff:.5)),c.normalTexture!==void 0&&f!==Tr&&(m.push(t.assignTexture(h,"normalMap",c.normalTexture)),h.normalScale=new _t(1,1),c.normalTexture.scale!==void 0)){const _=c.normalTexture.scale;h.normalScale.set(_,_)}if(c.occlusionTexture!==void 0&&f!==Tr&&(m.push(t.assignTexture(h,"aoMap",c.occlusionTexture)),c.occlusionTexture.strength!==void 0&&(h.aoMapIntensity=c.occlusionTexture.strength)),c.emissiveFactor!==void 0&&f!==Tr){const _=c.emissiveFactor;h.emissive=new Qe().setRGB(_[0],_[1],_[2],hn)}return c.emissiveTexture!==void 0&&f!==Tr&&m.push(t.assignTexture(h,"emissiveMap",c.emissiveTexture,Wt)),Promise.all(m).then(function(){const _=new f(h);return c.name&&(_.name=c.name),ji(_,c),t.associations.set(_,{materials:e}),c.extensions&&_r(s,_,c),_})}createUniqueName(e){const t=wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,r=this.extensions,s=this.primitiveCache;function c(h){return r[yt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(h,t).then(function(p){return hp(p,h,t)})}const f=[];for(let h=0,p=e.length;h<p;h++){const m=e[h],g=ZT(m),_=s[g];if(_)f.push(_.promise);else{let x;m.extensions&&m.extensions[yt.KHR_DRACO_MESH_COMPRESSION]?x=c(m):x=hp(new ni,m,t),s[g]={primitive:m,promise:x},f.push(x)}}return Promise.all(f)}loadMesh(e){const t=this,r=this.json,s=this.extensions,c=r.meshes[e],f=c.primitives,h=[];for(let p=0,m=f.length;p<m;p++){const g=f[p].material===void 0?YT(this.cache):this.getDependency("material",f[p].material);h.push(g)}return h.push(t.loadGeometries(f)),Promise.all(h).then(function(p){const m=p.slice(0,p.length-1),g=p[p.length-1],_=[];for(let T=0,A=g.length;T<A;T++){const w=g[T],M=f[T];let S;const I=m[T];if(M.mode===zn.TRIANGLES||M.mode===zn.TRIANGLE_STRIP||M.mode===zn.TRIANGLE_FAN||M.mode===void 0)S=c.isSkinnedMesh===!0?new OM(w,I):new Cn(w,I),S.isSkinnedMesh===!0&&S.normalizeSkinWeights(),M.mode===zn.TRIANGLE_STRIP?S.geometry=lp(S.geometry,Cp):M.mode===zn.TRIANGLE_FAN&&(S.geometry=lp(S.geometry,jc));else if(M.mode===zn.LINES)S=new zM(w,I);else if(M.mode===zn.LINE_STRIP)S=new pu(w,I);else if(M.mode===zn.LINE_LOOP)S=new GM(w,I);else if(M.mode===zn.POINTS)S=new WM(w,I);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+M.mode);Object.keys(S.geometry.morphAttributes).length>0&&jT(S,c),S.name=t.createUniqueName(c.name||"mesh_"+e),ji(S,c),M.extensions&&_r(s,S,M),t.assignFinalMaterial(S),_.push(S)}for(let T=0,A=_.length;T<A;T++)t.associations.set(_[T],{meshes:e,primitives:T});if(_.length===1)return c.extensions&&_r(s,_[0],c),_[0];const x=new Ri;c.extensions&&_r(s,x,c),t.associations.set(x,{meshes:e});for(let T=0,A=_.length;T<A;T++)x.add(_[T]);return x})}loadCamera(e){let t;const r=this.json.cameras[e],s=r[r.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return r.type==="perspective"?t=new In(A0.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):r.type==="orthographic"&&(t=new sl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),r.name&&(t.name=this.createUniqueName(r.name)),ji(t,r),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],r=[];for(let s=0,c=t.joints.length;s<c;s++)r.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?r.push(this.getDependency("accessor",t.inverseBindMatrices)):r.push(null),Promise.all(r).then(function(s){const c=s.pop(),f=s,h=[],p=[];for(let m=0,g=f.length;m<g;m++){const _=f[m];if(_){h.push(_);const x=new xt;c!==null&&x.fromArray(c.array,m*16),p.push(x)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[m])}return new du(h,p)})}loadAnimation(e){const t=this.json,r=this,s=t.animations[e],c=s.name?s.name:"animation_"+e,f=[],h=[],p=[],m=[],g=[];for(let _=0,x=s.channels.length;_<x;_++){const T=s.channels[_],A=s.samplers[T.sampler],w=T.target,M=w.node,S=s.parameters!==void 0?s.parameters[A.input]:A.input,I=s.parameters!==void 0?s.parameters[A.output]:A.output;w.node!==void 0&&(f.push(this.getDependency("node",M)),h.push(this.getDependency("accessor",S)),p.push(this.getDependency("accessor",I)),m.push(A),g.push(w))}return Promise.all([Promise.all(f),Promise.all(h),Promise.all(p),Promise.all(m),Promise.all(g)]).then(function(_){const x=_[0],T=_[1],A=_[2],w=_[3],M=_[4],S=[];for(let I=0,R=x.length;I<R;I++){const N=x[I],W=T[I],k=A[I],B=w[I],ae=M[I];if(N===void 0)continue;N.updateMatrix&&N.updateMatrix();const L=r._createAnimationTracks(N,W,k,B,ae);if(L)for(let O=0;O<L.length;O++)S.push(L[O])}return new ZM(c,void 0,S)})}createNodeMesh(e){const t=this.json,r=this,s=t.nodes[e];return s.mesh===void 0?null:r.getDependency("mesh",s.mesh).then(function(c){const f=r._getNodeRef(r.meshCache,s.mesh,c);return s.weights!==void 0&&f.traverse(function(h){if(h.isMesh)for(let p=0,m=s.weights.length;p<m;p++)h.morphTargetInfluences[p]=s.weights[p]}),f})}loadNode(e){const t=this.json,r=this,s=t.nodes[e],c=r._loadNodeShallow(e),f=[],h=s.children||[];for(let m=0,g=h.length;m<g;m++)f.push(r.getDependency("node",h[m]));const p=s.skin===void 0?Promise.resolve(null):r.getDependency("skin",s.skin);return Promise.all([c,Promise.all(f),p]).then(function(m){const g=m[0],_=m[1],x=m[2];x!==null&&g.traverse(function(T){T.isSkinnedMesh&&T.bind(x,QT)});for(let T=0,A=_.length;T<A;T++)g.add(_[T]);return g})}_loadNodeShallow(e){const t=this.json,r=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const c=t.nodes[e],f=c.name?s.createUniqueName(c.name):"",h=[],p=s._invokeOne(function(m){return m.createNodeMesh&&m.createNodeMesh(e)});return p&&h.push(p),c.camera!==void 0&&h.push(s.getDependency("camera",c.camera).then(function(m){return s._getNodeRef(s.cameraCache,c.camera,m)})),s._invokeAll(function(m){return m.createNodeAttachment&&m.createNodeAttachment(e)}).forEach(function(m){h.push(m)}),this.nodeCache[e]=Promise.all(h).then(function(m){let g;if(c.isBone===!0?g=new Zp:m.length>1?g=new Ri:m.length===1?g=m[0]:g=new kt,g!==m[0])for(let _=0,x=m.length;_<x;_++)g.add(m[_]);if(c.name&&(g.userData.name=c.name,g.name=f),ji(g,c),c.extensions&&_r(r,g,c),c.matrix!==void 0){const _=new xt;_.fromArray(c.matrix),g.applyMatrix4(_)}else c.translation!==void 0&&g.position.fromArray(c.translation),c.rotation!==void 0&&g.quaternion.fromArray(c.rotation),c.scale!==void 0&&g.scale.fromArray(c.scale);return s.associations.has(g)||s.associations.set(g,{}),s.associations.get(g).nodes=e,g}),this.nodeCache[e]}loadScene(e){const t=this.extensions,r=this.json.scenes[e],s=this,c=new Ri;r.name&&(c.name=s.createUniqueName(r.name)),ji(c,r),r.extensions&&_r(t,c,r);const f=r.nodes||[],h=[];for(let p=0,m=f.length;p<m;p++)h.push(s.getDependency("node",f[p]));return Promise.all(h).then(function(p){for(let g=0,_=p.length;g<_;g++)c.add(p[g]);const m=g=>{const _=new Map;for(const[x,T]of s.associations)(x instanceof Xn||x instanceof mn)&&_.set(x,T);return g.traverse(x=>{const T=s.associations.get(x);T!=null&&_.set(x,T)}),_};return s.associations=m(c),c})}_createAnimationTracks(e,t,r,s,c){const f=[],h=e.name?e.name:e.uuid,p=[];Ki[c.path]===Ki.weights?e.traverse(function(x){x.morphTargetInfluences&&p.push(x.name?x.name:x.uuid)}):p.push(h);let m;switch(Ki[c.path]){case Ki.weights:m=Ps;break;case Ki.rotation:m=Lr;break;case Ki.position:case Ki.scale:m=Ds;break;default:switch(r.itemSize){case 1:m=Ps;break;case 2:case 3:default:m=Ds;break}break}const g=s.interpolation!==void 0?qT[s.interpolation]:Cs,_=this._getArrayFromAccessor(r);for(let x=0,T=p.length;x<T;x++){const A=new m(p[x]+"."+Ki[c.path],t.array,_,g);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(A),f.push(A)}return f}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const r=iu(t.constructor),s=new Float32Array(t.length);for(let c=0,f=t.length;c<f;c++)s[c]=t[c]*r;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(r){const s=this instanceof Lr?XT:rm;return new s(this.times,this.values,this.getValueSize()/3,r)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function eb(l,e,t){const r=e.attributes,s=new Di;if(r.POSITION!==void 0){const h=t.json.accessors[r.POSITION],p=h.min,m=h.max;if(p!==void 0&&m!==void 0){if(s.set(new Y(p[0],p[1],p[2]),new Y(m[0],m[1],m[2])),h.normalized){const g=iu(Ts[h.componentType]);s.min.multiplyScalar(g),s.max.multiplyScalar(g)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const c=e.targets;if(c!==void 0){const h=new Y,p=new Y;for(let m=0,g=c.length;m<g;m++){const _=c[m];if(_.POSITION!==void 0){const x=t.json.accessors[_.POSITION],T=x.min,A=x.max;if(T!==void 0&&A!==void 0){if(p.setX(Math.max(Math.abs(T[0]),Math.abs(A[0]))),p.setY(Math.max(Math.abs(T[1]),Math.abs(A[1]))),p.setZ(Math.max(Math.abs(T[2]),Math.abs(A[2]))),x.normalized){const w=iu(Ts[x.componentType]);p.multiplyScalar(w)}h.max(p)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(h)}l.boundingBox=s;const f=new ui;s.getCenter(f.center),f.radius=s.min.distanceTo(s.max)/2,l.boundingSphere=f}function hp(l,e,t){const r=e.attributes,s=[];function c(f,h){return t.getDependency("accessor",f).then(function(p){l.setAttribute(h,p)})}for(const f in r){const h=nu[f]||f.toLowerCase();h in l.attributes||s.push(c(r[f],h))}if(e.indices!==void 0&&!l.index){const f=t.getDependency("accessor",e.indices).then(function(h){l.setIndex(h)});s.push(f)}return At.workingColorSpace!==hn&&"COLOR_0"in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${At.workingColorSpace}" not supported.`),ji(l,e),eb(l,e,t),Promise.all(s).then(function(){return e.targets!==void 0?KT(l,e.targets,t):l})}class Ra{constructor(){if(Ra.instance)return Ra.instance;Ra.instance=this,this.loader=new ST,this.assets={},this.isLoaded=!1}async loadAll(){if(this.isLoaded)return;const t=Object.entries({tree:"./assets/Tree_1_A_Color1.gltf",deadTree:"./assets/Tree_Bare_1_A_Color1.gltf",rock:"./assets/Rock_1_A_Color1.gltf",bush:"./assets/Bush_1_A_Color1.gltf"}).map(([r,s])=>this.loadModel(r,s));try{await Promise.all(t),this.isLoaded=!0,console.log("All assets loaded:",Object.keys(this.assets))}catch(r){throw console.error("Error loading assets:",r),r}}loadModel(e,t){return new Promise((r,s)=>{this.loader.load(t,c=>{const f=c.scene;f.traverse(h=>{h.isMesh&&(h.castShadow=!0,h.receiveShadow=!0,h.material&&(h.material=h.material.clone(),h.material.transparent=!0,h.material.opacity=.7))}),this.assets[e]=f,r(f)},void 0,c=>{console.error(`Failed to load ${e} from ${t}`,c),s(c)})})}get(e){return this.assets[e]?this.assets[e].clone():(console.warn(`Asset '${e}' request but not found.`),null)}}const ru=new Ra;var tb=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function nb(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var Gc={exports:{}},dp;function sm(){return dp||(dp=1,function(l,e){(function(t,r){l.exports=r()})(tb,function(){var t=navigator.userAgent,r=navigator.platform,s=/gecko\/\d/i.test(t),c=/MSIE \d/.test(t),f=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(t),h=/Edge\/(\d+)/.exec(t),p=c||f||h,m=p&&(c?document.documentMode||6:+(h||f)[1]),g=!h&&/WebKit\//.test(t),_=g&&/Qt\/\d+\.\d+/.test(t),x=!h&&/Chrome\/(\d+)/.exec(t),T=x&&+x[1],A=/Opera\//.test(t),w=/Apple Computer/.test(navigator.vendor),M=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(t),S=/PhantomJS/.test(t),I=w&&(/Mobile\/\w+/.test(t)||navigator.maxTouchPoints>2),R=/Android/.test(t),N=I||R||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(t),W=I||/Mac/.test(r),k=/\bCrOS\b/.test(t),B=/win/i.test(r),ae=A&&t.match(/Version\/(\d*\.\d*)/);ae&&(ae=Number(ae[1])),ae&&ae>=15&&(A=!1,g=!0);var L=W&&(_||A&&(ae==null||ae<12.11)),O=s||p&&m>=9;function se(n){return new RegExp("(^|\\s)"+n+"(?:$|\\s)\\s*")}var oe=function(n,i){var o=n.className,a=se(i).exec(o);if(a){var u=o.slice(a.index+a[0].length);n.className=o.slice(0,a.index)+(u?a[1]+u:"")}};function pe(n){for(var i=n.childNodes.length;i>0;--i)n.removeChild(n.firstChild);return n}function V(n,i){return pe(n).appendChild(i)}function X(n,i,o,a){var u=document.createElement(n);if(o&&(u.className=o),a&&(u.style.cssText=a),typeof i=="string")u.appendChild(document.createTextNode(i));else if(i)for(var d=0;d<i.length;++d)u.appendChild(i[d]);return u}function H(n,i,o,a){var u=X(n,i,o,a);return u.setAttribute("role","presentation"),u}var K;document.createRange?K=function(n,i,o,a){var u=document.createRange();return u.setEnd(a||n,o),u.setStart(n,i),u}:K=function(n,i,o){var a=document.body.createTextRange();try{a.moveToElementText(n.parentNode)}catch{return a}return a.collapse(!0),a.moveEnd("character",o),a.moveStart("character",i),a};function Q(n,i){if(i.nodeType==3&&(i=i.parentNode),n.contains)return n.contains(i);do if(i.nodeType==11&&(i=i.host),i==n)return!0;while(i=i.parentNode)}function Z(n){var i=n.ownerDocument||n,o;try{o=n.activeElement}catch{o=i.body||null}for(;o&&o.shadowRoot&&o.shadowRoot.activeElement;)o=o.shadowRoot.activeElement;return o}function le(n,i){var o=n.className;se(i).test(o)||(n.className+=(o?" ":"")+i)}function de(n,i){for(var o=n.split(" "),a=0;a<o.length;a++)o[a]&&!se(o[a]).test(i)&&(i+=" "+o[a]);return i}var fe=function(n){n.select()};I?fe=function(n){n.selectionStart=0,n.selectionEnd=n.value.length}:p&&(fe=function(n){try{n.select()}catch{}});function ie(n){return n.display.wrapper.ownerDocument}function he(n){return we(n.display.wrapper)}function we(n){return n.getRootNode?n.getRootNode():n.ownerDocument}function Ge(n){return ie(n).defaultView}function We(n){var i=Array.prototype.slice.call(arguments,1);return function(){return n.apply(null,i)}}function nt(n,i,o){i||(i={});for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(o!==!1||!Object.prototype.hasOwnProperty.call(i,a))&&(i[a]=n[a]);return i}function je(n,i,o,a,u){i==null&&(i=n.search(/[^\s\u00a0]/),i==-1&&(i=n.length));for(var d=a||0,v=u||0;;){var y=n.indexOf("	",d);if(y<0||y>=i)return v+(i-d);v+=y-d,v+=o-v%o,d=y+1}}var Ye=function(){this.id=null,this.f=null,this.time=0,this.handler=We(this.onTimeout,this)};Ye.prototype.onTimeout=function(n){n.id=0,n.time<=+new Date?n.f():setTimeout(n.handler,n.time-+new Date)},Ye.prototype.set=function(n,i){this.f=i;var o=+new Date+n;(!this.id||o<this.time)&&(clearTimeout(this.id),this.id=setTimeout(this.handler,n),this.time=o)};function Je(n,i){for(var o=0;o<n.length;++o)if(n[o]==i)return o;return-1}var ee=50,jt={toString:function(){return"CodeMirror.Pass"}},ke={scroll:!1},rt={origin:"*mouse"},Oe={origin:"+move"};function Lt(n,i,o){for(var a=0,u=0;;){var d=n.indexOf("	",a);d==-1&&(d=n.length);var v=d-a;if(d==n.length||u+v>=i)return a+Math.min(v,i-u);if(u+=d-a,u+=o-u%o,a=d+1,u>=i)return a}}var lt=[""];function U(n){for(;lt.length<=n;)lt.push(C(lt)+" ");return lt[n]}function C(n){return n[n.length-1]}function $(n,i){for(var o=[],a=0;a<n.length;a++)o[a]=i(n[a],a);return o}function ye(n,i,o){for(var a=0,u=o(i);a<n.length&&o(n[a])<=u;)a++;n.splice(a,0,i)}function ve(){}function Se(n,i){var o;return Object.create?o=Object.create(n):(ve.prototype=n,o=new ve),i&&nt(i,o),o}var Ve=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;function Le(n){return/\w/.test(n)||n>""&&(n.toUpperCase()!=n.toLowerCase()||Ve.test(n))}function Ne(n,i){return i?i.source.indexOf("\\w")>-1&&Le(n)?!0:i.test(n):Le(n)}function $e(n){for(var i in n)if(n.hasOwnProperty(i)&&n[i])return!1;return!0}var pt=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;function me(n){return n.charCodeAt(0)>=768&&pt.test(n)}function bt(n,i,o){for(;(o<0?i>0:i<n.length)&&me(n.charAt(i));)i+=o;return i}function ct(n,i,o){for(var a=i>o?-1:1;;){if(i==o)return i;var u=(i+o)/2,d=a<0?Math.ceil(u):Math.floor(u);if(d==i)return n(d)?i:o;n(d)?o=d:i=d+a}}function at(n,i,o,a){if(!n)return a(i,o,"ltr",0);for(var u=!1,d=0;d<n.length;++d){var v=n[d];(v.from<o&&v.to>i||i==o&&v.to==i)&&(a(Math.max(v.from,i),Math.min(v.to,o),v.level==1?"rtl":"ltr",d),u=!0)}u||a(i,o,"ltr")}var Xe=null;function Ie(n,i,o){var a;Xe=null;for(var u=0;u<n.length;++u){var d=n[u];if(d.from<i&&d.to>i)return u;d.to==i&&(d.from!=d.to&&o=="before"?a=u:Xe=u),d.from==i&&(d.from!=d.to&&o!="before"?a=u:Xe=u)}return a??Xe}var ft=function(){var n="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",i="nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";function o(E){return E<=247?n.charAt(E):1424<=E&&E<=1524?"R":1536<=E&&E<=1785?i.charAt(E-1536):1774<=E&&E<=2220?"r":8192<=E&&E<=8203?"w":E==8204?"b":"L"}var a=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,u=/[stwN]/,d=/[LRr]/,v=/[Lb1n]/,y=/[1n]/;function b(E,D,F){this.level=E,this.from=D,this.to=F}return function(E,D){var F=D=="ltr"?"L":"R";if(E.length==0||D=="ltr"&&!a.test(E))return!1;for(var q=E.length,G=[],ne=0;ne<q;++ne)G.push(o(E.charCodeAt(ne)));for(var ce=0,ge=F;ce<q;++ce){var Te=G[ce];Te=="m"?G[ce]=ge:ge=Te}for(var Ce=0,be=F;Ce<q;++Ce){var Pe=G[Ce];Pe=="1"&&be=="r"?G[Ce]="n":d.test(Pe)&&(be=Pe,Pe=="r"&&(G[Ce]="R"))}for(var qe=1,ze=G[0];qe<q-1;++qe){var dt=G[qe];dt=="+"&&ze=="1"&&G[qe+1]=="1"?G[qe]="1":dt==","&&ze==G[qe+1]&&(ze=="1"||ze=="n")&&(G[qe]=ze),ze=dt}for(var Ct=0;Ct<q;++Ct){var sn=G[Ct];if(sn==",")G[Ct]="N";else if(sn=="%"){var Ft=void 0;for(Ft=Ct+1;Ft<q&&G[Ft]=="%";++Ft);for(var Pn=Ct&&G[Ct-1]=="!"||Ft<q&&G[Ft]=="1"?"1":"N",Tn=Ct;Tn<Ft;++Tn)G[Tn]=Pn;Ct=Ft-1}}for(var Yt=0,bn=F;Yt<q;++Yt){var cn=G[Yt];bn=="L"&&cn=="1"?G[Yt]="L":d.test(cn)&&(bn=cn)}for(var Jt=0;Jt<q;++Jt)if(u.test(G[Jt])){var Kt=void 0;for(Kt=Jt+1;Kt<q&&u.test(G[Kt]);++Kt);for(var Bt=(Jt?G[Jt-1]:F)=="L",En=(Kt<q?G[Kt]:F)=="L",es=Bt==En?Bt?"L":"R":F,Gi=Jt;Gi<Kt;++Gi)G[Gi]=es;Jt=Kt-1}for(var pn=[],ai,an=0;an<q;)if(v.test(G[an])){var nc=an;for(++an;an<q&&v.test(G[an]);++an);pn.push(new b(0,nc,an))}else{var xi=an,hr=pn.length,dr=D=="rtl"?1:0;for(++an;an<q&&G[an]!="L";++an);for(var vn=xi;vn<an;)if(y.test(G[vn])){xi<vn&&(pn.splice(hr,0,new b(1,xi,vn)),hr+=dr);var ts=vn;for(++vn;vn<an&&y.test(G[vn]);++vn);pn.splice(hr,0,new b(2,ts,vn)),hr+=dr,xi=vn}else++vn;xi<an&&pn.splice(hr,0,new b(1,xi,an))}return D=="ltr"&&(pn[0].level==1&&(ai=E.match(/^\s+/))&&(pn[0].from=ai[0].length,pn.unshift(new b(0,0,ai[0].length))),C(pn).level==1&&(ai=E.match(/\s+$/))&&(C(pn).to-=ai[0].length,pn.push(new b(0,q-ai[0].length,q)))),D=="rtl"?pn.reverse():pn}}();function gt(n,i){var o=n.order;return o==null&&(o=n.order=ft(n.text,i)),o}var Nt=[],Me=function(n,i,o){if(n.addEventListener)n.addEventListener(i,o,!1);else if(n.attachEvent)n.attachEvent("on"+i,o);else{var a=n._handlers||(n._handlers={});a[i]=(a[i]||Nt).concat(o)}};function Ee(n,i){return n._handlers&&n._handlers[i]||Nt}function z(n,i,o){if(n.removeEventListener)n.removeEventListener(i,o,!1);else if(n.detachEvent)n.detachEvent("on"+i,o);else{var a=n._handlers,u=a&&a[i];if(u){var d=Je(u,o);d>-1&&(a[i]=u.slice(0,d).concat(u.slice(d+1)))}}}function _e(n,i){var o=Ee(n,i);if(o.length)for(var a=Array.prototype.slice.call(arguments,2),u=0;u<o.length;++u)o[u].apply(null,a)}function xe(n,i,o){return typeof i=="string"&&(i={type:i,preventDefault:function(){this.defaultPrevented=!0}}),_e(n,o||i.type,n,i),$t(i)||i.codemirrorIgnore}function it(n){var i=n._handlers&&n._handlers.cursorActivity;if(i)for(var o=n.curOp.cursorActivityHandlers||(n.curOp.cursorActivityHandlers=[]),a=0;a<i.length;++a)Je(o,i[a])==-1&&o.push(i[a])}function Fe(n,i){return Ee(n,i).length>0}function St(n){n.prototype.on=function(i,o){Me(this,i,o)},n.prototype.off=function(i,o){z(this,i,o)}}function ht(n){n.preventDefault?n.preventDefault():n.returnValue=!1}function Vt(n){n.stopPropagation?n.stopPropagation():n.cancelBubble=!0}function $t(n){return n.defaultPrevented!=null?n.defaultPrevented:n.returnValue==!1}function Mt(n){ht(n),Vt(n)}function en(n){return n.target||n.srcElement}function Un(n){var i=n.which;return i==null&&(n.button&1?i=1:n.button&2?i=3:n.button&4&&(i=2)),W&&n.ctrlKey&&i==1&&(i=3),i}var Fa=function(){if(p&&m<9)return!1;var n=X("div");return"draggable"in n||"dragDrop"in n}(),Hs;function Dr(n){if(Hs==null){var i=X("span","​");V(n,X("span",[i,document.createTextNode("x")])),n.firstChild.offsetHeight!=0&&(Hs=i.offsetWidth<=1&&i.offsetHeight>2&&!(p&&m<8))}var o=Hs?X("span","​"):X("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return o.setAttribute("cm-text",""),o}var Ir;function Nr(n){if(Ir!=null)return Ir;var i=V(n,document.createTextNode("AخA")),o=K(i,0,1).getBoundingClientRect(),a=K(i,1,2).getBoundingClientRect();return pe(n),!o||o.left==o.right?!1:Ir=a.right-o.right<3}var Ur=`

b`.split(/\n/).length!=3?function(n){for(var i=0,o=[],a=n.length;i<=a;){var u=n.indexOf(`
`,i);u==-1&&(u=n.length);var d=n.slice(i,n.charAt(u-1)=="\r"?u-1:u),v=d.indexOf("\r");v!=-1?(o.push(d.slice(0,v)),i+=v+1):(o.push(d),i=u+1)}return o}:function(n){return n.split(/\r\n?|\n/)},Ba=window.getSelection?function(n){try{return n.selectionStart!=n.selectionEnd}catch{return!1}}:function(n){var i;try{i=n.ownerDocument.selection.createRange()}catch{}return!i||i.parentElement()!=n?!1:i.compareEndPoints("StartToEnd",i)!=0},cl=function(){var n=X("div");return"oncopy"in n?!0:(n.setAttribute("oncopy","return;"),typeof n.oncopy=="function")}(),zs=null;function ul(n){if(zs!=null)return zs;var i=V(n,X("span","x")),o=i.getBoundingClientRect(),a=K(i,0,1).getBoundingClientRect();return zs=Math.abs(o.left-a.left)>1}var P={},j={};function te(n,i){arguments.length>2&&(i.dependencies=Array.prototype.slice.call(arguments,2)),P[n]=i}function re(n,i){j[n]=i}function J(n){if(typeof n=="string"&&j.hasOwnProperty(n))n=j[n];else if(n&&typeof n.name=="string"&&j.hasOwnProperty(n.name)){var i=j[n.name];typeof i=="string"&&(i={name:i}),n=Se(i,n),n.name=i.name}else{if(typeof n=="string"&&/^[\w\-]+\/[\w\-]+\+xml$/.test(n))return J("application/xml");if(typeof n=="string"&&/^[\w\-]+\/[\w\-]+\+json$/.test(n))return J("application/json")}return typeof n=="string"?{name:n}:n||{name:"null"}}function De(n,i){i=J(i);var o=P[i.name];if(!o)return De(n,"text/plain");var a=o(n,i);if(Be.hasOwnProperty(i.name)){var u=Be[i.name];for(var d in u)u.hasOwnProperty(d)&&(a.hasOwnProperty(d)&&(a["_"+d]=a[d]),a[d]=u[d])}if(a.name=i.name,i.helperType&&(a.helperType=i.helperType),i.modeProps)for(var v in i.modeProps)a[v]=i.modeProps[v];return a}var Be={};function et(n,i){var o=Be.hasOwnProperty(n)?Be[n]:Be[n]={};nt(i,o)}function Ze(n,i){if(i===!0)return i;if(n.copyState)return n.copyState(i);var o={};for(var a in i){var u=i[a];u instanceof Array&&(u=u.concat([])),o[a]=u}return o}function ut(n,i){for(var o;n.innerMode&&(o=n.innerMode(i),!(!o||o.mode==n));)i=o.state,n=o.mode;return o||{mode:n,state:i}}function ot(n,i,o){return n.startState?n.startState(i,o):!0}var Ue=function(n,i,o){this.pos=this.start=0,this.string=n,this.tabSize=i||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=o};Ue.prototype.eol=function(){return this.pos>=this.string.length},Ue.prototype.sol=function(){return this.pos==this.lineStart},Ue.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},Ue.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},Ue.prototype.eat=function(n){var i=this.string.charAt(this.pos),o;if(typeof n=="string"?o=i==n:o=i&&(n.test?n.test(i):n(i)),o)return++this.pos,i},Ue.prototype.eatWhile=function(n){for(var i=this.pos;this.eat(n););return this.pos>i},Ue.prototype.eatSpace=function(){for(var n=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>n},Ue.prototype.skipToEnd=function(){this.pos=this.string.length},Ue.prototype.skipTo=function(n){var i=this.string.indexOf(n,this.pos);if(i>-1)return this.pos=i,!0},Ue.prototype.backUp=function(n){this.pos-=n},Ue.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=je(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?je(this.string,this.lineStart,this.tabSize):0)},Ue.prototype.indentation=function(){return je(this.string,null,this.tabSize)-(this.lineStart?je(this.string,this.lineStart,this.tabSize):0)},Ue.prototype.match=function(n,i,o){if(typeof n=="string"){var a=function(v){return o?v.toLowerCase():v},u=this.string.substr(this.pos,n.length);if(a(u)==a(n))return i!==!1&&(this.pos+=n.length),!0}else{var d=this.string.slice(this.pos).match(n);return d&&d.index>0?null:(d&&i!==!1&&(this.pos+=d[0].length),d)}},Ue.prototype.current=function(){return this.string.slice(this.start,this.pos)},Ue.prototype.hideFirstChars=function(n,i){this.lineStart+=n;try{return i()}finally{this.lineStart-=n}},Ue.prototype.lookAhead=function(n){var i=this.lineOracle;return i&&i.lookAhead(n)},Ue.prototype.baseToken=function(){var n=this.lineOracle;return n&&n.baseToken(this.pos)};function Ae(n,i){if(i-=n.first,i<0||i>=n.size)throw new Error("There is no line "+(i+n.first)+" in the document.");for(var o=n;!o.lines;)for(var a=0;;++a){var u=o.children[a],d=u.chunkSize();if(i<d){o=u;break}i-=d}return o.lines[i]}function Xt(n,i,o){var a=[],u=i.line;return n.iter(i.line,o.line+1,function(d){var v=d.text;u==o.line&&(v=v.slice(0,o.ch)),u==i.line&&(v=v.slice(i.ch)),a.push(v),++u}),a}function Ht(n,i,o){var a=[];return n.iter(i,o,function(u){a.push(u.text)}),a}function Zt(n,i){var o=i-n.height;if(o)for(var a=n;a;a=a.parent)a.height+=o}function Ke(n){if(n.parent==null)return null;for(var i=n.parent,o=Je(i.lines,n),a=i.parent;a;i=a,a=a.parent)for(var u=0;a.children[u]!=i;++u)o+=a.children[u].chunkSize();return o+i.first}function st(n,i){var o=n.first;e:do{for(var a=0;a<n.children.length;++a){var u=n.children[a],d=u.height;if(i<d){n=u;continue e}i-=d,o+=u.chunkSize()}return o}while(!n.lines);for(var v=0;v<n.lines.length;++v){var y=n.lines[v],b=y.height;if(i<b)break;i-=b}return o+v}function hi(n,i){return i>=n.first&&i<n.first+n.size}function It(n,i){return String(n.lineNumberFormatter(i+n.firstLineNumber))}function ue(n,i,o){if(o===void 0&&(o=null),!(this instanceof ue))return new ue(n,i,o);this.line=n,this.ch=i,this.sticky=o}function tt(n,i){return n.line-i.line||n.ch-i.ch}function di(n,i){return n.sticky==i.sticky&&tt(n,i)==0}function nr(n){return ue(n.line,n.ch)}function qt(n,i){return tt(n,i)<0?i:n}function kn(n,i){return tt(n,i)<0?n:i}function Or(n,i){return Math.max(n.first,Math.min(i,n.first+n.size-1))}function He(n,i){if(i.line<n.first)return ue(n.first,0);var o=n.first+n.size-1;return i.line>o?ue(o,Ae(n,o).text.length):Gs(i,Ae(n,i.line).text.length)}function Gs(n,i){var o=n.ch;return o==null||o>i?ue(n.line,i):o<0?ue(n.line,0):n}function ka(n,i){for(var o=[],a=0;a<i.length;a++)o[a]=He(n,i[a]);return o}var ir=function(n,i){this.state=n,this.lookAhead=i},ii=function(n,i,o,a){this.state=i,this.doc=n,this.line=o,this.maxLookAhead=a||0,this.baseTokens=null,this.baseTokenPos=1};ii.prototype.lookAhead=function(n){var i=this.doc.getLine(this.line+n);return i!=null&&n>this.maxLookAhead&&(this.maxLookAhead=n),i},ii.prototype.baseToken=function(n){if(!this.baseTokens)return null;for(;this.baseTokens[this.baseTokenPos]<=n;)this.baseTokenPos+=2;var i=this.baseTokens[this.baseTokenPos+1];return{type:i&&i.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-n}},ii.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},ii.fromSaved=function(n,i,o){return i instanceof ir?new ii(n,Ze(n.mode,i.state),o,i.lookAhead):new ii(n,Ze(n.mode,i),o)},ii.prototype.save=function(n){var i=n!==!1?Ze(this.doc.mode,this.state):this.state;return this.maxLookAhead>0?new ir(i,this.maxLookAhead):i};function Su(n,i,o,a){var u=[n.state.modeGen],d={};wu(n,i.text,n.doc.mode,o,function(E,D){return u.push(E,D)},d,a);for(var v=o.state,y=function(E){o.baseTokens=u;var D=n.state.overlays[E],F=1,q=0;o.state=!0,wu(n,i.text,D.mode,o,function(G,ne){for(var ce=F;q<G;){var ge=u[F];ge>G&&u.splice(F,1,G,u[F+1],ge),F+=2,q=Math.min(G,ge)}if(ne)if(D.opaque)u.splice(ce,F-ce,G,"overlay "+ne),F=ce+2;else for(;ce<F;ce+=2){var Te=u[ce+1];u[ce+1]=(Te?Te+" ":"")+"overlay "+ne}},d),o.state=v,o.baseTokens=null,o.baseTokenPos=1},b=0;b<n.state.overlays.length;++b)y(b);return{styles:u,classes:d.bgClass||d.textClass?d:null}}function Mu(n,i,o){if(!i.styles||i.styles[0]!=n.state.modeGen){var a=Ws(n,Ke(i)),u=i.text.length>n.options.maxHighlightLength&&Ze(n.doc.mode,a.state),d=Su(n,i,a);u&&(a.state=u),i.stateAfter=a.save(!u),i.styles=d.styles,d.classes?i.styleClasses=d.classes:i.styleClasses&&(i.styleClasses=null),o===n.doc.highlightFrontier&&(n.doc.modeFrontier=Math.max(n.doc.modeFrontier,++n.doc.highlightFrontier))}return i.styles}function Ws(n,i,o){var a=n.doc,u=n.display;if(!a.mode.startState)return new ii(a,!0,i);var d=fm(n,i,o),v=d>a.first&&Ae(a,d-1).stateAfter,y=v?ii.fromSaved(a,v,d):new ii(a,ot(a.mode),d);return a.iter(d,i,function(b){fl(n,b.text,y);var E=y.line;b.stateAfter=E==i-1||E%5==0||E>=u.viewFrom&&E<u.viewTo?y.save():null,y.nextLine()}),o&&(a.modeFrontier=y.line),y}function fl(n,i,o,a){var u=n.doc.mode,d=new Ue(i,n.options.tabSize,o);for(d.start=d.pos=a||0,i==""&&Tu(u,o.state);!d.eol();)hl(u,d,o.state),d.start=d.pos}function Tu(n,i){if(n.blankLine)return n.blankLine(i);if(n.innerMode){var o=ut(n,i);if(o.mode.blankLine)return o.mode.blankLine(o.state)}}function hl(n,i,o,a){for(var u=0;u<10;u++){a&&(a[0]=ut(n,o).mode);var d=n.token(i,o);if(i.pos>i.start)return d}throw new Error("Mode "+n.name+" failed to advance stream.")}var bu=function(n,i,o){this.start=n.start,this.end=n.pos,this.string=n.current(),this.type=i||null,this.state=o};function Eu(n,i,o,a){var u=n.doc,d=u.mode,v;i=He(u,i);var y=Ae(u,i.line),b=Ws(n,i.line,o),E=new Ue(y.text,n.options.tabSize,b),D;for(a&&(D=[]);(a||E.pos<i.ch)&&!E.eol();)E.start=E.pos,v=hl(d,E,b.state),a&&D.push(new bu(E,v,Ze(u.mode,b.state)));return a?D:new bu(E,v,b.state)}function Au(n,i){if(n)for(;;){var o=n.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!o)break;n=n.slice(0,o.index)+n.slice(o.index+o[0].length);var a=o[1]?"bgClass":"textClass";i[a]==null?i[a]=o[2]:new RegExp("(?:^|\\s)"+o[2]+"(?:$|\\s)").test(i[a])||(i[a]+=" "+o[2])}return n}function wu(n,i,o,a,u,d,v){var y=o.flattenSpans;y==null&&(y=n.options.flattenSpans);var b=0,E=null,D=new Ue(i,n.options.tabSize,a),F,q=n.options.addModeClass&&[null];for(i==""&&Au(Tu(o,a.state),d);!D.eol();){if(D.pos>n.options.maxHighlightLength?(y=!1,v&&fl(n,i,a,D.pos),D.pos=i.length,F=null):F=Au(hl(o,D,a.state,q),d),q){var G=q[0].name;G&&(F="m-"+(F?G+" "+F:G))}if(!y||E!=F){for(;b<D.start;)b=Math.min(D.start,b+5e3),u(b,E);E=F}D.start=D.pos}for(;b<D.pos;){var ne=Math.min(D.pos,b+5e3);u(ne,E),b=ne}}function fm(n,i,o){for(var a,u,d=n.doc,v=o?-1:i-(n.doc.mode.innerMode?1e3:100),y=i;y>v;--y){if(y<=d.first)return d.first;var b=Ae(d,y-1),E=b.stateAfter;if(E&&(!o||y+(E instanceof ir?E.lookAhead:0)<=d.modeFrontier))return y;var D=je(b.text,null,n.options.tabSize);(u==null||a>D)&&(u=y-1,a=D)}return u}function hm(n,i){if(n.modeFrontier=Math.min(n.modeFrontier,i),!(n.highlightFrontier<i-10)){for(var o=n.first,a=i-1;a>o;a--){var u=Ae(n,a).stateAfter;if(u&&(!(u instanceof ir)||a+u.lookAhead<i)){o=a+1;break}}n.highlightFrontier=Math.min(n.highlightFrontier,o)}}var Cu=!1,pi=!1;function dm(){Cu=!0}function pm(){pi=!0}function Ha(n,i,o){this.marker=n,this.from=i,this.to=o}function Vs(n,i){if(n)for(var o=0;o<n.length;++o){var a=n[o];if(a.marker==i)return a}}function mm(n,i){for(var o,a=0;a<n.length;++a)n[a]!=i&&(o||(o=[])).push(n[a]);return o}function gm(n,i,o){var a=o&&window.WeakSet&&(o.markedSpans||(o.markedSpans=new WeakSet));a&&n.markedSpans&&a.has(n.markedSpans)?n.markedSpans.push(i):(n.markedSpans=n.markedSpans?n.markedSpans.concat([i]):[i],a&&a.add(n.markedSpans)),i.marker.attachLine(n)}function vm(n,i,o){var a;if(n)for(var u=0;u<n.length;++u){var d=n[u],v=d.marker,y=d.from==null||(v.inclusiveLeft?d.from<=i:d.from<i);if(y||d.from==i&&v.type=="bookmark"&&(!o||!d.marker.insertLeft)){var b=d.to==null||(v.inclusiveRight?d.to>=i:d.to>i);(a||(a=[])).push(new Ha(v,d.from,b?null:d.to))}}return a}function _m(n,i,o){var a;if(n)for(var u=0;u<n.length;++u){var d=n[u],v=d.marker,y=d.to==null||(v.inclusiveRight?d.to>=i:d.to>i);if(y||d.from==i&&v.type=="bookmark"&&(!o||d.marker.insertLeft)){var b=d.from==null||(v.inclusiveLeft?d.from<=i:d.from<i);(a||(a=[])).push(new Ha(v,b?null:d.from-i,d.to==null?null:d.to-i))}}return a}function dl(n,i){if(i.full)return null;var o=hi(n,i.from.line)&&Ae(n,i.from.line).markedSpans,a=hi(n,i.to.line)&&Ae(n,i.to.line).markedSpans;if(!o&&!a)return null;var u=i.from.ch,d=i.to.ch,v=tt(i.from,i.to)==0,y=vm(o,u,v),b=_m(a,d,v),E=i.text.length==1,D=C(i.text).length+(E?u:0);if(y)for(var F=0;F<y.length;++F){var q=y[F];if(q.to==null){var G=Vs(b,q.marker);G?E&&(q.to=G.to==null?null:G.to+D):q.to=u}}if(b)for(var ne=0;ne<b.length;++ne){var ce=b[ne];if(ce.to!=null&&(ce.to+=D),ce.from==null){var ge=Vs(y,ce.marker);ge||(ce.from=D,E&&(y||(y=[])).push(ce))}else ce.from+=D,E&&(y||(y=[])).push(ce)}y&&(y=Ru(y)),b&&b!=y&&(b=Ru(b));var Te=[y];if(!E){var Ce=i.text.length-2,be;if(Ce>0&&y)for(var Pe=0;Pe<y.length;++Pe)y[Pe].to==null&&(be||(be=[])).push(new Ha(y[Pe].marker,null,null));for(var qe=0;qe<Ce;++qe)Te.push(be);Te.push(b)}return Te}function Ru(n){for(var i=0;i<n.length;++i){var o=n[i];o.from!=null&&o.from==o.to&&o.marker.clearWhenEmpty!==!1&&n.splice(i--,1)}return n.length?n:null}function xm(n,i,o){var a=null;if(n.iter(i.line,o.line+1,function(G){if(G.markedSpans)for(var ne=0;ne<G.markedSpans.length;++ne){var ce=G.markedSpans[ne].marker;ce.readOnly&&(!a||Je(a,ce)==-1)&&(a||(a=[])).push(ce)}}),!a)return null;for(var u=[{from:i,to:o}],d=0;d<a.length;++d)for(var v=a[d],y=v.find(0),b=0;b<u.length;++b){var E=u[b];if(!(tt(E.to,y.from)<0||tt(E.from,y.to)>0)){var D=[b,1],F=tt(E.from,y.from),q=tt(E.to,y.to);(F<0||!v.inclusiveLeft&&!F)&&D.push({from:E.from,to:y.from}),(q>0||!v.inclusiveRight&&!q)&&D.push({from:y.to,to:E.to}),u.splice.apply(u,D),b+=D.length-3}}return u}function Lu(n){var i=n.markedSpans;if(i){for(var o=0;o<i.length;++o)i[o].marker.detachLine(n);n.markedSpans=null}}function Pu(n,i){if(i){for(var o=0;o<i.length;++o)i[o].marker.attachLine(n);n.markedSpans=i}}function za(n){return n.inclusiveLeft?-1:0}function Ga(n){return n.inclusiveRight?1:0}function pl(n,i){var o=n.lines.length-i.lines.length;if(o!=0)return o;var a=n.find(),u=i.find(),d=tt(a.from,u.from)||za(n)-za(i);if(d)return-d;var v=tt(a.to,u.to)||Ga(n)-Ga(i);return v||i.id-n.id}function Du(n,i){var o=pi&&n.markedSpans,a;if(o)for(var u=void 0,d=0;d<o.length;++d)u=o[d],u.marker.collapsed&&(i?u.from:u.to)==null&&(!a||pl(a,u.marker)<0)&&(a=u.marker);return a}function Iu(n){return Du(n,!0)}function Wa(n){return Du(n,!1)}function ym(n,i){var o=pi&&n.markedSpans,a;if(o)for(var u=0;u<o.length;++u){var d=o[u];d.marker.collapsed&&(d.from==null||d.from<i)&&(d.to==null||d.to>i)&&(!a||pl(a,d.marker)<0)&&(a=d.marker)}return a}function Nu(n,i,o,a,u){var d=Ae(n,i),v=pi&&d.markedSpans;if(v)for(var y=0;y<v.length;++y){var b=v[y];if(b.marker.collapsed){var E=b.marker.find(0),D=tt(E.from,o)||za(b.marker)-za(u),F=tt(E.to,a)||Ga(b.marker)-Ga(u);if(!(D>=0&&F<=0||D<=0&&F>=0)&&(D<=0&&(b.marker.inclusiveRight&&u.inclusiveLeft?tt(E.to,o)>=0:tt(E.to,o)>0)||D>=0&&(b.marker.inclusiveRight&&u.inclusiveLeft?tt(E.from,a)<=0:tt(E.from,a)<0)))return!0}}}function Yn(n){for(var i;i=Iu(n);)n=i.find(-1,!0).line;return n}function Sm(n){for(var i;i=Wa(n);)n=i.find(1,!0).line;return n}function Mm(n){for(var i,o;i=Wa(n);)n=i.find(1,!0).line,(o||(o=[])).push(n);return o}function ml(n,i){var o=Ae(n,i),a=Yn(o);return o==a?i:Ke(a)}function Uu(n,i){if(i>n.lastLine())return i;var o=Ae(n,i),a;if(!Ni(n,o))return i;for(;a=Wa(o);)o=a.find(1,!0).line;return Ke(o)+1}function Ni(n,i){var o=pi&&i.markedSpans;if(o){for(var a=void 0,u=0;u<o.length;++u)if(a=o[u],!!a.marker.collapsed){if(a.from==null)return!0;if(!a.marker.widgetNode&&a.from==0&&a.marker.inclusiveLeft&&gl(n,i,a))return!0}}}function gl(n,i,o){if(o.to==null){var a=o.marker.find(1,!0);return gl(n,a.line,Vs(a.line.markedSpans,o.marker))}if(o.marker.inclusiveRight&&o.to==i.text.length)return!0;for(var u=void 0,d=0;d<i.markedSpans.length;++d)if(u=i.markedSpans[d],u.marker.collapsed&&!u.marker.widgetNode&&u.from==o.to&&(u.to==null||u.to!=o.from)&&(u.marker.inclusiveLeft||o.marker.inclusiveRight)&&gl(n,i,u))return!0}function mi(n){n=Yn(n);for(var i=0,o=n.parent,a=0;a<o.lines.length;++a){var u=o.lines[a];if(u==n)break;i+=u.height}for(var d=o.parent;d;o=d,d=o.parent)for(var v=0;v<d.children.length;++v){var y=d.children[v];if(y==o)break;i+=y.height}return i}function Va(n){if(n.height==0)return 0;for(var i=n.text.length,o,a=n;o=Iu(a);){var u=o.find(0,!0);a=u.from.line,i+=u.from.ch-u.to.ch}for(a=n;o=Wa(a);){var d=o.find(0,!0);i-=a.text.length-d.from.ch,a=d.to.line,i+=a.text.length-d.to.ch}return i}function vl(n){var i=n.display,o=n.doc;i.maxLine=Ae(o,o.first),i.maxLineLength=Va(i.maxLine),i.maxLineChanged=!0,o.iter(function(a){var u=Va(a);u>i.maxLineLength&&(i.maxLineLength=u,i.maxLine=a)})}var Fr=function(n,i,o){this.text=n,Pu(this,i),this.height=o?o(this):1};Fr.prototype.lineNo=function(){return Ke(this)},St(Fr);function Tm(n,i,o,a){n.text=i,n.stateAfter&&(n.stateAfter=null),n.styles&&(n.styles=null),n.order!=null&&(n.order=null),Lu(n),Pu(n,o);var u=a?a(n):1;u!=n.height&&Zt(n,u)}function bm(n){n.parent=null,Lu(n)}var Em={},Am={};function Ou(n,i){if(!n||/^\s*$/.test(n))return null;var o=i.addModeClass?Am:Em;return o[n]||(o[n]=n.replace(/\S+/g,"cm-$&"))}function Fu(n,i){var o=H("span",null,null,g?"padding-right: .1px":null),a={pre:H("pre",[o],"CodeMirror-line"),content:o,col:0,pos:0,cm:n,trailingSpace:!1,splitSpaces:n.getOption("lineWrapping")};i.measure={};for(var u=0;u<=(i.rest?i.rest.length:0);u++){var d=u?i.rest[u-1]:i.line,v=void 0;a.pos=0,a.addToken=Cm,Nr(n.display.measure)&&(v=gt(d,n.doc.direction))&&(a.addToken=Lm(a.addToken,v)),a.map=[];var y=i!=n.display.externalMeasured&&Ke(d);Pm(d,a,Mu(n,d,y)),d.styleClasses&&(d.styleClasses.bgClass&&(a.bgClass=de(d.styleClasses.bgClass,a.bgClass||"")),d.styleClasses.textClass&&(a.textClass=de(d.styleClasses.textClass,a.textClass||""))),a.map.length==0&&a.map.push(0,0,a.content.appendChild(Dr(n.display.measure))),u==0?(i.measure.map=a.map,i.measure.cache={}):((i.measure.maps||(i.measure.maps=[])).push(a.map),(i.measure.caches||(i.measure.caches=[])).push({}))}if(g){var b=a.content.lastChild;(/\bcm-tab\b/.test(b.className)||b.querySelector&&b.querySelector(".cm-tab"))&&(a.content.className="cm-tab-wrap-hack")}return _e(n,"renderLine",n,i.line,a.pre),a.pre.className&&(a.textClass=de(a.pre.className,a.textClass||"")),a}function wm(n){var i=X("span","•","cm-invalidchar");return i.title="\\u"+n.charCodeAt(0).toString(16),i.setAttribute("aria-label",i.title),i}function Cm(n,i,o,a,u,d,v){if(i){var y=n.splitSpaces?Rm(i,n.trailingSpace):i,b=n.cm.state.specialChars,E=!1,D;if(!b.test(i))n.col+=i.length,D=document.createTextNode(y),n.map.push(n.pos,n.pos+i.length,D),p&&m<9&&(E=!0),n.pos+=i.length;else{D=document.createDocumentFragment();for(var F=0;;){b.lastIndex=F;var q=b.exec(i),G=q?q.index-F:i.length-F;if(G){var ne=document.createTextNode(y.slice(F,F+G));p&&m<9?D.appendChild(X("span",[ne])):D.appendChild(ne),n.map.push(n.pos,n.pos+G,ne),n.col+=G,n.pos+=G}if(!q)break;F+=G+1;var ce=void 0;if(q[0]=="	"){var ge=n.cm.options.tabSize,Te=ge-n.col%ge;ce=D.appendChild(X("span",U(Te),"cm-tab")),ce.setAttribute("role","presentation"),ce.setAttribute("cm-text","	"),n.col+=Te}else q[0]=="\r"||q[0]==`
`?(ce=D.appendChild(X("span",q[0]=="\r"?"␍":"␤","cm-invalidchar")),ce.setAttribute("cm-text",q[0]),n.col+=1):(ce=n.cm.options.specialCharPlaceholder(q[0]),ce.setAttribute("cm-text",q[0]),p&&m<9?D.appendChild(X("span",[ce])):D.appendChild(ce),n.col+=1);n.map.push(n.pos,n.pos+1,ce),n.pos++}}if(n.trailingSpace=y.charCodeAt(i.length-1)==32,o||a||u||E||d||v){var Ce=o||"";a&&(Ce+=a),u&&(Ce+=u);var be=X("span",[D],Ce,d);if(v)for(var Pe in v)v.hasOwnProperty(Pe)&&Pe!="style"&&Pe!="class"&&be.setAttribute(Pe,v[Pe]);return n.content.appendChild(be)}n.content.appendChild(D)}}function Rm(n,i){if(n.length>1&&!/  /.test(n))return n;for(var o=i,a="",u=0;u<n.length;u++){var d=n.charAt(u);d==" "&&o&&(u==n.length-1||n.charCodeAt(u+1)==32)&&(d=" "),a+=d,o=d==" "}return a}function Lm(n,i){return function(o,a,u,d,v,y,b){u=u?u+" cm-force-border":"cm-force-border";for(var E=o.pos,D=E+a.length;;){for(var F=void 0,q=0;q<i.length&&(F=i[q],!(F.to>E&&F.from<=E));q++);if(F.to>=D)return n(o,a,u,d,v,y,b);n(o,a.slice(0,F.to-E),u,d,null,y,b),d=null,a=a.slice(F.to-E),E=F.to}}}function Bu(n,i,o,a){var u=!a&&o.widgetNode;u&&n.map.push(n.pos,n.pos+i,u),!a&&n.cm.display.input.needsContentAttribute&&(u||(u=n.content.appendChild(document.createElement("span"))),u.setAttribute("cm-marker",o.id)),u&&(n.cm.display.input.setUneditable(u),n.content.appendChild(u)),n.pos+=i,n.trailingSpace=!1}function Pm(n,i,o){var a=n.markedSpans,u=n.text,d=0;if(!a){for(var v=1;v<o.length;v+=2)i.addToken(i,u.slice(d,d=o[v]),Ou(o[v+1],i.cm.options));return}for(var y=u.length,b=0,E=1,D="",F,q,G=0,ne,ce,ge,Te,Ce;;){if(G==b){ne=ce=ge=q="",Ce=null,Te=null,G=1/0;for(var be=[],Pe=void 0,qe=0;qe<a.length;++qe){var ze=a[qe],dt=ze.marker;if(dt.type=="bookmark"&&ze.from==b&&dt.widgetNode)be.push(dt);else if(ze.from<=b&&(ze.to==null||ze.to>b||dt.collapsed&&ze.to==b&&ze.from==b)){if(ze.to!=null&&ze.to!=b&&G>ze.to&&(G=ze.to,ce=""),dt.className&&(ne+=" "+dt.className),dt.css&&(q=(q?q+";":"")+dt.css),dt.startStyle&&ze.from==b&&(ge+=" "+dt.startStyle),dt.endStyle&&ze.to==G&&(Pe||(Pe=[])).push(dt.endStyle,ze.to),dt.title&&((Ce||(Ce={})).title=dt.title),dt.attributes)for(var Ct in dt.attributes)(Ce||(Ce={}))[Ct]=dt.attributes[Ct];dt.collapsed&&(!Te||pl(Te.marker,dt)<0)&&(Te=ze)}else ze.from>b&&G>ze.from&&(G=ze.from)}if(Pe)for(var sn=0;sn<Pe.length;sn+=2)Pe[sn+1]==G&&(ce+=" "+Pe[sn]);if(!Te||Te.from==b)for(var Ft=0;Ft<be.length;++Ft)Bu(i,0,be[Ft]);if(Te&&(Te.from||0)==b){if(Bu(i,(Te.to==null?y+1:Te.to)-b,Te.marker,Te.from==null),Te.to==null)return;Te.to==b&&(Te=!1)}}if(b>=y)break;for(var Pn=Math.min(y,G);;){if(D){var Tn=b+D.length;if(!Te){var Yt=Tn>Pn?D.slice(0,Pn-b):D;i.addToken(i,Yt,F?F+ne:ne,ge,b+Yt.length==G?ce:"",q,Ce)}if(Tn>=Pn){D=D.slice(Pn-b),b=Pn;break}b=Tn,ge=""}D=u.slice(d,d=o[E++]),F=Ou(o[E++],i.cm.options)}}}function ku(n,i,o){this.line=i,this.rest=Mm(i),this.size=this.rest?Ke(C(this.rest))-o+1:1,this.node=this.text=null,this.hidden=Ni(n,i)}function Xa(n,i,o){for(var a=[],u,d=i;d<o;d=u){var v=new ku(n.doc,Ae(n.doc,d),d);u=d+v.size,a.push(v)}return a}var Br=null;function Dm(n){Br?Br.ops.push(n):n.ownsGroup=Br={ops:[n],delayedCallbacks:[]}}function Im(n){var i=n.delayedCallbacks,o=0;do{for(;o<i.length;o++)i[o].call(null);for(var a=0;a<n.ops.length;a++){var u=n.ops[a];if(u.cursorActivityHandlers)for(;u.cursorActivityCalled<u.cursorActivityHandlers.length;)u.cursorActivityHandlers[u.cursorActivityCalled++].call(null,u.cm)}}while(o<i.length)}function Nm(n,i){var o=n.ownsGroup;if(o)try{Im(o)}finally{Br=null,i(o)}}var Xs=null;function tn(n,i){var o=Ee(n,i);if(o.length){var a=Array.prototype.slice.call(arguments,2),u;Br?u=Br.delayedCallbacks:Xs?u=Xs:(u=Xs=[],setTimeout(Um,0));for(var d=function(y){u.push(function(){return o[y].apply(null,a)})},v=0;v<o.length;++v)d(v)}}function Um(){var n=Xs;Xs=null;for(var i=0;i<n.length;++i)n[i]()}function Hu(n,i,o,a){for(var u=0;u<i.changes.length;u++){var d=i.changes[u];d=="text"?Fm(n,i):d=="gutter"?Gu(n,i,o,a):d=="class"?_l(n,i):d=="widget"&&Bm(n,i,a)}i.changes=null}function qs(n){return n.node==n.text&&(n.node=X("div",null,null,"position: relative"),n.text.parentNode&&n.text.parentNode.replaceChild(n.node,n.text),n.node.appendChild(n.text),p&&m<8&&(n.node.style.zIndex=2)),n.node}function Om(n,i){var o=i.bgClass?i.bgClass+" "+(i.line.bgClass||""):i.line.bgClass;if(o&&(o+=" CodeMirror-linebackground"),i.background)o?i.background.className=o:(i.background.parentNode.removeChild(i.background),i.background=null);else if(o){var a=qs(i);i.background=a.insertBefore(X("div",null,o),a.firstChild),n.display.input.setUneditable(i.background)}}function zu(n,i){var o=n.display.externalMeasured;return o&&o.line==i.line?(n.display.externalMeasured=null,i.measure=o.measure,o.built):Fu(n,i)}function Fm(n,i){var o=i.text.className,a=zu(n,i);i.text==i.node&&(i.node=a.pre),i.text.parentNode.replaceChild(a.pre,i.text),i.text=a.pre,a.bgClass!=i.bgClass||a.textClass!=i.textClass?(i.bgClass=a.bgClass,i.textClass=a.textClass,_l(n,i)):o&&(i.text.className=o)}function _l(n,i){Om(n,i),i.line.wrapClass?qs(i).className=i.line.wrapClass:i.node!=i.text&&(i.node.className="");var o=i.textClass?i.textClass+" "+(i.line.textClass||""):i.line.textClass;i.text.className=o||""}function Gu(n,i,o,a){if(i.gutter&&(i.node.removeChild(i.gutter),i.gutter=null),i.gutterBackground&&(i.node.removeChild(i.gutterBackground),i.gutterBackground=null),i.line.gutterClass){var u=qs(i);i.gutterBackground=X("div",null,"CodeMirror-gutter-background "+i.line.gutterClass,"left: "+(n.options.fixedGutter?a.fixedPos:-a.gutterTotalWidth)+"px; width: "+a.gutterTotalWidth+"px"),n.display.input.setUneditable(i.gutterBackground),u.insertBefore(i.gutterBackground,i.text)}var d=i.line.gutterMarkers;if(n.options.lineNumbers||d){var v=qs(i),y=i.gutter=X("div",null,"CodeMirror-gutter-wrapper","left: "+(n.options.fixedGutter?a.fixedPos:-a.gutterTotalWidth)+"px");if(y.setAttribute("aria-hidden","true"),n.display.input.setUneditable(y),v.insertBefore(y,i.text),i.line.gutterClass&&(y.className+=" "+i.line.gutterClass),n.options.lineNumbers&&(!d||!d["CodeMirror-linenumbers"])&&(i.lineNumber=y.appendChild(X("div",It(n.options,o),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+a.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+n.display.lineNumInnerWidth+"px"))),d)for(var b=0;b<n.display.gutterSpecs.length;++b){var E=n.display.gutterSpecs[b].className,D=d.hasOwnProperty(E)&&d[E];D&&y.appendChild(X("div",[D],"CodeMirror-gutter-elt","left: "+a.gutterLeft[E]+"px; width: "+a.gutterWidth[E]+"px"))}}}function Bm(n,i,o){i.alignable&&(i.alignable=null);for(var a=se("CodeMirror-linewidget"),u=i.node.firstChild,d=void 0;u;u=d)d=u.nextSibling,a.test(u.className)&&i.node.removeChild(u);Wu(n,i,o)}function km(n,i,o,a){var u=zu(n,i);return i.text=i.node=u.pre,u.bgClass&&(i.bgClass=u.bgClass),u.textClass&&(i.textClass=u.textClass),_l(n,i),Gu(n,i,o,a),Wu(n,i,a),i.node}function Wu(n,i,o){if(Vu(n,i.line,i,o,!0),i.rest)for(var a=0;a<i.rest.length;a++)Vu(n,i.rest[a],i,o,!1)}function Vu(n,i,o,a,u){if(i.widgets)for(var d=qs(o),v=0,y=i.widgets;v<y.length;++v){var b=y[v],E=X("div",[b.node],"CodeMirror-linewidget"+(b.className?" "+b.className:""));b.handleMouseEvents||E.setAttribute("cm-ignore-events","true"),Hm(b,E,o,a),n.display.input.setUneditable(E),u&&b.above?d.insertBefore(E,o.gutter||o.text):d.appendChild(E),tn(b,"redraw")}}function Hm(n,i,o,a){if(n.noHScroll){(o.alignable||(o.alignable=[])).push(i);var u=a.wrapperWidth;i.style.left=a.fixedPos+"px",n.coverGutter||(u-=a.gutterTotalWidth,i.style.paddingLeft=a.gutterTotalWidth+"px"),i.style.width=u+"px"}n.coverGutter&&(i.style.zIndex=5,i.style.position="relative",n.noHScroll||(i.style.marginLeft=-a.gutterTotalWidth+"px"))}function Ys(n){if(n.height!=null)return n.height;var i=n.doc.cm;if(!i)return 0;if(!Q(document.body,n.node)){var o="position: relative;";n.coverGutter&&(o+="margin-left: -"+i.display.gutters.offsetWidth+"px;"),n.noHScroll&&(o+="width: "+i.display.wrapper.clientWidth+"px;"),V(i.display.measure,X("div",[n.node],null,o))}return n.height=n.node.parentNode.offsetHeight}function gi(n,i){for(var o=en(i);o!=n.wrapper;o=o.parentNode)if(!o||o.nodeType==1&&o.getAttribute("cm-ignore-events")=="true"||o.parentNode==n.sizer&&o!=n.mover)return!0}function qa(n){return n.lineSpace.offsetTop}function xl(n){return n.mover.offsetHeight-n.lineSpace.offsetHeight}function Xu(n){if(n.cachedPaddingH)return n.cachedPaddingH;var i=V(n.measure,X("pre","x","CodeMirror-line-like")),o=window.getComputedStyle?window.getComputedStyle(i):i.currentStyle,a={left:parseInt(o.paddingLeft),right:parseInt(o.paddingRight)};return!isNaN(a.left)&&!isNaN(a.right)&&(n.cachedPaddingH=a),a}function ri(n){return ee-n.display.nativeBarWidth}function rr(n){return n.display.scroller.clientWidth-ri(n)-n.display.barWidth}function yl(n){return n.display.scroller.clientHeight-ri(n)-n.display.barHeight}function zm(n,i,o){var a=n.options.lineWrapping,u=a&&rr(n);if(!i.measure.heights||a&&i.measure.width!=u){var d=i.measure.heights=[];if(a){i.measure.width=u;for(var v=i.text.firstChild.getClientRects(),y=0;y<v.length-1;y++){var b=v[y],E=v[y+1];Math.abs(b.bottom-E.bottom)>2&&d.push((b.bottom+E.top)/2-o.top)}}d.push(o.bottom-o.top)}}function qu(n,i,o){if(n.line==i)return{map:n.measure.map,cache:n.measure.cache};if(n.rest){for(var a=0;a<n.rest.length;a++)if(n.rest[a]==i)return{map:n.measure.maps[a],cache:n.measure.caches[a]};for(var u=0;u<n.rest.length;u++)if(Ke(n.rest[u])>o)return{map:n.measure.maps[u],cache:n.measure.caches[u],before:!0}}}function Gm(n,i){i=Yn(i);var o=Ke(i),a=n.display.externalMeasured=new ku(n.doc,i,o);a.lineN=o;var u=a.built=Fu(n,a);return a.text=u.pre,V(n.display.lineMeasure,u.pre),a}function Yu(n,i,o,a){return si(n,kr(n,i),o,a)}function Sl(n,i){if(i>=n.display.viewFrom&&i<n.display.viewTo)return n.display.view[or(n,i)];var o=n.display.externalMeasured;if(o&&i>=o.lineN&&i<o.lineN+o.size)return o}function kr(n,i){var o=Ke(i),a=Sl(n,o);a&&!a.text?a=null:a&&a.changes&&(Hu(n,a,o,Al(n)),n.curOp.forceUpdate=!0),a||(a=Gm(n,i));var u=qu(a,i,o);return{line:i,view:a,rect:null,map:u.map,cache:u.cache,before:u.before,hasHeights:!1}}function si(n,i,o,a,u){i.before&&(o=-1);var d=o+(a||""),v;return i.cache.hasOwnProperty(d)?v=i.cache[d]:(i.rect||(i.rect=i.view.text.getBoundingClientRect()),i.hasHeights||(zm(n,i.view,i.rect),i.hasHeights=!0),v=Vm(n,i,o,a),v.bogus||(i.cache[d]=v)),{left:v.left,right:v.right,top:u?v.rtop:v.top,bottom:u?v.rbottom:v.bottom}}var Ku={left:0,right:0,top:0,bottom:0};function ju(n,i,o){for(var a,u,d,v,y,b,E=0;E<n.length;E+=3)if(y=n[E],b=n[E+1],i<y?(u=0,d=1,v="left"):i<b?(u=i-y,d=u+1):(E==n.length-3||i==b&&n[E+3]>i)&&(d=b-y,u=d-1,i>=b&&(v="right")),u!=null){if(a=n[E+2],y==b&&o==(a.insertLeft?"left":"right")&&(v=o),o=="left"&&u==0)for(;E&&n[E-2]==n[E-3]&&n[E-1].insertLeft;)a=n[(E-=3)+2],v="left";if(o=="right"&&u==b-y)for(;E<n.length-3&&n[E+3]==n[E+4]&&!n[E+5].insertLeft;)a=n[(E+=3)+2],v="right";break}return{node:a,start:u,end:d,collapse:v,coverStart:y,coverEnd:b}}function Wm(n,i){var o=Ku;if(i=="left")for(var a=0;a<n.length&&(o=n[a]).left==o.right;a++);else for(var u=n.length-1;u>=0&&(o=n[u]).left==o.right;u--);return o}function Vm(n,i,o,a){var u=ju(i.map,o,a),d=u.node,v=u.start,y=u.end,b=u.collapse,E;if(d.nodeType==3){for(var D=0;D<4;D++){for(;v&&me(i.line.text.charAt(u.coverStart+v));)--v;for(;u.coverStart+y<u.coverEnd&&me(i.line.text.charAt(u.coverStart+y));)++y;if(p&&m<9&&v==0&&y==u.coverEnd-u.coverStart?E=d.parentNode.getBoundingClientRect():E=Wm(K(d,v,y).getClientRects(),a),E.left||E.right||v==0)break;y=v,v=v-1,b="right"}p&&m<11&&(E=Xm(n.display.measure,E))}else{v>0&&(b=a="right");var F;n.options.lineWrapping&&(F=d.getClientRects()).length>1?E=F[a=="right"?F.length-1:0]:E=d.getBoundingClientRect()}if(p&&m<9&&!v&&(!E||!E.left&&!E.right)){var q=d.parentNode.getClientRects()[0];q?E={left:q.left,right:q.left+zr(n.display),top:q.top,bottom:q.bottom}:E=Ku}for(var G=E.top-i.rect.top,ne=E.bottom-i.rect.top,ce=(G+ne)/2,ge=i.view.measure.heights,Te=0;Te<ge.length-1&&!(ce<ge[Te]);Te++);var Ce=Te?ge[Te-1]:0,be=ge[Te],Pe={left:(b=="right"?E.right:E.left)-i.rect.left,right:(b=="left"?E.left:E.right)-i.rect.left,top:Ce,bottom:be};return!E.left&&!E.right&&(Pe.bogus=!0),n.options.singleCursorHeightPerLine||(Pe.rtop=G,Pe.rbottom=ne),Pe}function Xm(n,i){if(!window.screen||screen.logicalXDPI==null||screen.logicalXDPI==screen.deviceXDPI||!ul(n))return i;var o=screen.logicalXDPI/screen.deviceXDPI,a=screen.logicalYDPI/screen.deviceYDPI;return{left:i.left*o,right:i.right*o,top:i.top*a,bottom:i.bottom*a}}function Zu(n){if(n.measure&&(n.measure.cache={},n.measure.heights=null,n.rest))for(var i=0;i<n.rest.length;i++)n.measure.caches[i]={}}function Ju(n){n.display.externalMeasure=null,pe(n.display.lineMeasure);for(var i=0;i<n.display.view.length;i++)Zu(n.display.view[i])}function Ks(n){Ju(n),n.display.cachedCharWidth=n.display.cachedTextHeight=n.display.cachedPaddingH=null,n.options.lineWrapping||(n.display.maxLineChanged=!0),n.display.lineNumChars=null}function Qu(n){return x&&R?-(n.body.getBoundingClientRect().left-parseInt(getComputedStyle(n.body).marginLeft)):n.defaultView.pageXOffset||(n.documentElement||n.body).scrollLeft}function $u(n){return x&&R?-(n.body.getBoundingClientRect().top-parseInt(getComputedStyle(n.body).marginTop)):n.defaultView.pageYOffset||(n.documentElement||n.body).scrollTop}function Ml(n){var i=Yn(n),o=i.widgets,a=0;if(o)for(var u=0;u<o.length;++u)o[u].above&&(a+=Ys(o[u]));return a}function Ya(n,i,o,a,u){if(!u){var d=Ml(i);o.top+=d,o.bottom+=d}if(a=="line")return o;a||(a="local");var v=mi(i);if(a=="local"?v+=qa(n.display):v-=n.display.viewOffset,a=="page"||a=="window"){var y=n.display.lineSpace.getBoundingClientRect();v+=y.top+(a=="window"?0:$u(ie(n)));var b=y.left+(a=="window"?0:Qu(ie(n)));o.left+=b,o.right+=b}return o.top+=v,o.bottom+=v,o}function ef(n,i,o){if(o=="div")return i;var a=i.left,u=i.top;if(o=="page")a-=Qu(ie(n)),u-=$u(ie(n));else if(o=="local"||!o){var d=n.display.sizer.getBoundingClientRect();a+=d.left,u+=d.top}var v=n.display.lineSpace.getBoundingClientRect();return{left:a-v.left,top:u-v.top}}function Ka(n,i,o,a,u){return a||(a=Ae(n.doc,i.line)),Ya(n,a,Yu(n,a,i.ch,u),o)}function Kn(n,i,o,a,u,d){a=a||Ae(n.doc,i.line),u||(u=kr(n,a));function v(ne,ce){var ge=si(n,u,ne,ce?"right":"left",d);return ce?ge.left=ge.right:ge.right=ge.left,Ya(n,a,ge,o)}var y=gt(a,n.doc.direction),b=i.ch,E=i.sticky;if(b>=a.text.length?(b=a.text.length,E="before"):b<=0&&(b=0,E="after"),!y)return v(E=="before"?b-1:b,E=="before");function D(ne,ce,ge){var Te=y[ce],Ce=Te.level==1;return v(ge?ne-1:ne,Ce!=ge)}var F=Ie(y,b,E),q=Xe,G=D(b,F,E=="before");return q!=null&&(G.other=D(b,q,E!="before")),G}function tf(n,i){var o=0;i=He(n.doc,i),n.options.lineWrapping||(o=zr(n.display)*i.ch);var a=Ae(n.doc,i.line),u=mi(a)+qa(n.display);return{left:o,right:o,top:u,bottom:u+a.height}}function Tl(n,i,o,a,u){var d=ue(n,i,o);return d.xRel=u,a&&(d.outside=a),d}function bl(n,i,o){var a=n.doc;if(o+=n.display.viewOffset,o<0)return Tl(a.first,0,null,-1,-1);var u=st(a,o),d=a.first+a.size-1;if(u>d)return Tl(a.first+a.size-1,Ae(a,d).text.length,null,1,1);i<0&&(i=0);for(var v=Ae(a,u);;){var y=qm(n,v,u,i,o),b=ym(v,y.ch+(y.xRel>0||y.outside>0?1:0));if(!b)return y;var E=b.find(1);if(E.line==u)return E;v=Ae(a,u=E.line)}}function nf(n,i,o,a){a-=Ml(i);var u=i.text.length,d=ct(function(v){return si(n,o,v-1).bottom<=a},u,0);return u=ct(function(v){return si(n,o,v).top>a},d,u),{begin:d,end:u}}function rf(n,i,o,a){o||(o=kr(n,i));var u=Ya(n,i,si(n,o,a),"line").top;return nf(n,i,o,u)}function El(n,i,o,a){return n.bottom<=o?!1:n.top>o?!0:(a?n.left:n.right)>i}function qm(n,i,o,a,u){u-=mi(i);var d=kr(n,i),v=Ml(i),y=0,b=i.text.length,E=!0,D=gt(i,n.doc.direction);if(D){var F=(n.options.lineWrapping?Km:Ym)(n,i,o,d,D,a,u);E=F.level!=1,y=E?F.from:F.to-1,b=E?F.to:F.from-1}var q=null,G=null,ne=ct(function(qe){var ze=si(n,d,qe);return ze.top+=v,ze.bottom+=v,El(ze,a,u,!1)?(ze.top<=u&&ze.left<=a&&(q=qe,G=ze),!0):!1},y,b),ce,ge,Te=!1;if(G){var Ce=a-G.left<G.right-a,be=Ce==E;ne=q+(be?0:1),ge=be?"after":"before",ce=Ce?G.left:G.right}else{!E&&(ne==b||ne==y)&&ne++,ge=ne==0?"after":ne==i.text.length?"before":si(n,d,ne-(E?1:0)).bottom+v<=u==E?"after":"before";var Pe=Kn(n,ue(o,ne,ge),"line",i,d);ce=Pe.left,Te=u<Pe.top?-1:u>=Pe.bottom?1:0}return ne=bt(i.text,ne,1),Tl(o,ne,ge,Te,a-ce)}function Ym(n,i,o,a,u,d,v){var y=ct(function(F){var q=u[F],G=q.level!=1;return El(Kn(n,ue(o,G?q.to:q.from,G?"before":"after"),"line",i,a),d,v,!0)},0,u.length-1),b=u[y];if(y>0){var E=b.level!=1,D=Kn(n,ue(o,E?b.from:b.to,E?"after":"before"),"line",i,a);El(D,d,v,!0)&&D.top>v&&(b=u[y-1])}return b}function Km(n,i,o,a,u,d,v){var y=nf(n,i,a,v),b=y.begin,E=y.end;/\s/.test(i.text.charAt(E-1))&&E--;for(var D=null,F=null,q=0;q<u.length;q++){var G=u[q];if(!(G.from>=E||G.to<=b)){var ne=G.level!=1,ce=si(n,a,ne?Math.min(E,G.to)-1:Math.max(b,G.from)).right,ge=ce<d?d-ce+1e9:ce-d;(!D||F>ge)&&(D=G,F=ge)}}return D||(D=u[u.length-1]),D.from<b&&(D={from:b,to:D.to,level:D.level}),D.to>E&&(D={from:D.from,to:E,level:D.level}),D}var sr;function Hr(n){if(n.cachedTextHeight!=null)return n.cachedTextHeight;if(sr==null){sr=X("pre",null,"CodeMirror-line-like");for(var i=0;i<49;++i)sr.appendChild(document.createTextNode("x")),sr.appendChild(X("br"));sr.appendChild(document.createTextNode("x"))}V(n.measure,sr);var o=sr.offsetHeight/50;return o>3&&(n.cachedTextHeight=o),pe(n.measure),o||1}function zr(n){if(n.cachedCharWidth!=null)return n.cachedCharWidth;var i=X("span","xxxxxxxxxx"),o=X("pre",[i],"CodeMirror-line-like");V(n.measure,o);var a=i.getBoundingClientRect(),u=(a.right-a.left)/10;return u>2&&(n.cachedCharWidth=u),u||10}function Al(n){for(var i=n.display,o={},a={},u=i.gutters.clientLeft,d=i.gutters.firstChild,v=0;d;d=d.nextSibling,++v){var y=n.display.gutterSpecs[v].className;o[y]=d.offsetLeft+d.clientLeft+u,a[y]=d.clientWidth}return{fixedPos:wl(i),gutterTotalWidth:i.gutters.offsetWidth,gutterLeft:o,gutterWidth:a,wrapperWidth:i.wrapper.clientWidth}}function wl(n){return n.scroller.getBoundingClientRect().left-n.sizer.getBoundingClientRect().left}function sf(n){var i=Hr(n.display),o=n.options.lineWrapping,a=o&&Math.max(5,n.display.scroller.clientWidth/zr(n.display)-3);return function(u){if(Ni(n.doc,u))return 0;var d=0;if(u.widgets)for(var v=0;v<u.widgets.length;v++)u.widgets[v].height&&(d+=u.widgets[v].height);return o?d+(Math.ceil(u.text.length/a)||1)*i:d+i}}function Cl(n){var i=n.doc,o=sf(n);i.iter(function(a){var u=o(a);u!=a.height&&Zt(a,u)})}function ar(n,i,o,a){var u=n.display;if(!o&&en(i).getAttribute("cm-not-content")=="true")return null;var d,v,y=u.lineSpace.getBoundingClientRect();try{d=i.clientX-y.left,v=i.clientY-y.top}catch{return null}var b=bl(n,d,v),E;if(a&&b.xRel>0&&(E=Ae(n.doc,b.line).text).length==b.ch){var D=je(E,E.length,n.options.tabSize)-E.length;b=ue(b.line,Math.max(0,Math.round((d-Xu(n.display).left)/zr(n.display))-D))}return b}function or(n,i){if(i>=n.display.viewTo||(i-=n.display.viewFrom,i<0))return null;for(var o=n.display.view,a=0;a<o.length;a++)if(i-=o[a].size,i<0)return a}function Sn(n,i,o,a){i==null&&(i=n.doc.first),o==null&&(o=n.doc.first+n.doc.size),a||(a=0);var u=n.display;if(a&&o<u.viewTo&&(u.updateLineNumbers==null||u.updateLineNumbers>i)&&(u.updateLineNumbers=i),n.curOp.viewChanged=!0,i>=u.viewTo)pi&&ml(n.doc,i)<u.viewTo&&Oi(n);else if(o<=u.viewFrom)pi&&Uu(n.doc,o+a)>u.viewFrom?Oi(n):(u.viewFrom+=a,u.viewTo+=a);else if(i<=u.viewFrom&&o>=u.viewTo)Oi(n);else if(i<=u.viewFrom){var d=ja(n,o,o+a,1);d?(u.view=u.view.slice(d.index),u.viewFrom=d.lineN,u.viewTo+=a):Oi(n)}else if(o>=u.viewTo){var v=ja(n,i,i,-1);v?(u.view=u.view.slice(0,v.index),u.viewTo=v.lineN):Oi(n)}else{var y=ja(n,i,i,-1),b=ja(n,o,o+a,1);y&&b?(u.view=u.view.slice(0,y.index).concat(Xa(n,y.lineN,b.lineN)).concat(u.view.slice(b.index)),u.viewTo+=a):Oi(n)}var E=u.externalMeasured;E&&(o<E.lineN?E.lineN+=a:i<E.lineN+E.size&&(u.externalMeasured=null))}function Ui(n,i,o){n.curOp.viewChanged=!0;var a=n.display,u=n.display.externalMeasured;if(u&&i>=u.lineN&&i<u.lineN+u.size&&(a.externalMeasured=null),!(i<a.viewFrom||i>=a.viewTo)){var d=a.view[or(n,i)];if(d.node!=null){var v=d.changes||(d.changes=[]);Je(v,o)==-1&&v.push(o)}}}function Oi(n){n.display.viewFrom=n.display.viewTo=n.doc.first,n.display.view=[],n.display.viewOffset=0}function ja(n,i,o,a){var u=or(n,i),d,v=n.display.view;if(!pi||o==n.doc.first+n.doc.size)return{index:u,lineN:o};for(var y=n.display.viewFrom,b=0;b<u;b++)y+=v[b].size;if(y!=i){if(a>0){if(u==v.length-1)return null;d=y+v[u].size-i,u++}else d=y-i;i+=d,o+=d}for(;ml(n.doc,o)!=o;){if(u==(a<0?0:v.length-1))return null;o+=a*v[u-(a<0?1:0)].size,u+=a}return{index:u,lineN:o}}function jm(n,i,o){var a=n.display,u=a.view;u.length==0||i>=a.viewTo||o<=a.viewFrom?(a.view=Xa(n,i,o),a.viewFrom=i):(a.viewFrom>i?a.view=Xa(n,i,a.viewFrom).concat(a.view):a.viewFrom<i&&(a.view=a.view.slice(or(n,i))),a.viewFrom=i,a.viewTo<o?a.view=a.view.concat(Xa(n,a.viewTo,o)):a.viewTo>o&&(a.view=a.view.slice(0,or(n,o)))),a.viewTo=o}function af(n){for(var i=n.display.view,o=0,a=0;a<i.length;a++){var u=i[a];!u.hidden&&(!u.node||u.changes)&&++o}return o}function js(n){n.display.input.showSelection(n.display.input.prepareSelection())}function of(n,i){i===void 0&&(i=!0);var o=n.doc,a={},u=a.cursors=document.createDocumentFragment(),d=a.selection=document.createDocumentFragment(),v=n.options.$customCursor;v&&(i=!0);for(var y=0;y<o.sel.ranges.length;y++)if(!(!i&&y==o.sel.primIndex)){var b=o.sel.ranges[y];if(!(b.from().line>=n.display.viewTo||b.to().line<n.display.viewFrom)){var E=b.empty();if(v){var D=v(n,b);D&&Rl(n,D,u)}else(E||n.options.showCursorWhenSelecting)&&Rl(n,b.head,u);E||Zm(n,b,d)}}return a}function Rl(n,i,o){var a=Kn(n,i,"div",null,null,!n.options.singleCursorHeightPerLine),u=o.appendChild(X("div"," ","CodeMirror-cursor"));if(u.style.left=a.left+"px",u.style.top=a.top+"px",u.style.height=Math.max(0,a.bottom-a.top)*n.options.cursorHeight+"px",/\bcm-fat-cursor\b/.test(n.getWrapperElement().className)){var d=Ka(n,i,"div",null,null),v=d.right-d.left;u.style.width=(v>0?v:n.defaultCharWidth())+"px"}if(a.other){var y=o.appendChild(X("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));y.style.display="",y.style.left=a.other.left+"px",y.style.top=a.other.top+"px",y.style.height=(a.other.bottom-a.other.top)*.85+"px"}}function Za(n,i){return n.top-i.top||n.left-i.left}function Zm(n,i,o){var a=n.display,u=n.doc,d=document.createDocumentFragment(),v=Xu(n.display),y=v.left,b=Math.max(a.sizerWidth,rr(n)-a.sizer.offsetLeft)-v.right,E=u.direction=="ltr";function D(be,Pe,qe,ze){Pe<0&&(Pe=0),Pe=Math.round(Pe),ze=Math.round(ze),d.appendChild(X("div",null,"CodeMirror-selected","position: absolute; left: "+be+`px;
                             top: `+Pe+"px; width: "+(qe??b-be)+`px;
                             height: `+(ze-Pe)+"px"))}function F(be,Pe,qe){var ze=Ae(u,be),dt=ze.text.length,Ct,sn;function Ft(Yt,bn){return Ka(n,ue(be,Yt),"div",ze,bn)}function Pn(Yt,bn,cn){var Jt=rf(n,ze,null,Yt),Kt=bn=="ltr"==(cn=="after")?"left":"right",Bt=cn=="after"?Jt.begin:Jt.end-(/\s/.test(ze.text.charAt(Jt.end-1))?2:1);return Ft(Bt,Kt)[Kt]}var Tn=gt(ze,u.direction);return at(Tn,Pe||0,qe??dt,function(Yt,bn,cn,Jt){var Kt=cn=="ltr",Bt=Ft(Yt,Kt?"left":"right"),En=Ft(bn-1,Kt?"right":"left"),es=Pe==null&&Yt==0,Gi=qe==null&&bn==dt,pn=Jt==0,ai=!Tn||Jt==Tn.length-1;if(En.top-Bt.top<=3){var an=(E?es:Gi)&&pn,nc=(E?Gi:es)&&ai,xi=an?y:(Kt?Bt:En).left,hr=nc?b:(Kt?En:Bt).right;D(xi,Bt.top,hr-xi,Bt.bottom)}else{var dr,vn,ts,ic;Kt?(dr=E&&es&&pn?y:Bt.left,vn=E?b:Pn(Yt,cn,"before"),ts=E?y:Pn(bn,cn,"after"),ic=E&&Gi&&ai?b:En.right):(dr=E?Pn(Yt,cn,"before"):y,vn=!E&&es&&pn?b:Bt.right,ts=!E&&Gi&&ai?y:En.left,ic=E?Pn(bn,cn,"after"):b),D(dr,Bt.top,vn-dr,Bt.bottom),Bt.bottom<En.top&&D(y,Bt.bottom,null,En.top),D(ts,En.top,ic-ts,En.bottom)}(!Ct||Za(Bt,Ct)<0)&&(Ct=Bt),Za(En,Ct)<0&&(Ct=En),(!sn||Za(Bt,sn)<0)&&(sn=Bt),Za(En,sn)<0&&(sn=En)}),{start:Ct,end:sn}}var q=i.from(),G=i.to();if(q.line==G.line)F(q.line,q.ch,G.ch);else{var ne=Ae(u,q.line),ce=Ae(u,G.line),ge=Yn(ne)==Yn(ce),Te=F(q.line,q.ch,ge?ne.text.length+1:null).end,Ce=F(G.line,ge?0:null,G.ch).start;ge&&(Te.top<Ce.top-2?(D(Te.right,Te.top,null,Te.bottom),D(y,Ce.top,Ce.left,Ce.bottom)):D(Te.right,Te.top,Ce.left-Te.right,Te.bottom)),Te.bottom<Ce.top&&D(y,Te.bottom,null,Ce.top)}o.appendChild(d)}function Ll(n){if(n.state.focused){var i=n.display;clearInterval(i.blinker);var o=!0;i.cursorDiv.style.visibility="",n.options.cursorBlinkRate>0?i.blinker=setInterval(function(){n.hasFocus()||Gr(n),i.cursorDiv.style.visibility=(o=!o)?"":"hidden"},n.options.cursorBlinkRate):n.options.cursorBlinkRate<0&&(i.cursorDiv.style.visibility="hidden")}}function lf(n){n.hasFocus()||(n.display.input.focus(),n.state.focused||Dl(n))}function Pl(n){n.state.delayingBlurEvent=!0,setTimeout(function(){n.state.delayingBlurEvent&&(n.state.delayingBlurEvent=!1,n.state.focused&&Gr(n))},100)}function Dl(n,i){n.state.delayingBlurEvent&&!n.state.draggingText&&(n.state.delayingBlurEvent=!1),n.options.readOnly!="nocursor"&&(n.state.focused||(_e(n,"focus",n,i),n.state.focused=!0,le(n.display.wrapper,"CodeMirror-focused"),!n.curOp&&n.display.selForContextMenu!=n.doc.sel&&(n.display.input.reset(),g&&setTimeout(function(){return n.display.input.reset(!0)},20)),n.display.input.receivedFocus()),Ll(n))}function Gr(n,i){n.state.delayingBlurEvent||(n.state.focused&&(_e(n,"blur",n,i),n.state.focused=!1,oe(n.display.wrapper,"CodeMirror-focused")),clearInterval(n.display.blinker),setTimeout(function(){n.state.focused||(n.display.shift=!1)},150))}function Ja(n){for(var i=n.display,o=i.lineDiv.offsetTop,a=Math.max(0,i.scroller.getBoundingClientRect().top),u=i.lineDiv.getBoundingClientRect().top,d=0,v=0;v<i.view.length;v++){var y=i.view[v],b=n.options.lineWrapping,E=void 0,D=0;if(!y.hidden){if(u+=y.line.height,p&&m<8){var F=y.node.offsetTop+y.node.offsetHeight;E=F-o,o=F}else{var q=y.node.getBoundingClientRect();E=q.bottom-q.top,!b&&y.text.firstChild&&(D=y.text.firstChild.getBoundingClientRect().right-q.left-1)}var G=y.line.height-E;if((G>.005||G<-.005)&&(u<a&&(d-=G),Zt(y.line,E),cf(y.line),y.rest))for(var ne=0;ne<y.rest.length;ne++)cf(y.rest[ne]);if(D>n.display.sizerWidth){var ce=Math.ceil(D/zr(n.display));ce>n.display.maxLineLength&&(n.display.maxLineLength=ce,n.display.maxLine=y.line,n.display.maxLineChanged=!0)}}}Math.abs(d)>2&&(i.scroller.scrollTop+=d)}function cf(n){if(n.widgets)for(var i=0;i<n.widgets.length;++i){var o=n.widgets[i],a=o.node.parentNode;a&&(o.height=a.offsetHeight)}}function Qa(n,i,o){var a=o&&o.top!=null?Math.max(0,o.top):n.scroller.scrollTop;a=Math.floor(a-qa(n));var u=o&&o.bottom!=null?o.bottom:a+n.wrapper.clientHeight,d=st(i,a),v=st(i,u);if(o&&o.ensure){var y=o.ensure.from.line,b=o.ensure.to.line;y<d?(d=y,v=st(i,mi(Ae(i,y))+n.wrapper.clientHeight)):Math.min(b,i.lastLine())>=v&&(d=st(i,mi(Ae(i,b))-n.wrapper.clientHeight),v=b)}return{from:d,to:Math.max(v,d+1)}}function Jm(n,i){if(!xe(n,"scrollCursorIntoView")){var o=n.display,a=o.sizer.getBoundingClientRect(),u=null,d=o.wrapper.ownerDocument;if(i.top+a.top<0?u=!0:i.bottom+a.top>(d.defaultView.innerHeight||d.documentElement.clientHeight)&&(u=!1),u!=null&&!S){var v=X("div","​",null,`position: absolute;
                         top: `+(i.top-o.viewOffset-qa(n.display))+`px;
                         height: `+(i.bottom-i.top+ri(n)+o.barHeight)+`px;
                         left: `+i.left+"px; width: "+Math.max(2,i.right-i.left)+"px;");n.display.lineSpace.appendChild(v),v.scrollIntoView(u),n.display.lineSpace.removeChild(v)}}}function Qm(n,i,o,a){a==null&&(a=0);var u;!n.options.lineWrapping&&i==o&&(o=i.sticky=="before"?ue(i.line,i.ch+1,"before"):i,i=i.ch?ue(i.line,i.sticky=="before"?i.ch-1:i.ch,"after"):i);for(var d=0;d<5;d++){var v=!1,y=Kn(n,i),b=!o||o==i?y:Kn(n,o);u={left:Math.min(y.left,b.left),top:Math.min(y.top,b.top)-a,right:Math.max(y.left,b.left),bottom:Math.max(y.bottom,b.bottom)+a};var E=Il(n,u),D=n.doc.scrollTop,F=n.doc.scrollLeft;if(E.scrollTop!=null&&(Js(n,E.scrollTop),Math.abs(n.doc.scrollTop-D)>1&&(v=!0)),E.scrollLeft!=null&&(lr(n,E.scrollLeft),Math.abs(n.doc.scrollLeft-F)>1&&(v=!0)),!v)break}return u}function $m(n,i){var o=Il(n,i);o.scrollTop!=null&&Js(n,o.scrollTop),o.scrollLeft!=null&&lr(n,o.scrollLeft)}function Il(n,i){var o=n.display,a=Hr(n.display);i.top<0&&(i.top=0);var u=n.curOp&&n.curOp.scrollTop!=null?n.curOp.scrollTop:o.scroller.scrollTop,d=yl(n),v={};i.bottom-i.top>d&&(i.bottom=i.top+d);var y=n.doc.height+xl(o),b=i.top<a,E=i.bottom>y-a;if(i.top<u)v.scrollTop=b?0:i.top;else if(i.bottom>u+d){var D=Math.min(i.top,(E?y:i.bottom)-d);D!=u&&(v.scrollTop=D)}var F=n.options.fixedGutter?0:o.gutters.offsetWidth,q=n.curOp&&n.curOp.scrollLeft!=null?n.curOp.scrollLeft:o.scroller.scrollLeft-F,G=rr(n)-o.gutters.offsetWidth,ne=i.right-i.left>G;return ne&&(i.right=i.left+G),i.left<10?v.scrollLeft=0:i.left<q?v.scrollLeft=Math.max(0,i.left+F-(ne?0:10)):i.right>G+q-3&&(v.scrollLeft=i.right+(ne?0:10)-G),v}function Nl(n,i){i!=null&&($a(n),n.curOp.scrollTop=(n.curOp.scrollTop==null?n.doc.scrollTop:n.curOp.scrollTop)+i)}function Wr(n){$a(n);var i=n.getCursor();n.curOp.scrollToPos={from:i,to:i,margin:n.options.cursorScrollMargin}}function Zs(n,i,o){(i!=null||o!=null)&&$a(n),i!=null&&(n.curOp.scrollLeft=i),o!=null&&(n.curOp.scrollTop=o)}function eg(n,i){$a(n),n.curOp.scrollToPos=i}function $a(n){var i=n.curOp.scrollToPos;if(i){n.curOp.scrollToPos=null;var o=tf(n,i.from),a=tf(n,i.to);uf(n,o,a,i.margin)}}function uf(n,i,o,a){var u=Il(n,{left:Math.min(i.left,o.left),top:Math.min(i.top,o.top)-a,right:Math.max(i.right,o.right),bottom:Math.max(i.bottom,o.bottom)+a});Zs(n,u.scrollLeft,u.scrollTop)}function Js(n,i){Math.abs(n.doc.scrollTop-i)<2||(s||Ol(n,{top:i}),ff(n,i,!0),s&&Ol(n),ea(n,100))}function ff(n,i,o){i=Math.max(0,Math.min(n.display.scroller.scrollHeight-n.display.scroller.clientHeight,i)),!(n.display.scroller.scrollTop==i&&!o)&&(n.doc.scrollTop=i,n.display.scrollbars.setScrollTop(i),n.display.scroller.scrollTop!=i&&(n.display.scroller.scrollTop=i))}function lr(n,i,o,a){i=Math.max(0,Math.min(i,n.display.scroller.scrollWidth-n.display.scroller.clientWidth)),!((o?i==n.doc.scrollLeft:Math.abs(n.doc.scrollLeft-i)<2)&&!a)&&(n.doc.scrollLeft=i,gf(n),n.display.scroller.scrollLeft!=i&&(n.display.scroller.scrollLeft=i),n.display.scrollbars.setScrollLeft(i))}function Qs(n){var i=n.display,o=i.gutters.offsetWidth,a=Math.round(n.doc.height+xl(n.display));return{clientHeight:i.scroller.clientHeight,viewHeight:i.wrapper.clientHeight,scrollWidth:i.scroller.scrollWidth,clientWidth:i.scroller.clientWidth,viewWidth:i.wrapper.clientWidth,barLeft:n.options.fixedGutter?o:0,docHeight:a,scrollHeight:a+ri(n)+i.barHeight,nativeBarWidth:i.nativeBarWidth,gutterWidth:o}}var cr=function(n,i,o){this.cm=o;var a=this.vert=X("div",[X("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),u=this.horiz=X("div",[X("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");a.tabIndex=u.tabIndex=-1,n(a),n(u),Me(a,"scroll",function(){a.clientHeight&&i(a.scrollTop,"vertical")}),Me(u,"scroll",function(){u.clientWidth&&i(u.scrollLeft,"horizontal")}),this.checkedZeroWidth=!1,p&&m<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")};cr.prototype.update=function(n){var i=n.scrollWidth>n.clientWidth+1,o=n.scrollHeight>n.clientHeight+1,a=n.nativeBarWidth;if(o){this.vert.style.display="block",this.vert.style.bottom=i?a+"px":"0";var u=n.viewHeight-(i?a:0);this.vert.firstChild.style.height=Math.max(0,n.scrollHeight-n.clientHeight+u)+"px"}else this.vert.scrollTop=0,this.vert.style.display="",this.vert.firstChild.style.height="0";if(i){this.horiz.style.display="block",this.horiz.style.right=o?a+"px":"0",this.horiz.style.left=n.barLeft+"px";var d=n.viewWidth-n.barLeft-(o?a:0);this.horiz.firstChild.style.width=Math.max(0,n.scrollWidth-n.clientWidth+d)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedZeroWidth&&n.clientHeight>0&&(a==0&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:o?a:0,bottom:i?a:0}},cr.prototype.setScrollLeft=function(n){this.horiz.scrollLeft!=n&&(this.horiz.scrollLeft=n),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},cr.prototype.setScrollTop=function(n){this.vert.scrollTop!=n&&(this.vert.scrollTop=n),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},cr.prototype.zeroWidthHack=function(){var n=W&&!M?"12px":"18px";this.horiz.style.height=this.vert.style.width=n,this.horiz.style.visibility=this.vert.style.visibility="hidden",this.disableHoriz=new Ye,this.disableVert=new Ye},cr.prototype.enableZeroWidthBar=function(n,i,o){n.style.visibility="";function a(){var u=n.getBoundingClientRect(),d=o=="vert"?document.elementFromPoint(u.right-1,(u.top+u.bottom)/2):document.elementFromPoint((u.right+u.left)/2,u.bottom-1);d!=n?n.style.visibility="hidden":i.set(1e3,a)}i.set(1e3,a)},cr.prototype.clear=function(){var n=this.horiz.parentNode;n.removeChild(this.horiz),n.removeChild(this.vert)};var $s=function(){};$s.prototype.update=function(){return{bottom:0,right:0}},$s.prototype.setScrollLeft=function(){},$s.prototype.setScrollTop=function(){},$s.prototype.clear=function(){};function Vr(n,i){i||(i=Qs(n));var o=n.display.barWidth,a=n.display.barHeight;hf(n,i);for(var u=0;u<4&&o!=n.display.barWidth||a!=n.display.barHeight;u++)o!=n.display.barWidth&&n.options.lineWrapping&&Ja(n),hf(n,Qs(n)),o=n.display.barWidth,a=n.display.barHeight}function hf(n,i){var o=n.display,a=o.scrollbars.update(i);o.sizer.style.paddingRight=(o.barWidth=a.right)+"px",o.sizer.style.paddingBottom=(o.barHeight=a.bottom)+"px",o.heightForcer.style.borderBottom=a.bottom+"px solid transparent",a.right&&a.bottom?(o.scrollbarFiller.style.display="block",o.scrollbarFiller.style.height=a.bottom+"px",o.scrollbarFiller.style.width=a.right+"px"):o.scrollbarFiller.style.display="",a.bottom&&n.options.coverGutterNextToScrollbar&&n.options.fixedGutter?(o.gutterFiller.style.display="block",o.gutterFiller.style.height=a.bottom+"px",o.gutterFiller.style.width=i.gutterWidth+"px"):o.gutterFiller.style.display=""}var df={native:cr,null:$s};function pf(n){n.display.scrollbars&&(n.display.scrollbars.clear(),n.display.scrollbars.addClass&&oe(n.display.wrapper,n.display.scrollbars.addClass)),n.display.scrollbars=new df[n.options.scrollbarStyle](function(i){n.display.wrapper.insertBefore(i,n.display.scrollbarFiller),Me(i,"mousedown",function(){n.state.focused&&setTimeout(function(){return n.display.input.focus()},0)}),i.setAttribute("cm-not-content","true")},function(i,o){o=="horizontal"?lr(n,i):Js(n,i)},n),n.display.scrollbars.addClass&&le(n.display.wrapper,n.display.scrollbars.addClass)}var tg=0;function ur(n){n.curOp={cm:n,viewChanged:!1,startHeight:n.doc.height,forceUpdate:!1,updateInput:0,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++tg,markArrays:null},Dm(n.curOp)}function fr(n){var i=n.curOp;i&&Nm(i,function(o){for(var a=0;a<o.ops.length;a++)o.ops[a].cm.curOp=null;ng(o)})}function ng(n){for(var i=n.ops,o=0;o<i.length;o++)ig(i[o]);for(var a=0;a<i.length;a++)rg(i[a]);for(var u=0;u<i.length;u++)sg(i[u]);for(var d=0;d<i.length;d++)ag(i[d]);for(var v=0;v<i.length;v++)og(i[v])}function ig(n){var i=n.cm,o=i.display;cg(i),n.updateMaxLine&&vl(i),n.mustUpdate=n.viewChanged||n.forceUpdate||n.scrollTop!=null||n.scrollToPos&&(n.scrollToPos.from.line<o.viewFrom||n.scrollToPos.to.line>=o.viewTo)||o.maxLineChanged&&i.options.lineWrapping,n.update=n.mustUpdate&&new eo(i,n.mustUpdate&&{top:n.scrollTop,ensure:n.scrollToPos},n.forceUpdate)}function rg(n){n.updatedDisplay=n.mustUpdate&&Ul(n.cm,n.update)}function sg(n){var i=n.cm,o=i.display;n.updatedDisplay&&Ja(i),n.barMeasure=Qs(i),o.maxLineChanged&&!i.options.lineWrapping&&(n.adjustWidthTo=Yu(i,o.maxLine,o.maxLine.text.length).left+3,i.display.sizerWidth=n.adjustWidthTo,n.barMeasure.scrollWidth=Math.max(o.scroller.clientWidth,o.sizer.offsetLeft+n.adjustWidthTo+ri(i)+i.display.barWidth),n.maxScrollLeft=Math.max(0,o.sizer.offsetLeft+n.adjustWidthTo-rr(i))),(n.updatedDisplay||n.selectionChanged)&&(n.preparedSelection=o.input.prepareSelection())}function ag(n){var i=n.cm;n.adjustWidthTo!=null&&(i.display.sizer.style.minWidth=n.adjustWidthTo+"px",n.maxScrollLeft<i.doc.scrollLeft&&lr(i,Math.min(i.display.scroller.scrollLeft,n.maxScrollLeft),!0),i.display.maxLineChanged=!1);var o=n.focus&&n.focus==Z(he(i));n.preparedSelection&&i.display.input.showSelection(n.preparedSelection,o),(n.updatedDisplay||n.startHeight!=i.doc.height)&&Vr(i,n.barMeasure),n.updatedDisplay&&Bl(i,n.barMeasure),n.selectionChanged&&Ll(i),i.state.focused&&n.updateInput&&i.display.input.reset(n.typing),o&&lf(n.cm)}function og(n){var i=n.cm,o=i.display,a=i.doc;if(n.updatedDisplay&&mf(i,n.update),o.wheelStartX!=null&&(n.scrollTop!=null||n.scrollLeft!=null||n.scrollToPos)&&(o.wheelStartX=o.wheelStartY=null),n.scrollTop!=null&&ff(i,n.scrollTop,n.forceScroll),n.scrollLeft!=null&&lr(i,n.scrollLeft,!0,!0),n.scrollToPos){var u=Qm(i,He(a,n.scrollToPos.from),He(a,n.scrollToPos.to),n.scrollToPos.margin);Jm(i,u)}var d=n.maybeHiddenMarkers,v=n.maybeUnhiddenMarkers;if(d)for(var y=0;y<d.length;++y)d[y].lines.length||_e(d[y],"hide");if(v)for(var b=0;b<v.length;++b)v[b].lines.length&&_e(v[b],"unhide");o.wrapper.offsetHeight&&(a.scrollTop=i.display.scroller.scrollTop),n.changeObjs&&_e(i,"changes",i,n.changeObjs),n.update&&n.update.finish()}function Ln(n,i){if(n.curOp)return i();ur(n);try{return i()}finally{fr(n)}}function nn(n,i){return function(){if(n.curOp)return i.apply(n,arguments);ur(n);try{return i.apply(n,arguments)}finally{fr(n)}}}function gn(n){return function(){if(this.curOp)return n.apply(this,arguments);ur(this);try{return n.apply(this,arguments)}finally{fr(this)}}}function rn(n){return function(){var i=this.cm;if(!i||i.curOp)return n.apply(this,arguments);ur(i);try{return n.apply(this,arguments)}finally{fr(i)}}}function ea(n,i){n.doc.highlightFrontier<n.display.viewTo&&n.state.highlight.set(i,We(lg,n))}function lg(n){var i=n.doc;if(!(i.highlightFrontier>=n.display.viewTo)){var o=+new Date+n.options.workTime,a=Ws(n,i.highlightFrontier),u=[];i.iter(a.line,Math.min(i.first+i.size,n.display.viewTo+500),function(d){if(a.line>=n.display.viewFrom){var v=d.styles,y=d.text.length>n.options.maxHighlightLength?Ze(i.mode,a.state):null,b=Su(n,d,a,!0);y&&(a.state=y),d.styles=b.styles;var E=d.styleClasses,D=b.classes;D?d.styleClasses=D:E&&(d.styleClasses=null);for(var F=!v||v.length!=d.styles.length||E!=D&&(!E||!D||E.bgClass!=D.bgClass||E.textClass!=D.textClass),q=0;!F&&q<v.length;++q)F=v[q]!=d.styles[q];F&&u.push(a.line),d.stateAfter=a.save(),a.nextLine()}else d.text.length<=n.options.maxHighlightLength&&fl(n,d.text,a),d.stateAfter=a.line%5==0?a.save():null,a.nextLine();if(+new Date>o)return ea(n,n.options.workDelay),!0}),i.highlightFrontier=a.line,i.modeFrontier=Math.max(i.modeFrontier,a.line),u.length&&Ln(n,function(){for(var d=0;d<u.length;d++)Ui(n,u[d],"text")})}}var eo=function(n,i,o){var a=n.display;this.viewport=i,this.visible=Qa(a,n.doc,i),this.editorIsHidden=!a.wrapper.offsetWidth,this.wrapperHeight=a.wrapper.clientHeight,this.wrapperWidth=a.wrapper.clientWidth,this.oldDisplayWidth=rr(n),this.force=o,this.dims=Al(n),this.events=[]};eo.prototype.signal=function(n,i){Fe(n,i)&&this.events.push(arguments)},eo.prototype.finish=function(){for(var n=0;n<this.events.length;n++)_e.apply(null,this.events[n])};function cg(n){var i=n.display;!i.scrollbarsClipped&&i.scroller.offsetWidth&&(i.nativeBarWidth=i.scroller.offsetWidth-i.scroller.clientWidth,i.heightForcer.style.height=ri(n)+"px",i.sizer.style.marginBottom=-i.nativeBarWidth+"px",i.sizer.style.borderRightWidth=ri(n)+"px",i.scrollbarsClipped=!0)}function ug(n){if(n.hasFocus())return null;var i=Z(he(n));if(!i||!Q(n.display.lineDiv,i))return null;var o={activeElt:i};if(window.getSelection){var a=Ge(n).getSelection();a.anchorNode&&a.extend&&Q(n.display.lineDiv,a.anchorNode)&&(o.anchorNode=a.anchorNode,o.anchorOffset=a.anchorOffset,o.focusNode=a.focusNode,o.focusOffset=a.focusOffset)}return o}function fg(n){if(!(!n||!n.activeElt||n.activeElt==Z(we(n.activeElt)))&&(n.activeElt.focus(),!/^(INPUT|TEXTAREA)$/.test(n.activeElt.nodeName)&&n.anchorNode&&Q(document.body,n.anchorNode)&&Q(document.body,n.focusNode))){var i=n.activeElt.ownerDocument,o=i.defaultView.getSelection(),a=i.createRange();a.setEnd(n.anchorNode,n.anchorOffset),a.collapse(!1),o.removeAllRanges(),o.addRange(a),o.extend(n.focusNode,n.focusOffset)}}function Ul(n,i){var o=n.display,a=n.doc;if(i.editorIsHidden)return Oi(n),!1;if(!i.force&&i.visible.from>=o.viewFrom&&i.visible.to<=o.viewTo&&(o.updateLineNumbers==null||o.updateLineNumbers>=o.viewTo)&&o.renderedView==o.view&&af(n)==0)return!1;vf(n)&&(Oi(n),i.dims=Al(n));var u=a.first+a.size,d=Math.max(i.visible.from-n.options.viewportMargin,a.first),v=Math.min(u,i.visible.to+n.options.viewportMargin);o.viewFrom<d&&d-o.viewFrom<20&&(d=Math.max(a.first,o.viewFrom)),o.viewTo>v&&o.viewTo-v<20&&(v=Math.min(u,o.viewTo)),pi&&(d=ml(n.doc,d),v=Uu(n.doc,v));var y=d!=o.viewFrom||v!=o.viewTo||o.lastWrapHeight!=i.wrapperHeight||o.lastWrapWidth!=i.wrapperWidth;jm(n,d,v),o.viewOffset=mi(Ae(n.doc,o.viewFrom)),n.display.mover.style.top=o.viewOffset+"px";var b=af(n);if(!y&&b==0&&!i.force&&o.renderedView==o.view&&(o.updateLineNumbers==null||o.updateLineNumbers>=o.viewTo))return!1;var E=ug(n);return b>4&&(o.lineDiv.style.display="none"),hg(n,o.updateLineNumbers,i.dims),b>4&&(o.lineDiv.style.display=""),o.renderedView=o.view,fg(E),pe(o.cursorDiv),pe(o.selectionDiv),o.gutters.style.height=o.sizer.style.minHeight=0,y&&(o.lastWrapHeight=i.wrapperHeight,o.lastWrapWidth=i.wrapperWidth,ea(n,400)),o.updateLineNumbers=null,!0}function mf(n,i){for(var o=i.viewport,a=!0;;a=!1){if(!a||!n.options.lineWrapping||i.oldDisplayWidth==rr(n)){if(o&&o.top!=null&&(o={top:Math.min(n.doc.height+xl(n.display)-yl(n),o.top)}),i.visible=Qa(n.display,n.doc,o),i.visible.from>=n.display.viewFrom&&i.visible.to<=n.display.viewTo)break}else a&&(i.visible=Qa(n.display,n.doc,o));if(!Ul(n,i))break;Ja(n);var u=Qs(n);js(n),Vr(n,u),Bl(n,u),i.force=!1}i.signal(n,"update",n),(n.display.viewFrom!=n.display.reportedViewFrom||n.display.viewTo!=n.display.reportedViewTo)&&(i.signal(n,"viewportChange",n,n.display.viewFrom,n.display.viewTo),n.display.reportedViewFrom=n.display.viewFrom,n.display.reportedViewTo=n.display.viewTo)}function Ol(n,i){var o=new eo(n,i);if(Ul(n,o)){Ja(n),mf(n,o);var a=Qs(n);js(n),Vr(n,a),Bl(n,a),o.finish()}}function hg(n,i,o){var a=n.display,u=n.options.lineNumbers,d=a.lineDiv,v=d.firstChild;function y(ne){var ce=ne.nextSibling;return g&&W&&n.display.currentWheelTarget==ne?ne.style.display="none":ne.parentNode.removeChild(ne),ce}for(var b=a.view,E=a.viewFrom,D=0;D<b.length;D++){var F=b[D];if(!F.hidden)if(!F.node||F.node.parentNode!=d){var q=km(n,F,E,o);d.insertBefore(q,v)}else{for(;v!=F.node;)v=y(v);var G=u&&i!=null&&i<=E&&F.lineNumber;F.changes&&(Je(F.changes,"gutter")>-1&&(G=!1),Hu(n,F,E,o)),G&&(pe(F.lineNumber),F.lineNumber.appendChild(document.createTextNode(It(n.options,E)))),v=F.node.nextSibling}E+=F.size}for(;v;)v=y(v)}function Fl(n){var i=n.gutters.offsetWidth;n.sizer.style.marginLeft=i+"px",tn(n,"gutterChanged",n)}function Bl(n,i){n.display.sizer.style.minHeight=i.docHeight+"px",n.display.heightForcer.style.top=i.docHeight+"px",n.display.gutters.style.height=i.docHeight+n.display.barHeight+ri(n)+"px"}function gf(n){var i=n.display,o=i.view;if(!(!i.alignWidgets&&(!i.gutters.firstChild||!n.options.fixedGutter))){for(var a=wl(i)-i.scroller.scrollLeft+n.doc.scrollLeft,u=i.gutters.offsetWidth,d=a+"px",v=0;v<o.length;v++)if(!o[v].hidden){n.options.fixedGutter&&(o[v].gutter&&(o[v].gutter.style.left=d),o[v].gutterBackground&&(o[v].gutterBackground.style.left=d));var y=o[v].alignable;if(y)for(var b=0;b<y.length;b++)y[b].style.left=d}n.options.fixedGutter&&(i.gutters.style.left=a+u+"px")}}function vf(n){if(!n.options.lineNumbers)return!1;var i=n.doc,o=It(n.options,i.first+i.size-1),a=n.display;if(o.length!=a.lineNumChars){var u=a.measure.appendChild(X("div",[X("div",o)],"CodeMirror-linenumber CodeMirror-gutter-elt")),d=u.firstChild.offsetWidth,v=u.offsetWidth-d;return a.lineGutter.style.width="",a.lineNumInnerWidth=Math.max(d,a.lineGutter.offsetWidth-v)+1,a.lineNumWidth=a.lineNumInnerWidth+v,a.lineNumChars=a.lineNumInnerWidth?o.length:-1,a.lineGutter.style.width=a.lineNumWidth+"px",Fl(n.display),!0}return!1}function kl(n,i){for(var o=[],a=!1,u=0;u<n.length;u++){var d=n[u],v=null;if(typeof d!="string"&&(v=d.style,d=d.className),d=="CodeMirror-linenumbers")if(i)a=!0;else continue;o.push({className:d,style:v})}return i&&!a&&o.push({className:"CodeMirror-linenumbers",style:null}),o}function _f(n){var i=n.gutters,o=n.gutterSpecs;pe(i),n.lineGutter=null;for(var a=0;a<o.length;++a){var u=o[a],d=u.className,v=u.style,y=i.appendChild(X("div",null,"CodeMirror-gutter "+d));v&&(y.style.cssText=v),d=="CodeMirror-linenumbers"&&(n.lineGutter=y,y.style.width=(n.lineNumWidth||1)+"px")}i.style.display=o.length?"":"none",Fl(n)}function ta(n){_f(n.display),Sn(n),gf(n)}function dg(n,i,o,a){var u=this;this.input=o,u.scrollbarFiller=X("div",null,"CodeMirror-scrollbar-filler"),u.scrollbarFiller.setAttribute("cm-not-content","true"),u.gutterFiller=X("div",null,"CodeMirror-gutter-filler"),u.gutterFiller.setAttribute("cm-not-content","true"),u.lineDiv=H("div",null,"CodeMirror-code"),u.selectionDiv=X("div",null,null,"position: relative; z-index: 1"),u.cursorDiv=X("div",null,"CodeMirror-cursors"),u.measure=X("div",null,"CodeMirror-measure"),u.lineMeasure=X("div",null,"CodeMirror-measure"),u.lineSpace=H("div",[u.measure,u.lineMeasure,u.selectionDiv,u.cursorDiv,u.lineDiv],null,"position: relative; outline: none");var d=H("div",[u.lineSpace],"CodeMirror-lines");u.mover=X("div",[d],null,"position: relative"),u.sizer=X("div",[u.mover],"CodeMirror-sizer"),u.sizerWidth=null,u.heightForcer=X("div",null,null,"position: absolute; height: "+ee+"px; width: 1px;"),u.gutters=X("div",null,"CodeMirror-gutters"),u.lineGutter=null,u.scroller=X("div",[u.sizer,u.heightForcer,u.gutters],"CodeMirror-scroll"),u.scroller.setAttribute("tabIndex","-1"),u.wrapper=X("div",[u.scrollbarFiller,u.gutterFiller,u.scroller],"CodeMirror"),x&&T===105&&(u.wrapper.style.clipPath="inset(0px)"),u.wrapper.setAttribute("translate","no"),p&&m<8&&(u.gutters.style.zIndex=-1,u.scroller.style.paddingRight=0),!g&&!(s&&N)&&(u.scroller.draggable=!0),n&&(n.appendChild?n.appendChild(u.wrapper):n(u.wrapper)),u.viewFrom=u.viewTo=i.first,u.reportedViewFrom=u.reportedViewTo=i.first,u.view=[],u.renderedView=null,u.externalMeasured=null,u.viewOffset=0,u.lastWrapHeight=u.lastWrapWidth=0,u.updateLineNumbers=null,u.nativeBarWidth=u.barHeight=u.barWidth=0,u.scrollbarsClipped=!1,u.lineNumWidth=u.lineNumInnerWidth=u.lineNumChars=null,u.alignWidgets=!1,u.cachedCharWidth=u.cachedTextHeight=u.cachedPaddingH=null,u.maxLine=null,u.maxLineLength=0,u.maxLineChanged=!1,u.wheelDX=u.wheelDY=u.wheelStartX=u.wheelStartY=null,u.shift=!1,u.selForContextMenu=null,u.activeTouch=null,u.gutterSpecs=kl(a.gutters,a.lineNumbers),_f(u),o.init(u)}var to=0,vi=null;p?vi=-.53:s?vi=15:x?vi=-.7:w&&(vi=-1/3);function xf(n){var i=n.wheelDeltaX,o=n.wheelDeltaY;return i==null&&n.detail&&n.axis==n.HORIZONTAL_AXIS&&(i=n.detail),o==null&&n.detail&&n.axis==n.VERTICAL_AXIS?o=n.detail:o==null&&(o=n.wheelDelta),{x:i,y:o}}function pg(n){var i=xf(n);return i.x*=vi,i.y*=vi,i}function yf(n,i){x&&T==102&&(n.display.chromeScrollHack==null?n.display.sizer.style.pointerEvents="none":clearTimeout(n.display.chromeScrollHack),n.display.chromeScrollHack=setTimeout(function(){n.display.chromeScrollHack=null,n.display.sizer.style.pointerEvents=""},100));var o=xf(i),a=o.x,u=o.y,d=vi;i.deltaMode===0&&(a=i.deltaX,u=i.deltaY,d=1);var v=n.display,y=v.scroller,b=y.scrollWidth>y.clientWidth,E=y.scrollHeight>y.clientHeight;if(a&&b||u&&E){if(u&&W&&g){e:for(var D=i.target,F=v.view;D!=y;D=D.parentNode)for(var q=0;q<F.length;q++)if(F[q].node==D){n.display.currentWheelTarget=D;break e}}if(a&&!s&&!A&&d!=null){u&&E&&Js(n,Math.max(0,y.scrollTop+u*d)),lr(n,Math.max(0,y.scrollLeft+a*d)),(!u||u&&E)&&ht(i),v.wheelStartX=null;return}if(u&&d!=null){var G=u*d,ne=n.doc.scrollTop,ce=ne+v.wrapper.clientHeight;G<0?ne=Math.max(0,ne+G-50):ce=Math.min(n.doc.height,ce+G+50),Ol(n,{top:ne,bottom:ce})}to<20&&i.deltaMode!==0&&(v.wheelStartX==null?(v.wheelStartX=y.scrollLeft,v.wheelStartY=y.scrollTop,v.wheelDX=a,v.wheelDY=u,setTimeout(function(){if(v.wheelStartX!=null){var ge=y.scrollLeft-v.wheelStartX,Te=y.scrollTop-v.wheelStartY,Ce=Te&&v.wheelDY&&Te/v.wheelDY||ge&&v.wheelDX&&ge/v.wheelDX;v.wheelStartX=v.wheelStartY=null,Ce&&(vi=(vi*to+Ce)/(to+1),++to)}},200)):(v.wheelDX+=a,v.wheelDY+=u))}}var On=function(n,i){this.ranges=n,this.primIndex=i};On.prototype.primary=function(){return this.ranges[this.primIndex]},On.prototype.equals=function(n){if(n==this)return!0;if(n.primIndex!=this.primIndex||n.ranges.length!=this.ranges.length)return!1;for(var i=0;i<this.ranges.length;i++){var o=this.ranges[i],a=n.ranges[i];if(!di(o.anchor,a.anchor)||!di(o.head,a.head))return!1}return!0},On.prototype.deepCopy=function(){for(var n=[],i=0;i<this.ranges.length;i++)n[i]=new Tt(nr(this.ranges[i].anchor),nr(this.ranges[i].head));return new On(n,this.primIndex)},On.prototype.somethingSelected=function(){for(var n=0;n<this.ranges.length;n++)if(!this.ranges[n].empty())return!0;return!1},On.prototype.contains=function(n,i){i||(i=n);for(var o=0;o<this.ranges.length;o++){var a=this.ranges[o];if(tt(i,a.from())>=0&&tt(n,a.to())<=0)return o}return-1};var Tt=function(n,i){this.anchor=n,this.head=i};Tt.prototype.from=function(){return kn(this.anchor,this.head)},Tt.prototype.to=function(){return qt(this.anchor,this.head)},Tt.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch};function jn(n,i,o){var a=n&&n.options.selectionsMayTouch,u=i[o];i.sort(function(q,G){return tt(q.from(),G.from())}),o=Je(i,u);for(var d=1;d<i.length;d++){var v=i[d],y=i[d-1],b=tt(y.to(),v.from());if(a&&!v.empty()?b>0:b>=0){var E=kn(y.from(),v.from()),D=qt(y.to(),v.to()),F=y.empty()?v.from()==v.head:y.from()==y.head;d<=o&&--o,i.splice(--d,2,new Tt(F?D:E,F?E:D))}}return new On(i,o)}function Fi(n,i){return new On([new Tt(n,i||n)],0)}function Bi(n){return n.text?ue(n.from.line+n.text.length-1,C(n.text).length+(n.text.length==1?n.from.ch:0)):n.to}function Sf(n,i){if(tt(n,i.from)<0)return n;if(tt(n,i.to)<=0)return Bi(i);var o=n.line+i.text.length-(i.to.line-i.from.line)-1,a=n.ch;return n.line==i.to.line&&(a+=Bi(i).ch-i.to.ch),ue(o,a)}function Hl(n,i){for(var o=[],a=0;a<n.sel.ranges.length;a++){var u=n.sel.ranges[a];o.push(new Tt(Sf(u.anchor,i),Sf(u.head,i)))}return jn(n.cm,o,n.sel.primIndex)}function Mf(n,i,o){return n.line==i.line?ue(o.line,n.ch-i.ch+o.ch):ue(o.line+(n.line-i.line),n.ch)}function mg(n,i,o){for(var a=[],u=ue(n.first,0),d=u,v=0;v<i.length;v++){var y=i[v],b=Mf(y.from,u,d),E=Mf(Bi(y),u,d);if(u=y.to,d=E,o=="around"){var D=n.sel.ranges[v],F=tt(D.head,D.anchor)<0;a[v]=new Tt(F?E:b,F?b:E)}else a[v]=new Tt(b,b)}return new On(a,n.sel.primIndex)}function zl(n){n.doc.mode=De(n.options,n.doc.modeOption),na(n)}function na(n){n.doc.iter(function(i){i.stateAfter&&(i.stateAfter=null),i.styles&&(i.styles=null)}),n.doc.modeFrontier=n.doc.highlightFrontier=n.doc.first,ea(n,100),n.state.modeGen++,n.curOp&&Sn(n)}function Tf(n,i){return i.from.ch==0&&i.to.ch==0&&C(i.text)==""&&(!n.cm||n.cm.options.wholeLineUpdateBefore)}function Gl(n,i,o,a){function u(Ce){return o?o[Ce]:null}function d(Ce,be,Pe){Tm(Ce,be,Pe,a),tn(Ce,"change",Ce,i)}function v(Ce,be){for(var Pe=[],qe=Ce;qe<be;++qe)Pe.push(new Fr(E[qe],u(qe),a));return Pe}var y=i.from,b=i.to,E=i.text,D=Ae(n,y.line),F=Ae(n,b.line),q=C(E),G=u(E.length-1),ne=b.line-y.line;if(i.full)n.insert(0,v(0,E.length)),n.remove(E.length,n.size-E.length);else if(Tf(n,i)){var ce=v(0,E.length-1);d(F,F.text,G),ne&&n.remove(y.line,ne),ce.length&&n.insert(y.line,ce)}else if(D==F)if(E.length==1)d(D,D.text.slice(0,y.ch)+q+D.text.slice(b.ch),G);else{var ge=v(1,E.length-1);ge.push(new Fr(q+D.text.slice(b.ch),G,a)),d(D,D.text.slice(0,y.ch)+E[0],u(0)),n.insert(y.line+1,ge)}else if(E.length==1)d(D,D.text.slice(0,y.ch)+E[0]+F.text.slice(b.ch),u(0)),n.remove(y.line+1,ne);else{d(D,D.text.slice(0,y.ch)+E[0],u(0)),d(F,q+F.text.slice(b.ch),G);var Te=v(1,E.length-1);ne>1&&n.remove(y.line+1,ne-1),n.insert(y.line+1,Te)}tn(n,"change",n,i)}function ki(n,i,o){function a(u,d,v){if(u.linked)for(var y=0;y<u.linked.length;++y){var b=u.linked[y];if(b.doc!=d){var E=v&&b.sharedHist;o&&!E||(i(b.doc,E),a(b.doc,u,E))}}}a(n,null,!0)}function bf(n,i){if(i.cm)throw new Error("This document is already in use.");n.doc=i,i.cm=n,Cl(n),zl(n),Ef(n),n.options.direction=i.direction,n.options.lineWrapping||vl(n),n.options.mode=i.modeOption,Sn(n)}function Ef(n){(n.doc.direction=="rtl"?le:oe)(n.display.lineDiv,"CodeMirror-rtl")}function gg(n){Ln(n,function(){Ef(n),Sn(n)})}function no(n){this.done=[],this.undone=[],this.undoDepth=n?n.undoDepth:1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=n?n.maxGeneration:1}function Wl(n,i){var o={from:nr(i.from),to:Bi(i),text:Xt(n,i.from,i.to)};return Cf(n,o,i.from.line,i.to.line+1),ki(n,function(a){return Cf(a,o,i.from.line,i.to.line+1)},!0),o}function Af(n){for(;n.length;){var i=C(n);if(i.ranges)n.pop();else break}}function vg(n,i){if(i)return Af(n.done),C(n.done);if(n.done.length&&!C(n.done).ranges)return C(n.done);if(n.done.length>1&&!n.done[n.done.length-2].ranges)return n.done.pop(),C(n.done)}function wf(n,i,o,a){var u=n.history;u.undone.length=0;var d=+new Date,v,y;if((u.lastOp==a||u.lastOrigin==i.origin&&i.origin&&(i.origin.charAt(0)=="+"&&u.lastModTime>d-(n.cm?n.cm.options.historyEventDelay:500)||i.origin.charAt(0)=="*"))&&(v=vg(u,u.lastOp==a)))y=C(v.changes),tt(i.from,i.to)==0&&tt(i.from,y.to)==0?y.to=Bi(i):v.changes.push(Wl(n,i));else{var b=C(u.done);for((!b||!b.ranges)&&io(n.sel,u.done),v={changes:[Wl(n,i)],generation:u.generation},u.done.push(v);u.done.length>u.undoDepth;)u.done.shift(),u.done[0].ranges||u.done.shift()}u.done.push(o),u.generation=++u.maxGeneration,u.lastModTime=u.lastSelTime=d,u.lastOp=u.lastSelOp=a,u.lastOrigin=u.lastSelOrigin=i.origin,y||_e(n,"historyAdded")}function _g(n,i,o,a){var u=i.charAt(0);return u=="*"||u=="+"&&o.ranges.length==a.ranges.length&&o.somethingSelected()==a.somethingSelected()&&new Date-n.history.lastSelTime<=(n.cm?n.cm.options.historyEventDelay:500)}function xg(n,i,o,a){var u=n.history,d=a&&a.origin;o==u.lastSelOp||d&&u.lastSelOrigin==d&&(u.lastModTime==u.lastSelTime&&u.lastOrigin==d||_g(n,d,C(u.done),i))?u.done[u.done.length-1]=i:io(i,u.done),u.lastSelTime=+new Date,u.lastSelOrigin=d,u.lastSelOp=o,a&&a.clearRedo!==!1&&Af(u.undone)}function io(n,i){var o=C(i);o&&o.ranges&&o.equals(n)||i.push(n)}function Cf(n,i,o,a){var u=i["spans_"+n.id],d=0;n.iter(Math.max(n.first,o),Math.min(n.first+n.size,a),function(v){v.markedSpans&&((u||(u=i["spans_"+n.id]={}))[d]=v.markedSpans),++d})}function yg(n){if(!n)return null;for(var i,o=0;o<n.length;++o)n[o].marker.explicitlyCleared?i||(i=n.slice(0,o)):i&&i.push(n[o]);return i?i.length?i:null:n}function Sg(n,i){var o=i["spans_"+n.id];if(!o)return null;for(var a=[],u=0;u<i.text.length;++u)a.push(yg(o[u]));return a}function Rf(n,i){var o=Sg(n,i),a=dl(n,i);if(!o)return a;if(!a)return o;for(var u=0;u<o.length;++u){var d=o[u],v=a[u];if(d&&v)e:for(var y=0;y<v.length;++y){for(var b=v[y],E=0;E<d.length;++E)if(d[E].marker==b.marker)continue e;d.push(b)}else v&&(o[u]=v)}return o}function Xr(n,i,o){for(var a=[],u=0;u<n.length;++u){var d=n[u];if(d.ranges){a.push(o?On.prototype.deepCopy.call(d):d);continue}var v=d.changes,y=[];a.push({changes:y});for(var b=0;b<v.length;++b){var E=v[b],D=void 0;if(y.push({from:E.from,to:E.to,text:E.text}),i)for(var F in E)(D=F.match(/^spans_(\d+)$/))&&Je(i,Number(D[1]))>-1&&(C(y)[F]=E[F],delete E[F])}}return a}function Vl(n,i,o,a){if(a){var u=n.anchor;if(o){var d=tt(i,u)<0;d!=tt(o,u)<0?(u=i,i=o):d!=tt(i,o)<0&&(i=o)}return new Tt(u,i)}else return new Tt(o||i,i)}function ro(n,i,o,a,u){u==null&&(u=n.cm&&(n.cm.display.shift||n.extend)),dn(n,new On([Vl(n.sel.primary(),i,o,u)],0),a)}function Lf(n,i,o){for(var a=[],u=n.cm&&(n.cm.display.shift||n.extend),d=0;d<n.sel.ranges.length;d++)a[d]=Vl(n.sel.ranges[d],i[d],null,u);var v=jn(n.cm,a,n.sel.primIndex);dn(n,v,o)}function Xl(n,i,o,a){var u=n.sel.ranges.slice(0);u[i]=o,dn(n,jn(n.cm,u,n.sel.primIndex),a)}function Pf(n,i,o,a){dn(n,Fi(i,o),a)}function Mg(n,i,o){var a={ranges:i.ranges,update:function(u){this.ranges=[];for(var d=0;d<u.length;d++)this.ranges[d]=new Tt(He(n,u[d].anchor),He(n,u[d].head))},origin:o&&o.origin};return _e(n,"beforeSelectionChange",n,a),n.cm&&_e(n.cm,"beforeSelectionChange",n.cm,a),a.ranges!=i.ranges?jn(n.cm,a.ranges,a.ranges.length-1):i}function Df(n,i,o){var a=n.history.done,u=C(a);u&&u.ranges?(a[a.length-1]=i,so(n,i,o)):dn(n,i,o)}function dn(n,i,o){so(n,i,o),xg(n,n.sel,n.cm?n.cm.curOp.id:NaN,o)}function so(n,i,o){(Fe(n,"beforeSelectionChange")||n.cm&&Fe(n.cm,"beforeSelectionChange"))&&(i=Mg(n,i,o));var a=o&&o.bias||(tt(i.primary().head,n.sel.primary().head)<0?-1:1);If(n,Uf(n,i,a,!0)),!(o&&o.scroll===!1)&&n.cm&&n.cm.getOption("readOnly")!="nocursor"&&Wr(n.cm)}function If(n,i){i.equals(n.sel)||(n.sel=i,n.cm&&(n.cm.curOp.updateInput=1,n.cm.curOp.selectionChanged=!0,it(n.cm)),tn(n,"cursorActivity",n))}function Nf(n){If(n,Uf(n,n.sel,null,!1))}function Uf(n,i,o,a){for(var u,d=0;d<i.ranges.length;d++){var v=i.ranges[d],y=i.ranges.length==n.sel.ranges.length&&n.sel.ranges[d],b=ao(n,v.anchor,y&&y.anchor,o,a),E=v.head==v.anchor?b:ao(n,v.head,y&&y.head,o,a);(u||b!=v.anchor||E!=v.head)&&(u||(u=i.ranges.slice(0,d)),u[d]=new Tt(b,E))}return u?jn(n.cm,u,i.primIndex):i}function qr(n,i,o,a,u){var d=Ae(n,i.line);if(d.markedSpans)for(var v=0;v<d.markedSpans.length;++v){var y=d.markedSpans[v],b=y.marker,E="selectLeft"in b?!b.selectLeft:b.inclusiveLeft,D="selectRight"in b?!b.selectRight:b.inclusiveRight;if((y.from==null||(E?y.from<=i.ch:y.from<i.ch))&&(y.to==null||(D?y.to>=i.ch:y.to>i.ch))){if(u&&(_e(b,"beforeCursorEnter"),b.explicitlyCleared))if(d.markedSpans){--v;continue}else break;if(!b.atomic)continue;if(o){var F=b.find(a<0?1:-1),q=void 0;if((a<0?D:E)&&(F=Of(n,F,-a,F&&F.line==i.line?d:null)),F&&F.line==i.line&&(q=tt(F,o))&&(a<0?q<0:q>0))return qr(n,F,i,a,u)}var G=b.find(a<0?-1:1);return(a<0?E:D)&&(G=Of(n,G,a,G.line==i.line?d:null)),G?qr(n,G,i,a,u):null}}return i}function ao(n,i,o,a,u){var d=a||1,v=qr(n,i,o,d,u)||!u&&qr(n,i,o,d,!0)||qr(n,i,o,-d,u)||!u&&qr(n,i,o,-d,!0);return v||(n.cantEdit=!0,ue(n.first,0))}function Of(n,i,o,a){return o<0&&i.ch==0?i.line>n.first?He(n,ue(i.line-1)):null:o>0&&i.ch==(a||Ae(n,i.line)).text.length?i.line<n.first+n.size-1?ue(i.line+1,0):null:new ue(i.line,i.ch+o)}function Ff(n){n.setSelection(ue(n.firstLine(),0),ue(n.lastLine()),ke)}function Bf(n,i,o){var a={canceled:!1,from:i.from,to:i.to,text:i.text,origin:i.origin,cancel:function(){return a.canceled=!0}};return o&&(a.update=function(u,d,v,y){u&&(a.from=He(n,u)),d&&(a.to=He(n,d)),v&&(a.text=v),y!==void 0&&(a.origin=y)}),_e(n,"beforeChange",n,a),n.cm&&_e(n.cm,"beforeChange",n.cm,a),a.canceled?(n.cm&&(n.cm.curOp.updateInput=2),null):{from:a.from,to:a.to,text:a.text,origin:a.origin}}function Yr(n,i,o){if(n.cm){if(!n.cm.curOp)return nn(n.cm,Yr)(n,i,o);if(n.cm.state.suppressEdits)return}if(!((Fe(n,"beforeChange")||n.cm&&Fe(n.cm,"beforeChange"))&&(i=Bf(n,i,!0),!i))){var a=Cu&&!o&&xm(n,i.from,i.to);if(a)for(var u=a.length-1;u>=0;--u)kf(n,{from:a[u].from,to:a[u].to,text:u?[""]:i.text,origin:i.origin});else kf(n,i)}}function kf(n,i){if(!(i.text.length==1&&i.text[0]==""&&tt(i.from,i.to)==0)){var o=Hl(n,i);wf(n,i,o,n.cm?n.cm.curOp.id:NaN),ia(n,i,o,dl(n,i));var a=[];ki(n,function(u,d){!d&&Je(a,u.history)==-1&&(Wf(u.history,i),a.push(u.history)),ia(u,i,null,dl(u,i))})}}function oo(n,i,o){var a=n.cm&&n.cm.state.suppressEdits;if(!(a&&!o)){for(var u=n.history,d,v=n.sel,y=i=="undo"?u.done:u.undone,b=i=="undo"?u.undone:u.done,E=0;E<y.length&&(d=y[E],!(o?d.ranges&&!d.equals(n.sel):!d.ranges));E++);if(E!=y.length){for(u.lastOrigin=u.lastSelOrigin=null;;)if(d=y.pop(),d.ranges){if(io(d,b),o&&!d.equals(n.sel)){dn(n,d,{clearRedo:!1});return}v=d}else if(a){y.push(d);return}else break;var D=[];io(v,b),b.push({changes:D,generation:u.generation}),u.generation=d.generation||++u.maxGeneration;for(var F=Fe(n,"beforeChange")||n.cm&&Fe(n.cm,"beforeChange"),q=function(ce){var ge=d.changes[ce];if(ge.origin=i,F&&!Bf(n,ge,!1))return y.length=0,{};D.push(Wl(n,ge));var Te=ce?Hl(n,ge):C(y);ia(n,ge,Te,Rf(n,ge)),!ce&&n.cm&&n.cm.scrollIntoView({from:ge.from,to:Bi(ge)});var Ce=[];ki(n,function(be,Pe){!Pe&&Je(Ce,be.history)==-1&&(Wf(be.history,ge),Ce.push(be.history)),ia(be,ge,null,Rf(be,ge))})},G=d.changes.length-1;G>=0;--G){var ne=q(G);if(ne)return ne.v}}}}function Hf(n,i){if(i!=0&&(n.first+=i,n.sel=new On($(n.sel.ranges,function(u){return new Tt(ue(u.anchor.line+i,u.anchor.ch),ue(u.head.line+i,u.head.ch))}),n.sel.primIndex),n.cm)){Sn(n.cm,n.first,n.first-i,i);for(var o=n.cm.display,a=o.viewFrom;a<o.viewTo;a++)Ui(n.cm,a,"gutter")}}function ia(n,i,o,a){if(n.cm&&!n.cm.curOp)return nn(n.cm,ia)(n,i,o,a);if(i.to.line<n.first){Hf(n,i.text.length-1-(i.to.line-i.from.line));return}if(!(i.from.line>n.lastLine())){if(i.from.line<n.first){var u=i.text.length-1-(n.first-i.from.line);Hf(n,u),i={from:ue(n.first,0),to:ue(i.to.line+u,i.to.ch),text:[C(i.text)],origin:i.origin}}var d=n.lastLine();i.to.line>d&&(i={from:i.from,to:ue(d,Ae(n,d).text.length),text:[i.text[0]],origin:i.origin}),i.removed=Xt(n,i.from,i.to),o||(o=Hl(n,i)),n.cm?Tg(n.cm,i,a):Gl(n,i,a),so(n,o,ke),n.cantEdit&&ao(n,ue(n.firstLine(),0))&&(n.cantEdit=!1)}}function Tg(n,i,o){var a=n.doc,u=n.display,d=i.from,v=i.to,y=!1,b=d.line;n.options.lineWrapping||(b=Ke(Yn(Ae(a,d.line))),a.iter(b,v.line+1,function(G){if(G==u.maxLine)return y=!0,!0})),a.sel.contains(i.from,i.to)>-1&&it(n),Gl(a,i,o,sf(n)),n.options.lineWrapping||(a.iter(b,d.line+i.text.length,function(G){var ne=Va(G);ne>u.maxLineLength&&(u.maxLine=G,u.maxLineLength=ne,u.maxLineChanged=!0,y=!1)}),y&&(n.curOp.updateMaxLine=!0)),hm(a,d.line),ea(n,400);var E=i.text.length-(v.line-d.line)-1;i.full?Sn(n):d.line==v.line&&i.text.length==1&&!Tf(n.doc,i)?Ui(n,d.line,"text"):Sn(n,d.line,v.line+1,E);var D=Fe(n,"changes"),F=Fe(n,"change");if(F||D){var q={from:d,to:v,text:i.text,removed:i.removed,origin:i.origin};F&&tn(n,"change",n,q),D&&(n.curOp.changeObjs||(n.curOp.changeObjs=[])).push(q)}n.display.selForContextMenu=null}function Kr(n,i,o,a,u){var d;a||(a=o),tt(a,o)<0&&(d=[a,o],o=d[0],a=d[1]),typeof i=="string"&&(i=n.splitLines(i)),Yr(n,{from:o,to:a,text:i,origin:u})}function zf(n,i,o,a){o<n.line?n.line+=a:i<n.line&&(n.line=i,n.ch=0)}function Gf(n,i,o,a){for(var u=0;u<n.length;++u){var d=n[u],v=!0;if(d.ranges){d.copied||(d=n[u]=d.deepCopy(),d.copied=!0);for(var y=0;y<d.ranges.length;y++)zf(d.ranges[y].anchor,i,o,a),zf(d.ranges[y].head,i,o,a);continue}for(var b=0;b<d.changes.length;++b){var E=d.changes[b];if(o<E.from.line)E.from=ue(E.from.line+a,E.from.ch),E.to=ue(E.to.line+a,E.to.ch);else if(i<=E.to.line){v=!1;break}}v||(n.splice(0,u+1),u=0)}}function Wf(n,i){var o=i.from.line,a=i.to.line,u=i.text.length-(a-o)-1;Gf(n.done,o,a,u),Gf(n.undone,o,a,u)}function ra(n,i,o,a){var u=i,d=i;return typeof i=="number"?d=Ae(n,Or(n,i)):u=Ke(i),u==null?null:(a(d,u)&&n.cm&&Ui(n.cm,u,o),d)}function sa(n){this.lines=n,this.parent=null;for(var i=0,o=0;o<n.length;++o)n[o].parent=this,i+=n[o].height;this.height=i}sa.prototype={chunkSize:function(){return this.lines.length},removeInner:function(n,i){for(var o=n,a=n+i;o<a;++o){var u=this.lines[o];this.height-=u.height,bm(u),tn(u,"delete")}this.lines.splice(n,i)},collapse:function(n){n.push.apply(n,this.lines)},insertInner:function(n,i,o){this.height+=o,this.lines=this.lines.slice(0,n).concat(i).concat(this.lines.slice(n));for(var a=0;a<i.length;++a)i[a].parent=this},iterN:function(n,i,o){for(var a=n+i;n<a;++n)if(o(this.lines[n]))return!0}};function aa(n){this.children=n;for(var i=0,o=0,a=0;a<n.length;++a){var u=n[a];i+=u.chunkSize(),o+=u.height,u.parent=this}this.size=i,this.height=o,this.parent=null}aa.prototype={chunkSize:function(){return this.size},removeInner:function(n,i){this.size-=i;for(var o=0;o<this.children.length;++o){var a=this.children[o],u=a.chunkSize();if(n<u){var d=Math.min(i,u-n),v=a.height;if(a.removeInner(n,d),this.height-=v-a.height,u==d&&(this.children.splice(o--,1),a.parent=null),(i-=d)==0)break;n=0}else n-=u}if(this.size-i<25&&(this.children.length>1||!(this.children[0]instanceof sa))){var y=[];this.collapse(y),this.children=[new sa(y)],this.children[0].parent=this}},collapse:function(n){for(var i=0;i<this.children.length;++i)this.children[i].collapse(n)},insertInner:function(n,i,o){this.size+=i.length,this.height+=o;for(var a=0;a<this.children.length;++a){var u=this.children[a],d=u.chunkSize();if(n<=d){if(u.insertInner(n,i,o),u.lines&&u.lines.length>50){for(var v=u.lines.length%25+25,y=v;y<u.lines.length;){var b=new sa(u.lines.slice(y,y+=25));u.height-=b.height,this.children.splice(++a,0,b),b.parent=this}u.lines=u.lines.slice(0,v),this.maybeSpill()}break}n-=d}},maybeSpill:function(){if(!(this.children.length<=10)){var n=this;do{var i=n.children.splice(n.children.length-5,5),o=new aa(i);if(n.parent){n.size-=o.size,n.height-=o.height;var u=Je(n.parent.children,n);n.parent.children.splice(u+1,0,o)}else{var a=new aa(n.children);a.parent=n,n.children=[a,o],n=a}o.parent=n.parent}while(n.children.length>10);n.parent.maybeSpill()}},iterN:function(n,i,o){for(var a=0;a<this.children.length;++a){var u=this.children[a],d=u.chunkSize();if(n<d){var v=Math.min(i,d-n);if(u.iterN(n,v,o))return!0;if((i-=v)==0)break;n=0}else n-=d}}};var oa=function(n,i,o){if(o)for(var a in o)o.hasOwnProperty(a)&&(this[a]=o[a]);this.doc=n,this.node=i};oa.prototype.clear=function(){var n=this.doc.cm,i=this.line.widgets,o=this.line,a=Ke(o);if(!(a==null||!i)){for(var u=0;u<i.length;++u)i[u]==this&&i.splice(u--,1);i.length||(o.widgets=null);var d=Ys(this);Zt(o,Math.max(0,o.height-d)),n&&(Ln(n,function(){Vf(n,o,-d),Ui(n,a,"widget")}),tn(n,"lineWidgetCleared",n,this,a))}},oa.prototype.changed=function(){var n=this,i=this.height,o=this.doc.cm,a=this.line;this.height=null;var u=Ys(this)-i;u&&(Ni(this.doc,a)||Zt(a,a.height+u),o&&Ln(o,function(){o.curOp.forceUpdate=!0,Vf(o,a,u),tn(o,"lineWidgetChanged",o,n,Ke(a))}))},St(oa);function Vf(n,i,o){mi(i)<(n.curOp&&n.curOp.scrollTop||n.doc.scrollTop)&&Nl(n,o)}function bg(n,i,o,a){var u=new oa(n,o,a),d=n.cm;return d&&u.noHScroll&&(d.display.alignWidgets=!0),ra(n,i,"widget",function(v){var y=v.widgets||(v.widgets=[]);if(u.insertAt==null?y.push(u):y.splice(Math.min(y.length,Math.max(0,u.insertAt)),0,u),u.line=v,d&&!Ni(n,v)){var b=mi(v)<n.scrollTop;Zt(v,v.height+Ys(u)),b&&Nl(d,u.height),d.curOp.forceUpdate=!0}return!0}),d&&tn(d,"lineWidgetAdded",d,u,typeof i=="number"?i:Ke(i)),u}var Xf=0,Hi=function(n,i){this.lines=[],this.type=i,this.doc=n,this.id=++Xf};Hi.prototype.clear=function(){if(!this.explicitlyCleared){var n=this.doc.cm,i=n&&!n.curOp;if(i&&ur(n),Fe(this,"clear")){var o=this.find();o&&tn(this,"clear",o.from,o.to)}for(var a=null,u=null,d=0;d<this.lines.length;++d){var v=this.lines[d],y=Vs(v.markedSpans,this);n&&!this.collapsed?Ui(n,Ke(v),"text"):n&&(y.to!=null&&(u=Ke(v)),y.from!=null&&(a=Ke(v))),v.markedSpans=mm(v.markedSpans,y),y.from==null&&this.collapsed&&!Ni(this.doc,v)&&n&&Zt(v,Hr(n.display))}if(n&&this.collapsed&&!n.options.lineWrapping)for(var b=0;b<this.lines.length;++b){var E=Yn(this.lines[b]),D=Va(E);D>n.display.maxLineLength&&(n.display.maxLine=E,n.display.maxLineLength=D,n.display.maxLineChanged=!0)}a!=null&&n&&this.collapsed&&Sn(n,a,u+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,n&&Nf(n.doc)),n&&tn(n,"markerCleared",n,this,a,u),i&&fr(n),this.parent&&this.parent.clear()}},Hi.prototype.find=function(n,i){n==null&&this.type=="bookmark"&&(n=1);for(var o,a,u=0;u<this.lines.length;++u){var d=this.lines[u],v=Vs(d.markedSpans,this);if(v.from!=null&&(o=ue(i?d:Ke(d),v.from),n==-1))return o;if(v.to!=null&&(a=ue(i?d:Ke(d),v.to),n==1))return a}return o&&{from:o,to:a}},Hi.prototype.changed=function(){var n=this,i=this.find(-1,!0),o=this,a=this.doc.cm;!i||!a||Ln(a,function(){var u=i.line,d=Ke(i.line),v=Sl(a,d);if(v&&(Zu(v),a.curOp.selectionChanged=a.curOp.forceUpdate=!0),a.curOp.updateMaxLine=!0,!Ni(o.doc,u)&&o.height!=null){var y=o.height;o.height=null;var b=Ys(o)-y;b&&Zt(u,u.height+b)}tn(a,"markerChanged",a,n)})},Hi.prototype.attachLine=function(n){if(!this.lines.length&&this.doc.cm){var i=this.doc.cm.curOp;(!i.maybeHiddenMarkers||Je(i.maybeHiddenMarkers,this)==-1)&&(i.maybeUnhiddenMarkers||(i.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(n)},Hi.prototype.detachLine=function(n){if(this.lines.splice(Je(this.lines,n),1),!this.lines.length&&this.doc.cm){var i=this.doc.cm.curOp;(i.maybeHiddenMarkers||(i.maybeHiddenMarkers=[])).push(this)}},St(Hi);function jr(n,i,o,a,u){if(a&&a.shared)return Eg(n,i,o,a,u);if(n.cm&&!n.cm.curOp)return nn(n.cm,jr)(n,i,o,a,u);var d=new Hi(n,u),v=tt(i,o);if(a&&nt(a,d,!1),v>0||v==0&&d.clearWhenEmpty!==!1)return d;if(d.replacedWith&&(d.collapsed=!0,d.widgetNode=H("span",[d.replacedWith],"CodeMirror-widget"),a.handleMouseEvents||d.widgetNode.setAttribute("cm-ignore-events","true"),a.insertLeft&&(d.widgetNode.insertLeft=!0)),d.collapsed){if(Nu(n,i.line,i,o,d)||i.line!=o.line&&Nu(n,o.line,i,o,d))throw new Error("Inserting collapsed marker partially overlapping an existing one");pm()}d.addToHistory&&wf(n,{from:i,to:o,origin:"markText"},n.sel,NaN);var y=i.line,b=n.cm,E;if(n.iter(y,o.line+1,function(F){b&&d.collapsed&&!b.options.lineWrapping&&Yn(F)==b.display.maxLine&&(E=!0),d.collapsed&&y!=i.line&&Zt(F,0),gm(F,new Ha(d,y==i.line?i.ch:null,y==o.line?o.ch:null),n.cm&&n.cm.curOp),++y}),d.collapsed&&n.iter(i.line,o.line+1,function(F){Ni(n,F)&&Zt(F,0)}),d.clearOnEnter&&Me(d,"beforeCursorEnter",function(){return d.clear()}),d.readOnly&&(dm(),(n.history.done.length||n.history.undone.length)&&n.clearHistory()),d.collapsed&&(d.id=++Xf,d.atomic=!0),b){if(E&&(b.curOp.updateMaxLine=!0),d.collapsed)Sn(b,i.line,o.line+1);else if(d.className||d.startStyle||d.endStyle||d.css||d.attributes||d.title)for(var D=i.line;D<=o.line;D++)Ui(b,D,"text");d.atomic&&Nf(b.doc),tn(b,"markerAdded",b,d)}return d}var la=function(n,i){this.markers=n,this.primary=i;for(var o=0;o<n.length;++o)n[o].parent=this};la.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var n=0;n<this.markers.length;++n)this.markers[n].clear();tn(this,"clear")}},la.prototype.find=function(n,i){return this.primary.find(n,i)},St(la);function Eg(n,i,o,a,u){a=nt(a),a.shared=!1;var d=[jr(n,i,o,a,u)],v=d[0],y=a.widgetNode;return ki(n,function(b){y&&(a.widgetNode=y.cloneNode(!0)),d.push(jr(b,He(b,i),He(b,o),a,u));for(var E=0;E<b.linked.length;++E)if(b.linked[E].isParent)return;v=C(d)}),new la(d,v)}function qf(n){return n.findMarks(ue(n.first,0),n.clipPos(ue(n.lastLine())),function(i){return i.parent})}function Ag(n,i){for(var o=0;o<i.length;o++){var a=i[o],u=a.find(),d=n.clipPos(u.from),v=n.clipPos(u.to);if(tt(d,v)){var y=jr(n,d,v,a.primary,a.primary.type);a.markers.push(y),y.parent=a}}}function wg(n){for(var i=function(a){var u=n[a],d=[u.primary.doc];ki(u.primary.doc,function(b){return d.push(b)});for(var v=0;v<u.markers.length;v++){var y=u.markers[v];Je(d,y.doc)==-1&&(y.parent=null,u.markers.splice(v--,1))}},o=0;o<n.length;o++)i(o)}var Cg=0,Mn=function(n,i,o,a,u){if(!(this instanceof Mn))return new Mn(n,i,o,a,u);o==null&&(o=0),aa.call(this,[new sa([new Fr("",null)])]),this.first=o,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=o;var d=ue(o,0);this.sel=Fi(d),this.history=new no(null),this.id=++Cg,this.modeOption=i,this.lineSep=a,this.direction=u=="rtl"?"rtl":"ltr",this.extend=!1,typeof n=="string"&&(n=this.splitLines(n)),Gl(this,{from:d,to:d,text:n}),dn(this,Fi(d),ke)};Mn.prototype=Se(aa.prototype,{constructor:Mn,iter:function(n,i,o){o?this.iterN(n-this.first,i-n,o):this.iterN(this.first,this.first+this.size,n)},insert:function(n,i){for(var o=0,a=0;a<i.length;++a)o+=i[a].height;this.insertInner(n-this.first,i,o)},remove:function(n,i){this.removeInner(n-this.first,i)},getValue:function(n){var i=Ht(this,this.first,this.first+this.size);return n===!1?i:i.join(n||this.lineSeparator())},setValue:rn(function(n){var i=ue(this.first,0),o=this.first+this.size-1;Yr(this,{from:i,to:ue(o,Ae(this,o).text.length),text:this.splitLines(n),origin:"setValue",full:!0},!0),this.cm&&Zs(this.cm,0,0),dn(this,Fi(i),ke)}),replaceRange:function(n,i,o,a){i=He(this,i),o=o?He(this,o):i,Kr(this,n,i,o,a)},getRange:function(n,i,o){var a=Xt(this,He(this,n),He(this,i));return o===!1?a:o===""?a.join(""):a.join(o||this.lineSeparator())},getLine:function(n){var i=this.getLineHandle(n);return i&&i.text},getLineHandle:function(n){if(hi(this,n))return Ae(this,n)},getLineNumber:function(n){return Ke(n)},getLineHandleVisualStart:function(n){return typeof n=="number"&&(n=Ae(this,n)),Yn(n)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(n){return He(this,n)},getCursor:function(n){var i=this.sel.primary(),o;return n==null||n=="head"?o=i.head:n=="anchor"?o=i.anchor:n=="end"||n=="to"||n===!1?o=i.to():o=i.from(),o},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:rn(function(n,i,o){Pf(this,He(this,typeof n=="number"?ue(n,i||0):n),null,o)}),setSelection:rn(function(n,i,o){Pf(this,He(this,n),He(this,i||n),o)}),extendSelection:rn(function(n,i,o){ro(this,He(this,n),i&&He(this,i),o)}),extendSelections:rn(function(n,i){Lf(this,ka(this,n),i)}),extendSelectionsBy:rn(function(n,i){var o=$(this.sel.ranges,n);Lf(this,ka(this,o),i)}),setSelections:rn(function(n,i,o){if(n.length){for(var a=[],u=0;u<n.length;u++)a[u]=new Tt(He(this,n[u].anchor),He(this,n[u].head||n[u].anchor));i==null&&(i=Math.min(n.length-1,this.sel.primIndex)),dn(this,jn(this.cm,a,i),o)}}),addSelection:rn(function(n,i,o){var a=this.sel.ranges.slice(0);a.push(new Tt(He(this,n),He(this,i||n))),dn(this,jn(this.cm,a,a.length-1),o)}),getSelection:function(n){for(var i=this.sel.ranges,o,a=0;a<i.length;a++){var u=Xt(this,i[a].from(),i[a].to());o=o?o.concat(u):u}return n===!1?o:o.join(n||this.lineSeparator())},getSelections:function(n){for(var i=[],o=this.sel.ranges,a=0;a<o.length;a++){var u=Xt(this,o[a].from(),o[a].to());n!==!1&&(u=u.join(n||this.lineSeparator())),i[a]=u}return i},replaceSelection:function(n,i,o){for(var a=[],u=0;u<this.sel.ranges.length;u++)a[u]=n;this.replaceSelections(a,i,o||"+input")},replaceSelections:rn(function(n,i,o){for(var a=[],u=this.sel,d=0;d<u.ranges.length;d++){var v=u.ranges[d];a[d]={from:v.from(),to:v.to(),text:this.splitLines(n[d]),origin:o}}for(var y=i&&i!="end"&&mg(this,a,i),b=a.length-1;b>=0;b--)Yr(this,a[b]);y?Df(this,y):this.cm&&Wr(this.cm)}),undo:rn(function(){oo(this,"undo")}),redo:rn(function(){oo(this,"redo")}),undoSelection:rn(function(){oo(this,"undo",!0)}),redoSelection:rn(function(){oo(this,"redo",!0)}),setExtending:function(n){this.extend=n},getExtending:function(){return this.extend},historySize:function(){for(var n=this.history,i=0,o=0,a=0;a<n.done.length;a++)n.done[a].ranges||++i;for(var u=0;u<n.undone.length;u++)n.undone[u].ranges||++o;return{undo:i,redo:o}},clearHistory:function(){var n=this;this.history=new no(this.history),ki(this,function(i){return i.history=n.history},!0)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(n){return n&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(n){return this.history.generation==(n||this.cleanGeneration)},getHistory:function(){return{done:Xr(this.history.done),undone:Xr(this.history.undone)}},setHistory:function(n){var i=this.history=new no(this.history);i.done=Xr(n.done.slice(0),null,!0),i.undone=Xr(n.undone.slice(0),null,!0)},setGutterMarker:rn(function(n,i,o){return ra(this,n,"gutter",function(a){var u=a.gutterMarkers||(a.gutterMarkers={});return u[i]=o,!o&&$e(u)&&(a.gutterMarkers=null),!0})}),clearGutter:rn(function(n){var i=this;this.iter(function(o){o.gutterMarkers&&o.gutterMarkers[n]&&ra(i,o,"gutter",function(){return o.gutterMarkers[n]=null,$e(o.gutterMarkers)&&(o.gutterMarkers=null),!0})})}),lineInfo:function(n){var i;if(typeof n=="number"){if(!hi(this,n)||(i=n,n=Ae(this,n),!n))return null}else if(i=Ke(n),i==null)return null;return{line:i,handle:n,text:n.text,gutterMarkers:n.gutterMarkers,textClass:n.textClass,bgClass:n.bgClass,wrapClass:n.wrapClass,widgets:n.widgets}},addLineClass:rn(function(n,i,o){return ra(this,n,i=="gutter"?"gutter":"class",function(a){var u=i=="text"?"textClass":i=="background"?"bgClass":i=="gutter"?"gutterClass":"wrapClass";if(!a[u])a[u]=o;else{if(se(o).test(a[u]))return!1;a[u]+=" "+o}return!0})}),removeLineClass:rn(function(n,i,o){return ra(this,n,i=="gutter"?"gutter":"class",function(a){var u=i=="text"?"textClass":i=="background"?"bgClass":i=="gutter"?"gutterClass":"wrapClass",d=a[u];if(d)if(o==null)a[u]=null;else{var v=d.match(se(o));if(!v)return!1;var y=v.index+v[0].length;a[u]=d.slice(0,v.index)+(!v.index||y==d.length?"":" ")+d.slice(y)||null}else return!1;return!0})}),addLineWidget:rn(function(n,i,o){return bg(this,n,i,o)}),removeLineWidget:function(n){n.clear()},markText:function(n,i,o){return jr(this,He(this,n),He(this,i),o,o&&o.type||"range")},setBookmark:function(n,i){var o={replacedWith:i&&(i.nodeType==null?i.widget:i),insertLeft:i&&i.insertLeft,clearWhenEmpty:!1,shared:i&&i.shared,handleMouseEvents:i&&i.handleMouseEvents};return n=He(this,n),jr(this,n,n,o,"bookmark")},findMarksAt:function(n){n=He(this,n);var i=[],o=Ae(this,n.line).markedSpans;if(o)for(var a=0;a<o.length;++a){var u=o[a];(u.from==null||u.from<=n.ch)&&(u.to==null||u.to>=n.ch)&&i.push(u.marker.parent||u.marker)}return i},findMarks:function(n,i,o){n=He(this,n),i=He(this,i);var a=[],u=n.line;return this.iter(n.line,i.line+1,function(d){var v=d.markedSpans;if(v)for(var y=0;y<v.length;y++){var b=v[y];!(b.to!=null&&u==n.line&&n.ch>=b.to||b.from==null&&u!=n.line||b.from!=null&&u==i.line&&b.from>=i.ch)&&(!o||o(b.marker))&&a.push(b.marker.parent||b.marker)}++u}),a},getAllMarks:function(){var n=[];return this.iter(function(i){var o=i.markedSpans;if(o)for(var a=0;a<o.length;++a)o[a].from!=null&&n.push(o[a].marker)}),n},posFromIndex:function(n){var i,o=this.first,a=this.lineSeparator().length;return this.iter(function(u){var d=u.text.length+a;if(d>n)return i=n,!0;n-=d,++o}),He(this,ue(o,i))},indexFromPos:function(n){n=He(this,n);var i=n.ch;if(n.line<this.first||n.ch<0)return 0;var o=this.lineSeparator().length;return this.iter(this.first,n.line,function(a){i+=a.text.length+o}),i},copy:function(n){var i=new Mn(Ht(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction);return i.scrollTop=this.scrollTop,i.scrollLeft=this.scrollLeft,i.sel=this.sel,i.extend=!1,n&&(i.history.undoDepth=this.history.undoDepth,i.setHistory(this.getHistory())),i},linkedDoc:function(n){n||(n={});var i=this.first,o=this.first+this.size;n.from!=null&&n.from>i&&(i=n.from),n.to!=null&&n.to<o&&(o=n.to);var a=new Mn(Ht(this,i,o),n.mode||this.modeOption,i,this.lineSep,this.direction);return n.sharedHist&&(a.history=this.history),(this.linked||(this.linked=[])).push({doc:a,sharedHist:n.sharedHist}),a.linked=[{doc:this,isParent:!0,sharedHist:n.sharedHist}],Ag(a,qf(this)),a},unlinkDoc:function(n){if(n instanceof Ut&&(n=n.doc),this.linked)for(var i=0;i<this.linked.length;++i){var o=this.linked[i];if(o.doc==n){this.linked.splice(i,1),n.unlinkDoc(this),wg(qf(this));break}}if(n.history==this.history){var a=[n.id];ki(n,function(u){return a.push(u.id)},!0),n.history=new no(null),n.history.done=Xr(this.history.done,a),n.history.undone=Xr(this.history.undone,a)}},iterLinkedDocs:function(n){ki(this,n)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(n){return this.lineSep?n.split(this.lineSep):Ur(n)},lineSeparator:function(){return this.lineSep||`
`},setDirection:rn(function(n){n!="rtl"&&(n="ltr"),n!=this.direction&&(this.direction=n,this.iter(function(i){return i.order=null}),this.cm&&gg(this.cm))})}),Mn.prototype.eachLine=Mn.prototype.iter;var Yf=0;function Rg(n){var i=this;if(Kf(i),!(xe(i,n)||gi(i.display,n))){ht(n),p&&(Yf=+new Date);var o=ar(i,n,!0),a=n.dataTransfer.files;if(!(!o||i.isReadOnly()))if(a&&a.length&&window.FileReader&&window.File)for(var u=a.length,d=Array(u),v=0,y=function(){++v==u&&nn(i,function(){o=He(i.doc,o);var G={from:o,to:o,text:i.doc.splitLines(d.filter(function(ne){return ne!=null}).join(i.doc.lineSeparator())),origin:"paste"};Yr(i.doc,G),Df(i.doc,Fi(He(i.doc,o),He(i.doc,Bi(G))))})()},b=function(G,ne){if(i.options.allowDropFileTypes&&Je(i.options.allowDropFileTypes,G.type)==-1){y();return}var ce=new FileReader;ce.onerror=function(){return y()},ce.onload=function(){var ge=ce.result;if(/[\x00-\x08\x0e-\x1f]{2}/.test(ge)){y();return}d[ne]=ge,y()},ce.readAsText(G)},E=0;E<a.length;E++)b(a[E],E);else{if(i.state.draggingText&&i.doc.sel.contains(o)>-1){i.state.draggingText(n),setTimeout(function(){return i.display.input.focus()},20);return}try{var D=n.dataTransfer.getData("Text");if(D){var F;if(i.state.draggingText&&!i.state.draggingText.copy&&(F=i.listSelections()),so(i.doc,Fi(o,o)),F)for(var q=0;q<F.length;++q)Kr(i.doc,"",F[q].anchor,F[q].head,"drag");i.replaceSelection(D,"around","paste"),i.display.input.focus()}}catch{}}}}function Lg(n,i){if(p&&(!n.state.draggingText||+new Date-Yf<100)){Mt(i);return}if(!(xe(n,i)||gi(n.display,i))&&(i.dataTransfer.setData("Text",n.getSelection()),i.dataTransfer.effectAllowed="copyMove",i.dataTransfer.setDragImage&&!w)){var o=X("img",null,null,"position: fixed; left: 0; top: 0;");o.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",A&&(o.width=o.height=1,n.display.wrapper.appendChild(o),o._top=o.offsetTop),i.dataTransfer.setDragImage(o,0,0),A&&o.parentNode.removeChild(o)}}function Pg(n,i){var o=ar(n,i);if(o){var a=document.createDocumentFragment();Rl(n,o,a),n.display.dragCursor||(n.display.dragCursor=X("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),n.display.lineSpace.insertBefore(n.display.dragCursor,n.display.cursorDiv)),V(n.display.dragCursor,a)}}function Kf(n){n.display.dragCursor&&(n.display.lineSpace.removeChild(n.display.dragCursor),n.display.dragCursor=null)}function jf(n){if(document.getElementsByClassName){for(var i=document.getElementsByClassName("CodeMirror"),o=[],a=0;a<i.length;a++){var u=i[a].CodeMirror;u&&o.push(u)}o.length&&o[0].operation(function(){for(var d=0;d<o.length;d++)n(o[d])})}}var Zf=!1;function Dg(){Zf||(Ig(),Zf=!0)}function Ig(){var n;Me(window,"resize",function(){n==null&&(n=setTimeout(function(){n=null,jf(Ng)},100))}),Me(window,"blur",function(){return jf(Gr)})}function Ng(n){var i=n.display;i.cachedCharWidth=i.cachedTextHeight=i.cachedPaddingH=null,i.scrollbarsClipped=!1,n.setSize()}for(var zi={3:"Pause",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",145:"ScrollLock",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",224:"Mod",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},ca=0;ca<10;ca++)zi[ca+48]=zi[ca+96]=String(ca);for(var lo=65;lo<=90;lo++)zi[lo]=String.fromCharCode(lo);for(var ua=1;ua<=12;ua++)zi[ua+111]=zi[ua+63235]="F"+ua;var _i={};_i.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},_i.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},_i.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},_i.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},_i.default=W?_i.macDefault:_i.pcDefault;function Ug(n){var i=n.split(/-(?!$)/);n=i[i.length-1];for(var o,a,u,d,v=0;v<i.length-1;v++){var y=i[v];if(/^(cmd|meta|m)$/i.test(y))d=!0;else if(/^a(lt)?$/i.test(y))o=!0;else if(/^(c|ctrl|control)$/i.test(y))a=!0;else if(/^s(hift)?$/i.test(y))u=!0;else throw new Error("Unrecognized modifier name: "+y)}return o&&(n="Alt-"+n),a&&(n="Ctrl-"+n),d&&(n="Cmd-"+n),u&&(n="Shift-"+n),n}function Og(n){var i={};for(var o in n)if(n.hasOwnProperty(o)){var a=n[o];if(/^(name|fallthrough|(de|at)tach)$/.test(o))continue;if(a=="..."){delete n[o];continue}for(var u=$(o.split(" "),Ug),d=0;d<u.length;d++){var v=void 0,y=void 0;d==u.length-1?(y=u.join(" "),v=a):(y=u.slice(0,d+1).join(" "),v="...");var b=i[y];if(!b)i[y]=v;else if(b!=v)throw new Error("Inconsistent bindings for "+y)}delete n[o]}for(var E in i)n[E]=i[E];return n}function Zr(n,i,o,a){i=co(i);var u=i.call?i.call(n,a):i[n];if(u===!1)return"nothing";if(u==="...")return"multi";if(u!=null&&o(u))return"handled";if(i.fallthrough){if(Object.prototype.toString.call(i.fallthrough)!="[object Array]")return Zr(n,i.fallthrough,o,a);for(var d=0;d<i.fallthrough.length;d++){var v=Zr(n,i.fallthrough[d],o,a);if(v)return v}}}function Jf(n){var i=typeof n=="string"?n:zi[n.keyCode];return i=="Ctrl"||i=="Alt"||i=="Shift"||i=="Mod"}function Qf(n,i,o){var a=n;return i.altKey&&a!="Alt"&&(n="Alt-"+n),(L?i.metaKey:i.ctrlKey)&&a!="Ctrl"&&(n="Ctrl-"+n),(L?i.ctrlKey:i.metaKey)&&a!="Mod"&&(n="Cmd-"+n),!o&&i.shiftKey&&a!="Shift"&&(n="Shift-"+n),n}function $f(n,i){if(A&&n.keyCode==34&&n.char)return!1;var o=zi[n.keyCode];return o==null||n.altGraphKey?!1:(n.keyCode==3&&n.code&&(o=n.code),Qf(o,n,i))}function co(n){return typeof n=="string"?_i[n]:n}function Jr(n,i){for(var o=n.doc.sel.ranges,a=[],u=0;u<o.length;u++){for(var d=i(o[u]);a.length&&tt(d.from,C(a).to)<=0;){var v=a.pop();if(tt(v.from,d.from)<0){d.from=v.from;break}}a.push(d)}Ln(n,function(){for(var y=a.length-1;y>=0;y--)Kr(n.doc,"",a[y].from,a[y].to,"+delete");Wr(n)})}function ql(n,i,o){var a=bt(n.text,i+o,o);return a<0||a>n.text.length?null:a}function Yl(n,i,o){var a=ql(n,i.ch,o);return a==null?null:new ue(i.line,a,o<0?"after":"before")}function Kl(n,i,o,a,u){if(n){i.doc.direction=="rtl"&&(u=-u);var d=gt(o,i.doc.direction);if(d){var v=u<0?C(d):d[0],y=u<0==(v.level==1),b=y?"after":"before",E;if(v.level>0||i.doc.direction=="rtl"){var D=kr(i,o);E=u<0?o.text.length-1:0;var F=si(i,D,E).top;E=ct(function(q){return si(i,D,q).top==F},u<0==(v.level==1)?v.from:v.to-1,E),b=="before"&&(E=ql(o,E,1))}else E=u<0?v.to:v.from;return new ue(a,E,b)}}return new ue(a,u<0?o.text.length:0,u<0?"before":"after")}function Fg(n,i,o,a){var u=gt(i,n.doc.direction);if(!u)return Yl(i,o,a);o.ch>=i.text.length?(o.ch=i.text.length,o.sticky="before"):o.ch<=0&&(o.ch=0,o.sticky="after");var d=Ie(u,o.ch,o.sticky),v=u[d];if(n.doc.direction=="ltr"&&v.level%2==0&&(a>0?v.to>o.ch:v.from<o.ch))return Yl(i,o,a);var y=function(Te,Ce){return ql(i,Te instanceof ue?Te.ch:Te,Ce)},b,E=function(Te){return n.options.lineWrapping?(b=b||kr(n,i),rf(n,i,b,Te)):{begin:0,end:i.text.length}},D=E(o.sticky=="before"?y(o,-1):o.ch);if(n.doc.direction=="rtl"||v.level==1){var F=v.level==1==a<0,q=y(o,F?1:-1);if(q!=null&&(F?q<=v.to&&q<=D.end:q>=v.from&&q>=D.begin)){var G=F?"before":"after";return new ue(o.line,q,G)}}var ne=function(Te,Ce,be){for(var Pe=function(Ct,sn){return sn?new ue(o.line,y(Ct,1),"before"):new ue(o.line,Ct,"after")};Te>=0&&Te<u.length;Te+=Ce){var qe=u[Te],ze=Ce>0==(qe.level!=1),dt=ze?be.begin:y(be.end,-1);if(qe.from<=dt&&dt<qe.to||(dt=ze?qe.from:y(qe.to,-1),be.begin<=dt&&dt<be.end))return Pe(dt,ze)}},ce=ne(d+a,a,D);if(ce)return ce;var ge=a>0?D.end:y(D.begin,-1);return ge!=null&&!(a>0&&ge==i.text.length)&&(ce=ne(a>0?0:u.length-1,a,E(ge)),ce)?ce:null}var fa={selectAll:Ff,singleSelection:function(n){return n.setSelection(n.getCursor("anchor"),n.getCursor("head"),ke)},killLine:function(n){return Jr(n,function(i){if(i.empty()){var o=Ae(n.doc,i.head.line).text.length;return i.head.ch==o&&i.head.line<n.lastLine()?{from:i.head,to:ue(i.head.line+1,0)}:{from:i.head,to:ue(i.head.line,o)}}else return{from:i.from(),to:i.to()}})},deleteLine:function(n){return Jr(n,function(i){return{from:ue(i.from().line,0),to:He(n.doc,ue(i.to().line+1,0))}})},delLineLeft:function(n){return Jr(n,function(i){return{from:ue(i.from().line,0),to:i.from()}})},delWrappedLineLeft:function(n){return Jr(n,function(i){var o=n.charCoords(i.head,"div").top+5,a=n.coordsChar({left:0,top:o},"div");return{from:a,to:i.from()}})},delWrappedLineRight:function(n){return Jr(n,function(i){var o=n.charCoords(i.head,"div").top+5,a=n.coordsChar({left:n.display.lineDiv.offsetWidth+100,top:o},"div");return{from:i.from(),to:a}})},undo:function(n){return n.undo()},redo:function(n){return n.redo()},undoSelection:function(n){return n.undoSelection()},redoSelection:function(n){return n.redoSelection()},goDocStart:function(n){return n.extendSelection(ue(n.firstLine(),0))},goDocEnd:function(n){return n.extendSelection(ue(n.lastLine()))},goLineStart:function(n){return n.extendSelectionsBy(function(i){return eh(n,i.head.line)},{origin:"+move",bias:1})},goLineStartSmart:function(n){return n.extendSelectionsBy(function(i){return th(n,i.head)},{origin:"+move",bias:1})},goLineEnd:function(n){return n.extendSelectionsBy(function(i){return Bg(n,i.head.line)},{origin:"+move",bias:-1})},goLineRight:function(n){return n.extendSelectionsBy(function(i){var o=n.cursorCoords(i.head,"div").top+5;return n.coordsChar({left:n.display.lineDiv.offsetWidth+100,top:o},"div")},Oe)},goLineLeft:function(n){return n.extendSelectionsBy(function(i){var o=n.cursorCoords(i.head,"div").top+5;return n.coordsChar({left:0,top:o},"div")},Oe)},goLineLeftSmart:function(n){return n.extendSelectionsBy(function(i){var o=n.cursorCoords(i.head,"div").top+5,a=n.coordsChar({left:0,top:o},"div");return a.ch<n.getLine(a.line).search(/\S/)?th(n,i.head):a},Oe)},goLineUp:function(n){return n.moveV(-1,"line")},goLineDown:function(n){return n.moveV(1,"line")},goPageUp:function(n){return n.moveV(-1,"page")},goPageDown:function(n){return n.moveV(1,"page")},goCharLeft:function(n){return n.moveH(-1,"char")},goCharRight:function(n){return n.moveH(1,"char")},goColumnLeft:function(n){return n.moveH(-1,"column")},goColumnRight:function(n){return n.moveH(1,"column")},goWordLeft:function(n){return n.moveH(-1,"word")},goGroupRight:function(n){return n.moveH(1,"group")},goGroupLeft:function(n){return n.moveH(-1,"group")},goWordRight:function(n){return n.moveH(1,"word")},delCharBefore:function(n){return n.deleteH(-1,"codepoint")},delCharAfter:function(n){return n.deleteH(1,"char")},delWordBefore:function(n){return n.deleteH(-1,"word")},delWordAfter:function(n){return n.deleteH(1,"word")},delGroupBefore:function(n){return n.deleteH(-1,"group")},delGroupAfter:function(n){return n.deleteH(1,"group")},indentAuto:function(n){return n.indentSelection("smart")},indentMore:function(n){return n.indentSelection("add")},indentLess:function(n){return n.indentSelection("subtract")},insertTab:function(n){return n.replaceSelection("	")},insertSoftTab:function(n){for(var i=[],o=n.listSelections(),a=n.options.tabSize,u=0;u<o.length;u++){var d=o[u].from(),v=je(n.getLine(d.line),d.ch,a);i.push(U(a-v%a))}n.replaceSelections(i)},defaultTab:function(n){n.somethingSelected()?n.indentSelection("add"):n.execCommand("insertTab")},transposeChars:function(n){return Ln(n,function(){for(var i=n.listSelections(),o=[],a=0;a<i.length;a++)if(i[a].empty()){var u=i[a].head,d=Ae(n.doc,u.line).text;if(d){if(u.ch==d.length&&(u=new ue(u.line,u.ch-1)),u.ch>0)u=new ue(u.line,u.ch+1),n.replaceRange(d.charAt(u.ch-1)+d.charAt(u.ch-2),ue(u.line,u.ch-2),u,"+transpose");else if(u.line>n.doc.first){var v=Ae(n.doc,u.line-1).text;v&&(u=new ue(u.line,1),n.replaceRange(d.charAt(0)+n.doc.lineSeparator()+v.charAt(v.length-1),ue(u.line-1,v.length-1),u,"+transpose"))}}o.push(new Tt(u,u))}n.setSelections(o)})},newlineAndIndent:function(n){return Ln(n,function(){for(var i=n.listSelections(),o=i.length-1;o>=0;o--)n.replaceRange(n.doc.lineSeparator(),i[o].anchor,i[o].head,"+input");i=n.listSelections();for(var a=0;a<i.length;a++)n.indentLine(i[a].from().line,null,!0);Wr(n)})},openLine:function(n){return n.replaceSelection(`
`,"start")},toggleOverwrite:function(n){return n.toggleOverwrite()}};function eh(n,i){var o=Ae(n.doc,i),a=Yn(o);return a!=o&&(i=Ke(a)),Kl(!0,n,a,i,1)}function Bg(n,i){var o=Ae(n.doc,i),a=Sm(o);return a!=o&&(i=Ke(a)),Kl(!0,n,o,i,-1)}function th(n,i){var o=eh(n,i.line),a=Ae(n.doc,o.line),u=gt(a,n.doc.direction);if(!u||u[0].level==0){var d=Math.max(o.ch,a.text.search(/\S/)),v=i.line==o.line&&i.ch<=d&&i.ch;return ue(o.line,v?0:d,o.sticky)}return o}function uo(n,i,o){if(typeof i=="string"&&(i=fa[i],!i))return!1;n.display.input.ensurePolled();var a=n.display.shift,u=!1;try{n.isReadOnly()&&(n.state.suppressEdits=!0),o&&(n.display.shift=!1),u=i(n)!=jt}finally{n.display.shift=a,n.state.suppressEdits=!1}return u}function kg(n,i,o){for(var a=0;a<n.state.keyMaps.length;a++){var u=Zr(i,n.state.keyMaps[a],o,n);if(u)return u}return n.options.extraKeys&&Zr(i,n.options.extraKeys,o,n)||Zr(i,n.options.keyMap,o,n)}var Hg=new Ye;function ha(n,i,o,a){var u=n.state.keySeq;if(u){if(Jf(i))return"handled";if(/\'$/.test(i)?n.state.keySeq=null:Hg.set(50,function(){n.state.keySeq==u&&(n.state.keySeq=null,n.display.input.reset())}),nh(n,u+" "+i,o,a))return!0}return nh(n,i,o,a)}function nh(n,i,o,a){var u=kg(n,i,a);return u=="multi"&&(n.state.keySeq=i),u=="handled"&&tn(n,"keyHandled",n,i,o),(u=="handled"||u=="multi")&&(ht(o),Ll(n)),!!u}function ih(n,i){var o=$f(i,!0);return o?i.shiftKey&&!n.state.keySeq?ha(n,"Shift-"+o,i,function(a){return uo(n,a,!0)})||ha(n,o,i,function(a){if(typeof a=="string"?/^go[A-Z]/.test(a):a.motion)return uo(n,a)}):ha(n,o,i,function(a){return uo(n,a)}):!1}function zg(n,i,o){return ha(n,"'"+o+"'",i,function(a){return uo(n,a,!0)})}var jl=null;function rh(n){var i=this;if(!(n.target&&n.target!=i.display.input.getField())&&(i.curOp.focus=Z(he(i)),!xe(i,n))){p&&m<11&&n.keyCode==27&&(n.returnValue=!1);var o=n.keyCode;i.display.shift=o==16||n.shiftKey;var a=ih(i,n);A&&(jl=a?o:null,!a&&o==88&&!cl&&(W?n.metaKey:n.ctrlKey)&&i.replaceSelection("",null,"cut")),s&&!W&&!a&&o==46&&n.shiftKey&&!n.ctrlKey&&document.execCommand&&document.execCommand("cut"),o==18&&!/\bCodeMirror-crosshair\b/.test(i.display.lineDiv.className)&&Gg(i)}}function Gg(n){var i=n.display.lineDiv;le(i,"CodeMirror-crosshair");function o(a){(a.keyCode==18||!a.altKey)&&(oe(i,"CodeMirror-crosshair"),z(document,"keyup",o),z(document,"mouseover",o))}Me(document,"keyup",o),Me(document,"mouseover",o)}function sh(n){n.keyCode==16&&(this.doc.sel.shift=!1),xe(this,n)}function ah(n){var i=this;if(!(n.target&&n.target!=i.display.input.getField())&&!(gi(i.display,n)||xe(i,n)||n.ctrlKey&&!n.altKey||W&&n.metaKey)){var o=n.keyCode,a=n.charCode;if(A&&o==jl){jl=null,ht(n);return}if(!(A&&(!n.which||n.which<10)&&ih(i,n))){var u=String.fromCharCode(a??o);u!="\b"&&(zg(i,n,u)||i.display.input.onKeyPress(n))}}}var Wg=400,Zl=function(n,i,o){this.time=n,this.pos=i,this.button=o};Zl.prototype.compare=function(n,i,o){return this.time+Wg>n&&tt(i,this.pos)==0&&o==this.button};var da,pa;function Vg(n,i){var o=+new Date;return pa&&pa.compare(o,n,i)?(da=pa=null,"triple"):da&&da.compare(o,n,i)?(pa=new Zl(o,n,i),da=null,"double"):(da=new Zl(o,n,i),pa=null,"single")}function oh(n){var i=this,o=i.display;if(!(xe(i,n)||o.activeTouch&&o.input.supportsTouch())){if(o.input.ensurePolled(),o.shift=n.shiftKey,gi(o,n)){g||(o.scroller.draggable=!1,setTimeout(function(){return o.scroller.draggable=!0},100));return}if(!Jl(i,n)){var a=ar(i,n),u=Un(n),d=a?Vg(a,u):"single";Ge(i).focus(),u==1&&i.state.selectingText&&i.state.selectingText(n),!(a&&Xg(i,u,a,d,n))&&(u==1?a?Yg(i,a,d,n):en(n)==o.scroller&&ht(n):u==2?(a&&ro(i.doc,a),setTimeout(function(){return o.input.focus()},20)):u==3&&(O?i.display.input.onContextMenu(n):Pl(i)))}}}function Xg(n,i,o,a,u){var d="Click";return a=="double"?d="Double"+d:a=="triple"&&(d="Triple"+d),d=(i==1?"Left":i==2?"Middle":"Right")+d,ha(n,Qf(d,u),u,function(v){if(typeof v=="string"&&(v=fa[v]),!v)return!1;var y=!1;try{n.isReadOnly()&&(n.state.suppressEdits=!0),y=v(n,o)!=jt}finally{n.state.suppressEdits=!1}return y})}function qg(n,i,o){var a=n.getOption("configureMouse"),u=a?a(n,i,o):{};if(u.unit==null){var d=k?o.shiftKey&&o.metaKey:o.altKey;u.unit=d?"rectangle":i=="single"?"char":i=="double"?"word":"line"}return(u.extend==null||n.doc.extend)&&(u.extend=n.doc.extend||o.shiftKey),u.addNew==null&&(u.addNew=W?o.metaKey:o.ctrlKey),u.moveOnDrag==null&&(u.moveOnDrag=!(W?o.altKey:o.ctrlKey)),u}function Yg(n,i,o,a){p?setTimeout(We(lf,n),0):n.curOp.focus=Z(he(n));var u=qg(n,o,a),d=n.doc.sel,v;n.options.dragDrop&&Fa&&!n.isReadOnly()&&o=="single"&&(v=d.contains(i))>-1&&(tt((v=d.ranges[v]).from(),i)<0||i.xRel>0)&&(tt(v.to(),i)>0||i.xRel<0)?Kg(n,a,i,u):jg(n,a,i,u)}function Kg(n,i,o,a){var u=n.display,d=!1,v=nn(n,function(E){g&&(u.scroller.draggable=!1),n.state.draggingText=!1,n.state.delayingBlurEvent&&(n.hasFocus()?n.state.delayingBlurEvent=!1:Pl(n)),z(u.wrapper.ownerDocument,"mouseup",v),z(u.wrapper.ownerDocument,"mousemove",y),z(u.scroller,"dragstart",b),z(u.scroller,"drop",v),d||(ht(E),a.addNew||ro(n.doc,o,null,null,a.extend),g&&!w||p&&m==9?setTimeout(function(){u.wrapper.ownerDocument.body.focus({preventScroll:!0}),u.input.focus()},20):u.input.focus())}),y=function(E){d=d||Math.abs(i.clientX-E.clientX)+Math.abs(i.clientY-E.clientY)>=10},b=function(){return d=!0};g&&(u.scroller.draggable=!0),n.state.draggingText=v,v.copy=!a.moveOnDrag,Me(u.wrapper.ownerDocument,"mouseup",v),Me(u.wrapper.ownerDocument,"mousemove",y),Me(u.scroller,"dragstart",b),Me(u.scroller,"drop",v),n.state.delayingBlurEvent=!0,setTimeout(function(){return u.input.focus()},20),u.scroller.dragDrop&&u.scroller.dragDrop()}function lh(n,i,o){if(o=="char")return new Tt(i,i);if(o=="word")return n.findWordAt(i);if(o=="line")return new Tt(ue(i.line,0),He(n.doc,ue(i.line+1,0)));var a=o(n,i);return new Tt(a.from,a.to)}function jg(n,i,o,a){p&&Pl(n);var u=n.display,d=n.doc;ht(i);var v,y,b=d.sel,E=b.ranges;if(a.addNew&&!a.extend?(y=d.sel.contains(o),y>-1?v=E[y]:v=new Tt(o,o)):(v=d.sel.primary(),y=d.sel.primIndex),a.unit=="rectangle")a.addNew||(v=new Tt(o,o)),o=ar(n,i,!0,!0),y=-1;else{var D=lh(n,o,a.unit);a.extend?v=Vl(v,D.anchor,D.head,a.extend):v=D}a.addNew?y==-1?(y=E.length,dn(d,jn(n,E.concat([v]),y),{scroll:!1,origin:"*mouse"})):E.length>1&&E[y].empty()&&a.unit=="char"&&!a.extend?(dn(d,jn(n,E.slice(0,y).concat(E.slice(y+1)),0),{scroll:!1,origin:"*mouse"}),b=d.sel):Xl(d,y,v,rt):(y=0,dn(d,new On([v],0),rt),b=d.sel);var F=o;function q(be){if(tt(F,be)!=0)if(F=be,a.unit=="rectangle"){for(var Pe=[],qe=n.options.tabSize,ze=je(Ae(d,o.line).text,o.ch,qe),dt=je(Ae(d,be.line).text,be.ch,qe),Ct=Math.min(ze,dt),sn=Math.max(ze,dt),Ft=Math.min(o.line,be.line),Pn=Math.min(n.lastLine(),Math.max(o.line,be.line));Ft<=Pn;Ft++){var Tn=Ae(d,Ft).text,Yt=Lt(Tn,Ct,qe);Ct==sn?Pe.push(new Tt(ue(Ft,Yt),ue(Ft,Yt))):Tn.length>Yt&&Pe.push(new Tt(ue(Ft,Yt),ue(Ft,Lt(Tn,sn,qe))))}Pe.length||Pe.push(new Tt(o,o)),dn(d,jn(n,b.ranges.slice(0,y).concat(Pe),y),{origin:"*mouse",scroll:!1}),n.scrollIntoView(be)}else{var bn=v,cn=lh(n,be,a.unit),Jt=bn.anchor,Kt;tt(cn.anchor,Jt)>0?(Kt=cn.head,Jt=kn(bn.from(),cn.anchor)):(Kt=cn.anchor,Jt=qt(bn.to(),cn.head));var Bt=b.ranges.slice(0);Bt[y]=Zg(n,new Tt(He(d,Jt),Kt)),dn(d,jn(n,Bt,y),rt)}}var G=u.wrapper.getBoundingClientRect(),ne=0;function ce(be){var Pe=++ne,qe=ar(n,be,!0,a.unit=="rectangle");if(qe)if(tt(qe,F)!=0){n.curOp.focus=Z(he(n)),q(qe);var ze=Qa(u,d);(qe.line>=ze.to||qe.line<ze.from)&&setTimeout(nn(n,function(){ne==Pe&&ce(be)}),150)}else{var dt=be.clientY<G.top?-20:be.clientY>G.bottom?20:0;dt&&setTimeout(nn(n,function(){ne==Pe&&(u.scroller.scrollTop+=dt,ce(be))}),50)}}function ge(be){n.state.selectingText=!1,ne=1/0,be&&(ht(be),u.input.focus()),z(u.wrapper.ownerDocument,"mousemove",Te),z(u.wrapper.ownerDocument,"mouseup",Ce),d.history.lastSelOrigin=null}var Te=nn(n,function(be){be.buttons===0||!Un(be)?ge(be):ce(be)}),Ce=nn(n,ge);n.state.selectingText=Ce,Me(u.wrapper.ownerDocument,"mousemove",Te),Me(u.wrapper.ownerDocument,"mouseup",Ce)}function Zg(n,i){var o=i.anchor,a=i.head,u=Ae(n.doc,o.line);if(tt(o,a)==0&&o.sticky==a.sticky)return i;var d=gt(u);if(!d)return i;var v=Ie(d,o.ch,o.sticky),y=d[v];if(y.from!=o.ch&&y.to!=o.ch)return i;var b=v+(y.from==o.ch==(y.level!=1)?0:1);if(b==0||b==d.length)return i;var E;if(a.line!=o.line)E=(a.line-o.line)*(n.doc.direction=="ltr"?1:-1)>0;else{var D=Ie(d,a.ch,a.sticky),F=D-v||(a.ch-o.ch)*(y.level==1?-1:1);D==b-1||D==b?E=F<0:E=F>0}var q=d[b+(E?-1:0)],G=E==(q.level==1),ne=G?q.from:q.to,ce=G?"after":"before";return o.ch==ne&&o.sticky==ce?i:new Tt(new ue(o.line,ne,ce),a)}function ch(n,i,o,a){var u,d;if(i.touches)u=i.touches[0].clientX,d=i.touches[0].clientY;else try{u=i.clientX,d=i.clientY}catch{return!1}if(u>=Math.floor(n.display.gutters.getBoundingClientRect().right))return!1;a&&ht(i);var v=n.display,y=v.lineDiv.getBoundingClientRect();if(d>y.bottom||!Fe(n,o))return $t(i);d-=y.top-v.viewOffset;for(var b=0;b<n.display.gutterSpecs.length;++b){var E=v.gutters.childNodes[b];if(E&&E.getBoundingClientRect().right>=u){var D=st(n.doc,d),F=n.display.gutterSpecs[b];return _e(n,o,n,D,F.className,i),$t(i)}}}function Jl(n,i){return ch(n,i,"gutterClick",!0)}function uh(n,i){gi(n.display,i)||Jg(n,i)||xe(n,i,"contextmenu")||O||n.display.input.onContextMenu(i)}function Jg(n,i){return Fe(n,"gutterContextMenu")?ch(n,i,"gutterContextMenu",!1):!1}function fh(n){n.display.wrapper.className=n.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+n.options.theme.replace(/(^|\s)\s*/g," cm-s-"),Ks(n)}var Qr={toString:function(){return"CodeMirror.Init"}},hh={},fo={};function Qg(n){var i=n.optionHandlers;function o(a,u,d,v){n.defaults[a]=u,d&&(i[a]=v?function(y,b,E){E!=Qr&&d(y,b,E)}:d)}n.defineOption=o,n.Init=Qr,o("value","",function(a,u){return a.setValue(u)},!0),o("mode",null,function(a,u){a.doc.modeOption=u,zl(a)},!0),o("indentUnit",2,zl,!0),o("indentWithTabs",!1),o("smartIndent",!0),o("tabSize",4,function(a){na(a),Ks(a),Sn(a)},!0),o("lineSeparator",null,function(a,u){if(a.doc.lineSep=u,!!u){var d=[],v=a.doc.first;a.doc.iter(function(b){for(var E=0;;){var D=b.text.indexOf(u,E);if(D==-1)break;E=D+u.length,d.push(ue(v,D))}v++});for(var y=d.length-1;y>=0;y--)Kr(a.doc,u,d[y],ue(d[y].line,d[y].ch+u.length))}}),o("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g,function(a,u,d){a.state.specialChars=new RegExp(u.source+(u.test("	")?"":"|	"),"g"),d!=Qr&&a.refresh()}),o("specialCharPlaceholder",wm,function(a){return a.refresh()},!0),o("electricChars",!0),o("inputStyle",N?"contenteditable":"textarea",function(){throw new Error("inputStyle can not (yet) be changed in a running editor")},!0),o("spellcheck",!1,function(a,u){return a.getInputField().spellcheck=u},!0),o("autocorrect",!1,function(a,u){return a.getInputField().autocorrect=u},!0),o("autocapitalize",!1,function(a,u){return a.getInputField().autocapitalize=u},!0),o("rtlMoveVisually",!B),o("wholeLineUpdateBefore",!0),o("theme","default",function(a){fh(a),ta(a)},!0),o("keyMap","default",function(a,u,d){var v=co(u),y=d!=Qr&&co(d);y&&y.detach&&y.detach(a,v),v.attach&&v.attach(a,y||null)}),o("extraKeys",null),o("configureMouse",null),o("lineWrapping",!1,ev,!0),o("gutters",[],function(a,u){a.display.gutterSpecs=kl(u,a.options.lineNumbers),ta(a)},!0),o("fixedGutter",!0,function(a,u){a.display.gutters.style.left=u?wl(a.display)+"px":"0",a.refresh()},!0),o("coverGutterNextToScrollbar",!1,function(a){return Vr(a)},!0),o("scrollbarStyle","native",function(a){pf(a),Vr(a),a.display.scrollbars.setScrollTop(a.doc.scrollTop),a.display.scrollbars.setScrollLeft(a.doc.scrollLeft)},!0),o("lineNumbers",!1,function(a,u){a.display.gutterSpecs=kl(a.options.gutters,u),ta(a)},!0),o("firstLineNumber",1,ta,!0),o("lineNumberFormatter",function(a){return a},ta,!0),o("showCursorWhenSelecting",!1,js,!0),o("resetSelectionOnContextMenu",!0),o("lineWiseCopyCut",!0),o("pasteLinesPerSelection",!0),o("selectionsMayTouch",!1),o("readOnly",!1,function(a,u){u=="nocursor"&&(Gr(a),a.display.input.blur()),a.display.input.readOnlyChanged(u)}),o("screenReaderLabel",null,function(a,u){u=u===""?null:u,a.display.input.screenReaderLabelChanged(u)}),o("disableInput",!1,function(a,u){u||a.display.input.reset()},!0),o("dragDrop",!0,$g),o("allowDropFileTypes",null),o("cursorBlinkRate",530),o("cursorScrollMargin",0),o("cursorHeight",1,js,!0),o("singleCursorHeightPerLine",!0,js,!0),o("workTime",100),o("workDelay",100),o("flattenSpans",!0,na,!0),o("addModeClass",!1,na,!0),o("pollInterval",100),o("undoDepth",200,function(a,u){return a.doc.history.undoDepth=u}),o("historyEventDelay",1250),o("viewportMargin",10,function(a){return a.refresh()},!0),o("maxHighlightLength",1e4,na,!0),o("moveInputWithCursor",!0,function(a,u){u||a.display.input.resetPosition()}),o("tabindex",null,function(a,u){return a.display.input.getField().tabIndex=u||""}),o("autofocus",null),o("direction","ltr",function(a,u){return a.doc.setDirection(u)},!0),o("phrases",null)}function $g(n,i,o){var a=o&&o!=Qr;if(!i!=!a){var u=n.display.dragFunctions,d=i?Me:z;d(n.display.scroller,"dragstart",u.start),d(n.display.scroller,"dragenter",u.enter),d(n.display.scroller,"dragover",u.over),d(n.display.scroller,"dragleave",u.leave),d(n.display.scroller,"drop",u.drop)}}function ev(n){n.options.lineWrapping?(le(n.display.wrapper,"CodeMirror-wrap"),n.display.sizer.style.minWidth="",n.display.sizerWidth=null):(oe(n.display.wrapper,"CodeMirror-wrap"),vl(n)),Cl(n),Sn(n),Ks(n),setTimeout(function(){return Vr(n)},100)}function Ut(n,i){var o=this;if(!(this instanceof Ut))return new Ut(n,i);this.options=i=i?nt(i):{},nt(hh,i,!1);var a=i.value;typeof a=="string"?a=new Mn(a,i.mode,null,i.lineSeparator,i.direction):i.mode&&(a.modeOption=i.mode),this.doc=a;var u=new Ut.inputStyles[i.inputStyle](this),d=this.display=new dg(n,a,u,i);d.wrapper.CodeMirror=this,fh(this),i.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),pf(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:-1,cutIncoming:-1,selectingText:!1,draggingText:!1,highlight:new Ye,keySeq:null,specialChars:null},i.autofocus&&!N&&d.input.focus(),p&&m<11&&setTimeout(function(){return o.display.input.reset(!0)},20),tv(this),Dg(),ur(this),this.curOp.forceUpdate=!0,bf(this,a),i.autofocus&&!N||this.hasFocus()?setTimeout(function(){o.hasFocus()&&!o.state.focused&&Dl(o)},20):Gr(this);for(var v in fo)fo.hasOwnProperty(v)&&fo[v](this,i[v],Qr);vf(this),i.finishInit&&i.finishInit(this);for(var y=0;y<Ql.length;++y)Ql[y](this);fr(this),g&&i.lineWrapping&&getComputedStyle(d.lineDiv).textRendering=="optimizelegibility"&&(d.lineDiv.style.textRendering="auto")}Ut.defaults=hh,Ut.optionHandlers=fo;function tv(n){var i=n.display;Me(i.scroller,"mousedown",nn(n,oh)),p&&m<11?Me(i.scroller,"dblclick",nn(n,function(b){if(!xe(n,b)){var E=ar(n,b);if(!(!E||Jl(n,b)||gi(n.display,b))){ht(b);var D=n.findWordAt(E);ro(n.doc,D.anchor,D.head)}}})):Me(i.scroller,"dblclick",function(b){return xe(n,b)||ht(b)}),Me(i.scroller,"contextmenu",function(b){return uh(n,b)}),Me(i.input.getField(),"contextmenu",function(b){i.scroller.contains(b.target)||uh(n,b)});var o,a={end:0};function u(){i.activeTouch&&(o=setTimeout(function(){return i.activeTouch=null},1e3),a=i.activeTouch,a.end=+new Date)}function d(b){if(b.touches.length!=1)return!1;var E=b.touches[0];return E.radiusX<=1&&E.radiusY<=1}function v(b,E){if(E.left==null)return!0;var D=E.left-b.left,F=E.top-b.top;return D*D+F*F>20*20}Me(i.scroller,"touchstart",function(b){if(!xe(n,b)&&!d(b)&&!Jl(n,b)){i.input.ensurePolled(),clearTimeout(o);var E=+new Date;i.activeTouch={start:E,moved:!1,prev:E-a.end<=300?a:null},b.touches.length==1&&(i.activeTouch.left=b.touches[0].pageX,i.activeTouch.top=b.touches[0].pageY)}}),Me(i.scroller,"touchmove",function(){i.activeTouch&&(i.activeTouch.moved=!0)}),Me(i.scroller,"touchend",function(b){var E=i.activeTouch;if(E&&!gi(i,b)&&E.left!=null&&!E.moved&&new Date-E.start<300){var D=n.coordsChar(i.activeTouch,"page"),F;!E.prev||v(E,E.prev)?F=new Tt(D,D):!E.prev.prev||v(E,E.prev.prev)?F=n.findWordAt(D):F=new Tt(ue(D.line,0),He(n.doc,ue(D.line+1,0))),n.setSelection(F.anchor,F.head),n.focus(),ht(b)}u()}),Me(i.scroller,"touchcancel",u),Me(i.scroller,"scroll",function(){i.scroller.clientHeight&&(Js(n,i.scroller.scrollTop),lr(n,i.scroller.scrollLeft,!0),_e(n,"scroll",n))}),Me(i.scroller,"mousewheel",function(b){return yf(n,b)}),Me(i.scroller,"DOMMouseScroll",function(b){return yf(n,b)}),Me(i.wrapper,"scroll",function(){return i.wrapper.scrollTop=i.wrapper.scrollLeft=0}),i.dragFunctions={enter:function(b){xe(n,b)||Mt(b)},over:function(b){xe(n,b)||(Pg(n,b),Mt(b))},start:function(b){return Lg(n,b)},drop:nn(n,Rg),leave:function(b){xe(n,b)||Kf(n)}};var y=i.input.getField();Me(y,"keyup",function(b){return sh.call(n,b)}),Me(y,"keydown",nn(n,rh)),Me(y,"keypress",nn(n,ah)),Me(y,"focus",function(b){return Dl(n,b)}),Me(y,"blur",function(b){return Gr(n,b)})}var Ql=[];Ut.defineInitHook=function(n){return Ql.push(n)};function ma(n,i,o,a){var u=n.doc,d;o==null&&(o="add"),o=="smart"&&(u.mode.indent?d=Ws(n,i).state:o="prev");var v=n.options.tabSize,y=Ae(u,i),b=je(y.text,null,v);y.stateAfter&&(y.stateAfter=null);var E=y.text.match(/^\s*/)[0],D;if(!a&&!/\S/.test(y.text))D=0,o="not";else if(o=="smart"&&(D=u.mode.indent(d,y.text.slice(E.length),y.text),D==jt||D>150)){if(!a)return;o="prev"}o=="prev"?i>u.first?D=je(Ae(u,i-1).text,null,v):D=0:o=="add"?D=b+n.options.indentUnit:o=="subtract"?D=b-n.options.indentUnit:typeof o=="number"&&(D=b+o),D=Math.max(0,D);var F="",q=0;if(n.options.indentWithTabs)for(var G=Math.floor(D/v);G;--G)q+=v,F+="	";if(q<D&&(F+=U(D-q)),F!=E)return Kr(u,F,ue(i,0),ue(i,E.length),"+input"),y.stateAfter=null,!0;for(var ne=0;ne<u.sel.ranges.length;ne++){var ce=u.sel.ranges[ne];if(ce.head.line==i&&ce.head.ch<E.length){var ge=ue(i,E.length);Xl(u,ne,new Tt(ge,ge));break}}}var Zn=null;function ho(n){Zn=n}function $l(n,i,o,a,u){var d=n.doc;n.display.shift=!1,a||(a=d.sel);var v=+new Date-200,y=u=="paste"||n.state.pasteIncoming>v,b=Ur(i),E=null;if(y&&a.ranges.length>1)if(Zn&&Zn.text.join(`
`)==i){if(a.ranges.length%Zn.text.length==0){E=[];for(var D=0;D<Zn.text.length;D++)E.push(d.splitLines(Zn.text[D]))}}else b.length==a.ranges.length&&n.options.pasteLinesPerSelection&&(E=$(b,function(Te){return[Te]}));for(var F=n.curOp.updateInput,q=a.ranges.length-1;q>=0;q--){var G=a.ranges[q],ne=G.from(),ce=G.to();G.empty()&&(o&&o>0?ne=ue(ne.line,ne.ch-o):n.state.overwrite&&!y?ce=ue(ce.line,Math.min(Ae(d,ce.line).text.length,ce.ch+C(b).length)):y&&Zn&&Zn.lineWise&&Zn.text.join(`
`)==b.join(`
`)&&(ne=ce=ue(ne.line,0)));var ge={from:ne,to:ce,text:E?E[q%E.length]:b,origin:u||(y?"paste":n.state.cutIncoming>v?"cut":"+input")};Yr(n.doc,ge),tn(n,"inputRead",n,ge)}i&&!y&&ph(n,i),Wr(n),n.curOp.updateInput<2&&(n.curOp.updateInput=F),n.curOp.typing=!0,n.state.pasteIncoming=n.state.cutIncoming=-1}function dh(n,i){var o=n.clipboardData&&n.clipboardData.getData("Text");if(o)return n.preventDefault(),!i.isReadOnly()&&!i.options.disableInput&&i.hasFocus()&&Ln(i,function(){return $l(i,o,0,null,"paste")}),!0}function ph(n,i){if(!(!n.options.electricChars||!n.options.smartIndent))for(var o=n.doc.sel,a=o.ranges.length-1;a>=0;a--){var u=o.ranges[a];if(!(u.head.ch>100||a&&o.ranges[a-1].head.line==u.head.line)){var d=n.getModeAt(u.head),v=!1;if(d.electricChars){for(var y=0;y<d.electricChars.length;y++)if(i.indexOf(d.electricChars.charAt(y))>-1){v=ma(n,u.head.line,"smart");break}}else d.electricInput&&d.electricInput.test(Ae(n.doc,u.head.line).text.slice(0,u.head.ch))&&(v=ma(n,u.head.line,"smart"));v&&tn(n,"electricInput",n,u.head.line)}}}function mh(n){for(var i=[],o=[],a=0;a<n.doc.sel.ranges.length;a++){var u=n.doc.sel.ranges[a].head.line,d={anchor:ue(u,0),head:ue(u+1,0)};o.push(d),i.push(n.getRange(d.anchor,d.head))}return{text:i,ranges:o}}function ec(n,i,o,a){n.setAttribute("autocorrect",o?"on":"off"),n.setAttribute("autocapitalize",a?"on":"off"),n.setAttribute("spellcheck",!!i)}function gh(){var n=X("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none"),i=X("div",[n],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return g?n.style.width="1000px":n.setAttribute("wrap","off"),I&&(n.style.border="1px solid black"),i}function nv(n){var i=n.optionHandlers,o=n.helpers={};n.prototype={constructor:n,focus:function(){Ge(this).focus(),this.display.input.focus()},setOption:function(a,u){var d=this.options,v=d[a];d[a]==u&&a!="mode"||(d[a]=u,i.hasOwnProperty(a)&&nn(this,i[a])(this,u,v),_e(this,"optionChange",this,a))},getOption:function(a){return this.options[a]},getDoc:function(){return this.doc},addKeyMap:function(a,u){this.state.keyMaps[u?"push":"unshift"](co(a))},removeKeyMap:function(a){for(var u=this.state.keyMaps,d=0;d<u.length;++d)if(u[d]==a||u[d].name==a)return u.splice(d,1),!0},addOverlay:gn(function(a,u){var d=a.token?a:n.getMode(this.options,a);if(d.startState)throw new Error("Overlays may not be stateful.");ye(this.state.overlays,{mode:d,modeSpec:a,opaque:u&&u.opaque,priority:u&&u.priority||0},function(v){return v.priority}),this.state.modeGen++,Sn(this)}),removeOverlay:gn(function(a){for(var u=this.state.overlays,d=0;d<u.length;++d){var v=u[d].modeSpec;if(v==a||typeof a=="string"&&v.name==a){u.splice(d,1),this.state.modeGen++,Sn(this);return}}}),indentLine:gn(function(a,u,d){typeof u!="string"&&typeof u!="number"&&(u==null?u=this.options.smartIndent?"smart":"prev":u=u?"add":"subtract"),hi(this.doc,a)&&ma(this,a,u,d)}),indentSelection:gn(function(a){for(var u=this.doc.sel.ranges,d=-1,v=0;v<u.length;v++){var y=u[v];if(y.empty())y.head.line>d&&(ma(this,y.head.line,a,!0),d=y.head.line,v==this.doc.sel.primIndex&&Wr(this));else{var b=y.from(),E=y.to(),D=Math.max(d,b.line);d=Math.min(this.lastLine(),E.line-(E.ch?0:1))+1;for(var F=D;F<d;++F)ma(this,F,a);var q=this.doc.sel.ranges;b.ch==0&&u.length==q.length&&q[v].from().ch>0&&Xl(this.doc,v,new Tt(b,q[v].to()),ke)}}}),getTokenAt:function(a,u){return Eu(this,a,u)},getLineTokens:function(a,u){return Eu(this,ue(a),u,!0)},getTokenTypeAt:function(a){a=He(this.doc,a);var u=Mu(this,Ae(this.doc,a.line)),d=0,v=(u.length-1)/2,y=a.ch,b;if(y==0)b=u[2];else for(;;){var E=d+v>>1;if((E?u[E*2-1]:0)>=y)v=E;else if(u[E*2+1]<y)d=E+1;else{b=u[E*2+2];break}}var D=b?b.indexOf("overlay "):-1;return D<0?b:D==0?null:b.slice(0,D-1)},getModeAt:function(a){var u=this.doc.mode;return u.innerMode?n.innerMode(u,this.getTokenAt(a).state).mode:u},getHelper:function(a,u){return this.getHelpers(a,u)[0]},getHelpers:function(a,u){var d=[];if(!o.hasOwnProperty(u))return d;var v=o[u],y=this.getModeAt(a);if(typeof y[u]=="string")v[y[u]]&&d.push(v[y[u]]);else if(y[u])for(var b=0;b<y[u].length;b++){var E=v[y[u][b]];E&&d.push(E)}else y.helperType&&v[y.helperType]?d.push(v[y.helperType]):v[y.name]&&d.push(v[y.name]);for(var D=0;D<v._global.length;D++){var F=v._global[D];F.pred(y,this)&&Je(d,F.val)==-1&&d.push(F.val)}return d},getStateAfter:function(a,u){var d=this.doc;return a=Or(d,a??d.first+d.size-1),Ws(this,a+1,u).state},cursorCoords:function(a,u){var d,v=this.doc.sel.primary();return a==null?d=v.head:typeof a=="object"?d=He(this.doc,a):d=a?v.from():v.to(),Kn(this,d,u||"page")},charCoords:function(a,u){return Ka(this,He(this.doc,a),u||"page")},coordsChar:function(a,u){return a=ef(this,a,u||"page"),bl(this,a.left,a.top)},lineAtHeight:function(a,u){return a=ef(this,{top:a,left:0},u||"page").top,st(this.doc,a+this.display.viewOffset)},heightAtLine:function(a,u,d){var v=!1,y;if(typeof a=="number"){var b=this.doc.first+this.doc.size-1;a<this.doc.first?a=this.doc.first:a>b&&(a=b,v=!0),y=Ae(this.doc,a)}else y=a;return Ya(this,y,{top:0,left:0},u||"page",d||v).top+(v?this.doc.height-mi(y):0)},defaultTextHeight:function(){return Hr(this.display)},defaultCharWidth:function(){return zr(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(a,u,d,v,y){var b=this.display;a=Kn(this,He(this.doc,a));var E=a.bottom,D=a.left;if(u.style.position="absolute",u.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(u),b.sizer.appendChild(u),v=="over")E=a.top;else if(v=="above"||v=="near"){var F=Math.max(b.wrapper.clientHeight,this.doc.height),q=Math.max(b.sizer.clientWidth,b.lineSpace.clientWidth);(v=="above"||a.bottom+u.offsetHeight>F)&&a.top>u.offsetHeight?E=a.top-u.offsetHeight:a.bottom+u.offsetHeight<=F&&(E=a.bottom),D+u.offsetWidth>q&&(D=q-u.offsetWidth)}u.style.top=E+"px",u.style.left=u.style.right="",y=="right"?(D=b.sizer.clientWidth-u.offsetWidth,u.style.right="0px"):(y=="left"?D=0:y=="middle"&&(D=(b.sizer.clientWidth-u.offsetWidth)/2),u.style.left=D+"px"),d&&$m(this,{left:D,top:E,right:D+u.offsetWidth,bottom:E+u.offsetHeight})},triggerOnKeyDown:gn(rh),triggerOnKeyPress:gn(ah),triggerOnKeyUp:sh,triggerOnMouseDown:gn(oh),execCommand:function(a){if(fa.hasOwnProperty(a))return fa[a].call(null,this)},triggerElectric:gn(function(a){ph(this,a)}),findPosH:function(a,u,d,v){var y=1;u<0&&(y=-1,u=-u);for(var b=He(this.doc,a),E=0;E<u&&(b=tc(this.doc,b,y,d,v),!b.hitSide);++E);return b},moveH:gn(function(a,u){var d=this;this.extendSelectionsBy(function(v){return d.display.shift||d.doc.extend||v.empty()?tc(d.doc,v.head,a,u,d.options.rtlMoveVisually):a<0?v.from():v.to()},Oe)}),deleteH:gn(function(a,u){var d=this.doc.sel,v=this.doc;d.somethingSelected()?v.replaceSelection("",null,"+delete"):Jr(this,function(y){var b=tc(v,y.head,a,u,!1);return a<0?{from:b,to:y.head}:{from:y.head,to:b}})}),findPosV:function(a,u,d,v){var y=1,b=v;u<0&&(y=-1,u=-u);for(var E=He(this.doc,a),D=0;D<u;++D){var F=Kn(this,E,"div");if(b==null?b=F.left:F.left=b,E=vh(this,F,y,d),E.hitSide)break}return E},moveV:gn(function(a,u){var d=this,v=this.doc,y=[],b=!this.display.shift&&!v.extend&&v.sel.somethingSelected();if(v.extendSelectionsBy(function(D){if(b)return a<0?D.from():D.to();var F=Kn(d,D.head,"div");D.goalColumn!=null&&(F.left=D.goalColumn),y.push(F.left);var q=vh(d,F,a,u);return u=="page"&&D==v.sel.primary()&&Nl(d,Ka(d,q,"div").top-F.top),q},Oe),y.length)for(var E=0;E<v.sel.ranges.length;E++)v.sel.ranges[E].goalColumn=y[E]}),findWordAt:function(a){var u=this.doc,d=Ae(u,a.line).text,v=a.ch,y=a.ch;if(d){var b=this.getHelper(a,"wordChars");(a.sticky=="before"||y==d.length)&&v?--v:++y;for(var E=d.charAt(v),D=Ne(E,b)?function(F){return Ne(F,b)}:/\s/.test(E)?function(F){return/\s/.test(F)}:function(F){return!/\s/.test(F)&&!Ne(F)};v>0&&D(d.charAt(v-1));)--v;for(;y<d.length&&D(d.charAt(y));)++y}return new Tt(ue(a.line,v),ue(a.line,y))},toggleOverwrite:function(a){a!=null&&a==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?le(this.display.cursorDiv,"CodeMirror-overwrite"):oe(this.display.cursorDiv,"CodeMirror-overwrite"),_e(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==Z(he(this))},isReadOnly:function(){return!!(this.options.readOnly||this.doc.cantEdit)},scrollTo:gn(function(a,u){Zs(this,a,u)}),getScrollInfo:function(){var a=this.display.scroller;return{left:a.scrollLeft,top:a.scrollTop,height:a.scrollHeight-ri(this)-this.display.barHeight,width:a.scrollWidth-ri(this)-this.display.barWidth,clientHeight:yl(this),clientWidth:rr(this)}},scrollIntoView:gn(function(a,u){a==null?(a={from:this.doc.sel.primary().head,to:null},u==null&&(u=this.options.cursorScrollMargin)):typeof a=="number"?a={from:ue(a,0),to:null}:a.from==null&&(a={from:a,to:null}),a.to||(a.to=a.from),a.margin=u||0,a.from.line!=null?eg(this,a):uf(this,a.from,a.to,a.margin)}),setSize:gn(function(a,u){var d=this,v=function(b){return typeof b=="number"||/^\d+$/.test(String(b))?b+"px":b};a!=null&&(this.display.wrapper.style.width=v(a)),u!=null&&(this.display.wrapper.style.height=v(u)),this.options.lineWrapping&&Ju(this);var y=this.display.viewFrom;this.doc.iter(y,this.display.viewTo,function(b){if(b.widgets){for(var E=0;E<b.widgets.length;E++)if(b.widgets[E].noHScroll){Ui(d,y,"widget");break}}++y}),this.curOp.forceUpdate=!0,_e(this,"refresh",this)}),operation:function(a){return Ln(this,a)},startOperation:function(){return ur(this)},endOperation:function(){return fr(this)},refresh:gn(function(){var a=this.display.cachedTextHeight;Sn(this),this.curOp.forceUpdate=!0,Ks(this),Zs(this,this.doc.scrollLeft,this.doc.scrollTop),Fl(this.display),(a==null||Math.abs(a-Hr(this.display))>.5||this.options.lineWrapping)&&Cl(this),_e(this,"refresh",this)}),swapDoc:gn(function(a){var u=this.doc;return u.cm=null,this.state.selectingText&&this.state.selectingText(),bf(this,a),Ks(this),this.display.input.reset(),Zs(this,a.scrollLeft,a.scrollTop),this.curOp.forceScroll=!0,tn(this,"swapDoc",this,u),u}),phrase:function(a){var u=this.options.phrases;return u&&Object.prototype.hasOwnProperty.call(u,a)?u[a]:a},getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},St(n),n.registerHelper=function(a,u,d){o.hasOwnProperty(a)||(o[a]=n[a]={_global:[]}),o[a][u]=d},n.registerGlobalHelper=function(a,u,d,v){n.registerHelper(a,u,v),o[a]._global.push({pred:d,val:v})}}function tc(n,i,o,a,u){var d=i,v=o,y=Ae(n,i.line),b=u&&n.direction=="rtl"?-o:o;function E(){var Ce=i.line+b;return Ce<n.first||Ce>=n.first+n.size?!1:(i=new ue(Ce,i.ch,i.sticky),y=Ae(n,Ce))}function D(Ce){var be;if(a=="codepoint"){var Pe=y.text.charCodeAt(i.ch+(o>0?0:-1));if(isNaN(Pe))be=null;else{var qe=o>0?Pe>=55296&&Pe<56320:Pe>=56320&&Pe<57343;be=new ue(i.line,Math.max(0,Math.min(y.text.length,i.ch+o*(qe?2:1))),-o)}}else u?be=Fg(n.cm,y,i,o):be=Yl(y,i,o);if(be==null)if(!Ce&&E())i=Kl(u,n.cm,y,i.line,b);else return!1;else i=be;return!0}if(a=="char"||a=="codepoint")D();else if(a=="column")D(!0);else if(a=="word"||a=="group")for(var F=null,q=a=="group",G=n.cm&&n.cm.getHelper(i,"wordChars"),ne=!0;!(o<0&&!D(!ne));ne=!1){var ce=y.text.charAt(i.ch)||`
`,ge=Ne(ce,G)?"w":q&&ce==`
`?"n":!q||/\s/.test(ce)?null:"p";if(q&&!ne&&!ge&&(ge="s"),F&&F!=ge){o<0&&(o=1,D(),i.sticky="after");break}if(ge&&(F=ge),o>0&&!D(!ne))break}var Te=ao(n,i,d,v,!0);return di(d,Te)&&(Te.hitSide=!0),Te}function vh(n,i,o,a){var u=n.doc,d=i.left,v;if(a=="page"){var y=Math.min(n.display.wrapper.clientHeight,Ge(n).innerHeight||u(n).documentElement.clientHeight),b=Math.max(y-.5*Hr(n.display),3);v=(o>0?i.bottom:i.top)+o*b}else a=="line"&&(v=o>0?i.bottom+3:i.top-3);for(var E;E=bl(n,d,v),!!E.outside;){if(o<0?v<=0:v>=u.height){E.hitSide=!0;break}v+=o*5}return E}var Et=function(n){this.cm=n,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new Ye,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null};Et.prototype.init=function(n){var i=this,o=this,a=o.cm,u=o.div=n.lineDiv;u.contentEditable=!0,ec(u,a.options.spellcheck,a.options.autocorrect,a.options.autocapitalize);function d(y){for(var b=y.target;b;b=b.parentNode){if(b==u)return!0;if(/\bCodeMirror-(?:line)?widget\b/.test(b.className))break}return!1}Me(u,"paste",function(y){!d(y)||xe(a,y)||dh(y,a)||m<=11&&setTimeout(nn(a,function(){return i.updateFromDOM()}),20)}),Me(u,"compositionstart",function(y){i.composing={data:y.data,done:!1}}),Me(u,"compositionupdate",function(y){i.composing||(i.composing={data:y.data,done:!1})}),Me(u,"compositionend",function(y){i.composing&&(y.data!=i.composing.data&&i.readFromDOMSoon(),i.composing.done=!0)}),Me(u,"touchstart",function(){return o.forceCompositionEnd()}),Me(u,"input",function(){i.composing||i.readFromDOMSoon()});function v(y){if(!(!d(y)||xe(a,y))){if(a.somethingSelected())ho({lineWise:!1,text:a.getSelections()}),y.type=="cut"&&a.replaceSelection("",null,"cut");else if(a.options.lineWiseCopyCut){var b=mh(a);ho({lineWise:!0,text:b.text}),y.type=="cut"&&a.operation(function(){a.setSelections(b.ranges,0,ke),a.replaceSelection("",null,"cut")})}else return;if(y.clipboardData){y.clipboardData.clearData();var E=Zn.text.join(`
`);if(y.clipboardData.setData("Text",E),y.clipboardData.getData("Text")==E){y.preventDefault();return}}var D=gh(),F=D.firstChild;ec(F),a.display.lineSpace.insertBefore(D,a.display.lineSpace.firstChild),F.value=Zn.text.join(`
`);var q=Z(we(u));fe(F),setTimeout(function(){a.display.lineSpace.removeChild(D),q.focus(),q==u&&o.showPrimarySelection()},50)}}Me(u,"copy",v),Me(u,"cut",v)},Et.prototype.screenReaderLabelChanged=function(n){n?this.div.setAttribute("aria-label",n):this.div.removeAttribute("aria-label")},Et.prototype.prepareSelection=function(){var n=of(this.cm,!1);return n.focus=Z(we(this.div))==this.div,n},Et.prototype.showSelection=function(n,i){!n||!this.cm.display.view.length||((n.focus||i)&&this.showPrimarySelection(),this.showMultipleSelections(n))},Et.prototype.getSelection=function(){return this.cm.display.wrapper.ownerDocument.getSelection()},Et.prototype.showPrimarySelection=function(){var n=this.getSelection(),i=this.cm,o=i.doc.sel.primary(),a=o.from(),u=o.to();if(i.display.viewTo==i.display.viewFrom||a.line>=i.display.viewTo||u.line<i.display.viewFrom){n.removeAllRanges();return}var d=po(i,n.anchorNode,n.anchorOffset),v=po(i,n.focusNode,n.focusOffset);if(!(d&&!d.bad&&v&&!v.bad&&tt(kn(d,v),a)==0&&tt(qt(d,v),u)==0)){var y=i.display.view,b=a.line>=i.display.viewFrom&&_h(i,a)||{node:y[0].measure.map[2],offset:0},E=u.line<i.display.viewTo&&_h(i,u);if(!E){var D=y[y.length-1].measure,F=D.maps?D.maps[D.maps.length-1]:D.map;E={node:F[F.length-1],offset:F[F.length-2]-F[F.length-3]}}if(!b||!E){n.removeAllRanges();return}var q=n.rangeCount&&n.getRangeAt(0),G;try{G=K(b.node,b.offset,E.offset,E.node)}catch{}G&&(!s&&i.state.focused?(n.collapse(b.node,b.offset),G.collapsed||(n.removeAllRanges(),n.addRange(G))):(n.removeAllRanges(),n.addRange(G)),q&&n.anchorNode==null?n.addRange(q):s&&this.startGracePeriod()),this.rememberSelection()}},Et.prototype.startGracePeriod=function(){var n=this;clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout(function(){n.gracePeriod=!1,n.selectionChanged()&&n.cm.operation(function(){return n.cm.curOp.selectionChanged=!0})},20)},Et.prototype.showMultipleSelections=function(n){V(this.cm.display.cursorDiv,n.cursors),V(this.cm.display.selectionDiv,n.selection)},Et.prototype.rememberSelection=function(){var n=this.getSelection();this.lastAnchorNode=n.anchorNode,this.lastAnchorOffset=n.anchorOffset,this.lastFocusNode=n.focusNode,this.lastFocusOffset=n.focusOffset},Et.prototype.selectionInEditor=function(){var n=this.getSelection();if(!n.rangeCount)return!1;var i=n.getRangeAt(0).commonAncestorContainer;return Q(this.div,i)},Et.prototype.focus=function(){this.cm.options.readOnly!="nocursor"&&((!this.selectionInEditor()||Z(we(this.div))!=this.div)&&this.showSelection(this.prepareSelection(),!0),this.div.focus())},Et.prototype.blur=function(){this.div.blur()},Et.prototype.getField=function(){return this.div},Et.prototype.supportsTouch=function(){return!0},Et.prototype.receivedFocus=function(){var n=this,i=this;this.selectionInEditor()?setTimeout(function(){return n.pollSelection()},20):Ln(this.cm,function(){return i.cm.curOp.selectionChanged=!0});function o(){i.cm.state.focused&&(i.pollSelection(),i.polling.set(i.cm.options.pollInterval,o))}this.polling.set(this.cm.options.pollInterval,o)},Et.prototype.selectionChanged=function(){var n=this.getSelection();return n.anchorNode!=this.lastAnchorNode||n.anchorOffset!=this.lastAnchorOffset||n.focusNode!=this.lastFocusNode||n.focusOffset!=this.lastFocusOffset},Et.prototype.pollSelection=function(){if(!(this.readDOMTimeout!=null||this.gracePeriod||!this.selectionChanged())){var n=this.getSelection(),i=this.cm;if(R&&x&&this.cm.display.gutterSpecs.length&&iv(n.anchorNode)){this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),this.focus();return}if(!this.composing){this.rememberSelection();var o=po(i,n.anchorNode,n.anchorOffset),a=po(i,n.focusNode,n.focusOffset);o&&a&&Ln(i,function(){dn(i.doc,Fi(o,a),ke),(o.bad||a.bad)&&(i.curOp.selectionChanged=!0)})}}},Et.prototype.pollContent=function(){this.readDOMTimeout!=null&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null);var n=this.cm,i=n.display,o=n.doc.sel.primary(),a=o.from(),u=o.to();if(a.ch==0&&a.line>n.firstLine()&&(a=ue(a.line-1,Ae(n.doc,a.line-1).length)),u.ch==Ae(n.doc,u.line).text.length&&u.line<n.lastLine()&&(u=ue(u.line+1,0)),a.line<i.viewFrom||u.line>i.viewTo-1)return!1;var d,v,y;a.line==i.viewFrom||(d=or(n,a.line))==0?(v=Ke(i.view[0].line),y=i.view[0].node):(v=Ke(i.view[d].line),y=i.view[d-1].node.nextSibling);var b=or(n,u.line),E,D;if(b==i.view.length-1?(E=i.viewTo-1,D=i.lineDiv.lastChild):(E=Ke(i.view[b+1].line)-1,D=i.view[b+1].node.previousSibling),!y)return!1;for(var F=n.doc.splitLines(rv(n,y,D,v,E)),q=Xt(n.doc,ue(v,0),ue(E,Ae(n.doc,E).text.length));F.length>1&&q.length>1;)if(C(F)==C(q))F.pop(),q.pop(),E--;else if(F[0]==q[0])F.shift(),q.shift(),v++;else break;for(var G=0,ne=0,ce=F[0],ge=q[0],Te=Math.min(ce.length,ge.length);G<Te&&ce.charCodeAt(G)==ge.charCodeAt(G);)++G;for(var Ce=C(F),be=C(q),Pe=Math.min(Ce.length-(F.length==1?G:0),be.length-(q.length==1?G:0));ne<Pe&&Ce.charCodeAt(Ce.length-ne-1)==be.charCodeAt(be.length-ne-1);)++ne;if(F.length==1&&q.length==1&&v==a.line)for(;G&&G>a.ch&&Ce.charCodeAt(Ce.length-ne-1)==be.charCodeAt(be.length-ne-1);)G--,ne++;F[F.length-1]=Ce.slice(0,Ce.length-ne).replace(/^\u200b+/,""),F[0]=F[0].slice(G).replace(/\u200b+$/,"");var qe=ue(v,G),ze=ue(E,q.length?C(q).length-ne:0);if(F.length>1||F[0]||tt(qe,ze))return Kr(n.doc,F,qe,ze,"+input"),!0},Et.prototype.ensurePolled=function(){this.forceCompositionEnd()},Et.prototype.reset=function(){this.forceCompositionEnd()},Et.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},Et.prototype.readFromDOMSoon=function(){var n=this;this.readDOMTimeout==null&&(this.readDOMTimeout=setTimeout(function(){if(n.readDOMTimeout=null,n.composing)if(n.composing.done)n.composing=null;else return;n.updateFromDOM()},80))},Et.prototype.updateFromDOM=function(){var n=this;(this.cm.isReadOnly()||!this.pollContent())&&Ln(this.cm,function(){return Sn(n.cm)})},Et.prototype.setUneditable=function(n){n.contentEditable="false"},Et.prototype.onKeyPress=function(n){n.charCode==0||this.composing||(n.preventDefault(),this.cm.isReadOnly()||nn(this.cm,$l)(this.cm,String.fromCharCode(n.charCode==null?n.keyCode:n.charCode),0))},Et.prototype.readOnlyChanged=function(n){this.div.contentEditable=String(n!="nocursor")},Et.prototype.onContextMenu=function(){},Et.prototype.resetPosition=function(){},Et.prototype.needsContentAttribute=!0;function _h(n,i){var o=Sl(n,i.line);if(!o||o.hidden)return null;var a=Ae(n.doc,i.line),u=qu(o,a,i.line),d=gt(a,n.doc.direction),v="left";if(d){var y=Ie(d,i.ch);v=y%2?"right":"left"}var b=ju(u.map,i.ch,v);return b.offset=b.collapse=="right"?b.end:b.start,b}function iv(n){for(var i=n;i;i=i.parentNode)if(/CodeMirror-gutter-wrapper/.test(i.className))return!0;return!1}function $r(n,i){return i&&(n.bad=!0),n}function rv(n,i,o,a,u){var d="",v=!1,y=n.doc.lineSeparator(),b=!1;function E(G){return function(ne){return ne.id==G}}function D(){v&&(d+=y,b&&(d+=y),v=b=!1)}function F(G){G&&(D(),d+=G)}function q(G){if(G.nodeType==1){var ne=G.getAttribute("cm-text");if(ne){F(ne);return}var ce=G.getAttribute("cm-marker"),ge;if(ce){var Te=n.findMarks(ue(a,0),ue(u+1,0),E(+ce));Te.length&&(ge=Te[0].find(0))&&F(Xt(n.doc,ge.from,ge.to).join(y));return}if(G.getAttribute("contenteditable")=="false")return;var Ce=/^(pre|div|p|li|table|br)$/i.test(G.nodeName);if(!/^br$/i.test(G.nodeName)&&G.textContent.length==0)return;Ce&&D();for(var be=0;be<G.childNodes.length;be++)q(G.childNodes[be]);/^(pre|p)$/i.test(G.nodeName)&&(b=!0),Ce&&(v=!0)}else G.nodeType==3&&F(G.nodeValue.replace(/\u200b/g,"").replace(/\u00a0/g," "))}for(;q(i),i!=o;)i=i.nextSibling,b=!1;return d}function po(n,i,o){var a;if(i==n.display.lineDiv){if(a=n.display.lineDiv.childNodes[o],!a)return $r(n.clipPos(ue(n.display.viewTo-1)),!0);i=null,o=0}else for(a=i;;a=a.parentNode){if(!a||a==n.display.lineDiv)return null;if(a.parentNode&&a.parentNode==n.display.lineDiv)break}for(var u=0;u<n.display.view.length;u++){var d=n.display.view[u];if(d.node==a)return sv(d,i,o)}}function sv(n,i,o){var a=n.text.firstChild,u=!1;if(!i||!Q(a,i))return $r(ue(Ke(n.line),0),!0);if(i==a&&(u=!0,i=a.childNodes[o],o=0,!i)){var d=n.rest?C(n.rest):n.line;return $r(ue(Ke(d),d.text.length),u)}var v=i.nodeType==3?i:null,y=i;for(!v&&i.childNodes.length==1&&i.firstChild.nodeType==3&&(v=i.firstChild,o&&(o=v.nodeValue.length));y.parentNode!=a;)y=y.parentNode;var b=n.measure,E=b.maps;function D(ge,Te,Ce){for(var be=-1;be<(E?E.length:0);be++)for(var Pe=be<0?b.map:E[be],qe=0;qe<Pe.length;qe+=3){var ze=Pe[qe+2];if(ze==ge||ze==Te){var dt=Ke(be<0?n.line:n.rest[be]),Ct=Pe[qe]+Ce;return(Ce<0||ze!=ge)&&(Ct=Pe[qe+(Ce?1:0)]),ue(dt,Ct)}}}var F=D(v,y,o);if(F)return $r(F,u);for(var q=y.nextSibling,G=v?v.nodeValue.length-o:0;q;q=q.nextSibling){if(F=D(q,q.firstChild,0),F)return $r(ue(F.line,F.ch-G),u);G+=q.textContent.length}for(var ne=y.previousSibling,ce=o;ne;ne=ne.previousSibling){if(F=D(ne,ne.firstChild,-1),F)return $r(ue(F.line,F.ch+ce),u);ce+=ne.textContent.length}}var zt=function(n){this.cm=n,this.prevInput="",this.pollingFast=!1,this.polling=new Ye,this.hasSelection=!1,this.composing=null,this.resetting=!1};zt.prototype.init=function(n){var i=this,o=this,a=this.cm;this.createField(n);var u=this.textarea;n.wrapper.insertBefore(this.wrapper,n.wrapper.firstChild),I&&(u.style.width="0px"),Me(u,"input",function(){p&&m>=9&&i.hasSelection&&(i.hasSelection=null),o.poll()}),Me(u,"paste",function(v){xe(a,v)||dh(v,a)||(a.state.pasteIncoming=+new Date,o.fastPoll())});function d(v){if(!xe(a,v)){if(a.somethingSelected())ho({lineWise:!1,text:a.getSelections()});else if(a.options.lineWiseCopyCut){var y=mh(a);ho({lineWise:!0,text:y.text}),v.type=="cut"?a.setSelections(y.ranges,null,ke):(o.prevInput="",u.value=y.text.join(`
`),fe(u))}else return;v.type=="cut"&&(a.state.cutIncoming=+new Date)}}Me(u,"cut",d),Me(u,"copy",d),Me(n.scroller,"paste",function(v){if(!(gi(n,v)||xe(a,v))){if(!u.dispatchEvent){a.state.pasteIncoming=+new Date,o.focus();return}var y=new Event("paste");y.clipboardData=v.clipboardData,u.dispatchEvent(y)}}),Me(n.lineSpace,"selectstart",function(v){gi(n,v)||ht(v)}),Me(u,"compositionstart",function(){var v=a.getCursor("from");o.composing&&o.composing.range.clear(),o.composing={start:v,range:a.markText(v,a.getCursor("to"),{className:"CodeMirror-composing"})}}),Me(u,"compositionend",function(){o.composing&&(o.poll(),o.composing.range.clear(),o.composing=null)})},zt.prototype.createField=function(n){this.wrapper=gh(),this.textarea=this.wrapper.firstChild;var i=this.cm.options;ec(this.textarea,i.spellcheck,i.autocorrect,i.autocapitalize)},zt.prototype.screenReaderLabelChanged=function(n){n?this.textarea.setAttribute("aria-label",n):this.textarea.removeAttribute("aria-label")},zt.prototype.prepareSelection=function(){var n=this.cm,i=n.display,o=n.doc,a=of(n);if(n.options.moveInputWithCursor){var u=Kn(n,o.sel.primary().head,"div"),d=i.wrapper.getBoundingClientRect(),v=i.lineDiv.getBoundingClientRect();a.teTop=Math.max(0,Math.min(i.wrapper.clientHeight-10,u.top+v.top-d.top)),a.teLeft=Math.max(0,Math.min(i.wrapper.clientWidth-10,u.left+v.left-d.left))}return a},zt.prototype.showSelection=function(n){var i=this.cm,o=i.display;V(o.cursorDiv,n.cursors),V(o.selectionDiv,n.selection),n.teTop!=null&&(this.wrapper.style.top=n.teTop+"px",this.wrapper.style.left=n.teLeft+"px")},zt.prototype.reset=function(n){if(!(this.contextMenuPending||this.composing&&n)){var i=this.cm;if(this.resetting=!0,i.somethingSelected()){this.prevInput="";var o=i.getSelection();this.textarea.value=o,i.state.focused&&fe(this.textarea),p&&m>=9&&(this.hasSelection=o)}else n||(this.prevInput=this.textarea.value="",p&&m>=9&&(this.hasSelection=null));this.resetting=!1}},zt.prototype.getField=function(){return this.textarea},zt.prototype.supportsTouch=function(){return!1},zt.prototype.focus=function(){if(this.cm.options.readOnly!="nocursor"&&(!N||Z(we(this.textarea))!=this.textarea))try{this.textarea.focus()}catch{}},zt.prototype.blur=function(){this.textarea.blur()},zt.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},zt.prototype.receivedFocus=function(){this.slowPoll()},zt.prototype.slowPoll=function(){var n=this;this.pollingFast||this.polling.set(this.cm.options.pollInterval,function(){n.poll(),n.cm.state.focused&&n.slowPoll()})},zt.prototype.fastPoll=function(){var n=!1,i=this;i.pollingFast=!0;function o(){var a=i.poll();!a&&!n?(n=!0,i.polling.set(60,o)):(i.pollingFast=!1,i.slowPoll())}i.polling.set(20,o)},zt.prototype.poll=function(){var n=this,i=this.cm,o=this.textarea,a=this.prevInput;if(this.contextMenuPending||this.resetting||!i.state.focused||Ba(o)&&!a&&!this.composing||i.isReadOnly()||i.options.disableInput||i.state.keySeq)return!1;var u=o.value;if(u==a&&!i.somethingSelected())return!1;if(p&&m>=9&&this.hasSelection===u||W&&/[\uf700-\uf7ff]/.test(u))return i.display.input.reset(),!1;if(i.doc.sel==i.display.selForContextMenu){var d=u.charCodeAt(0);if(d==8203&&!a&&(a="​"),d==8666)return this.reset(),this.cm.execCommand("undo")}for(var v=0,y=Math.min(a.length,u.length);v<y&&a.charCodeAt(v)==u.charCodeAt(v);)++v;return Ln(i,function(){$l(i,u.slice(v),a.length-v,null,n.composing?"*compose":null),u.length>1e3||u.indexOf(`
`)>-1?o.value=n.prevInput="":n.prevInput=u,n.composing&&(n.composing.range.clear(),n.composing.range=i.markText(n.composing.start,i.getCursor("to"),{className:"CodeMirror-composing"}))}),!0},zt.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},zt.prototype.onKeyPress=function(){p&&m>=9&&(this.hasSelection=null),this.fastPoll()},zt.prototype.onContextMenu=function(n){var i=this,o=i.cm,a=o.display,u=i.textarea;i.contextMenuPending&&i.contextMenuPending();var d=ar(o,n),v=a.scroller.scrollTop;if(!d||A)return;var y=o.options.resetSelectionOnContextMenu;y&&o.doc.sel.contains(d)==-1&&nn(o,dn)(o.doc,Fi(d),ke);var b=u.style.cssText,E=i.wrapper.style.cssText,D=i.wrapper.offsetParent.getBoundingClientRect();i.wrapper.style.cssText="position: static",u.style.cssText=`position: absolute; width: 30px; height: 30px;
      top: `+(n.clientY-D.top-5)+"px; left: "+(n.clientX-D.left-5)+`px;
      z-index: 1000; background: `+(p?"rgba(255, 255, 255, .05)":"transparent")+`;
      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);`;var F;g&&(F=u.ownerDocument.defaultView.scrollY),a.input.focus(),g&&u.ownerDocument.defaultView.scrollTo(null,F),a.input.reset(),o.somethingSelected()||(u.value=i.prevInput=" "),i.contextMenuPending=G,a.selForContextMenu=o.doc.sel,clearTimeout(a.detectingSelectAll);function q(){if(u.selectionStart!=null){var ce=o.somethingSelected(),ge="​"+(ce?u.value:"");u.value="⇚",u.value=ge,i.prevInput=ce?"":"​",u.selectionStart=1,u.selectionEnd=ge.length,a.selForContextMenu=o.doc.sel}}function G(){if(i.contextMenuPending==G&&(i.contextMenuPending=!1,i.wrapper.style.cssText=E,u.style.cssText=b,p&&m<9&&a.scrollbars.setScrollTop(a.scroller.scrollTop=v),u.selectionStart!=null)){(!p||p&&m<9)&&q();var ce=0,ge=function(){a.selForContextMenu==o.doc.sel&&u.selectionStart==0&&u.selectionEnd>0&&i.prevInput=="​"?nn(o,Ff)(o):ce++<10?a.detectingSelectAll=setTimeout(ge,500):(a.selForContextMenu=null,a.input.reset())};a.detectingSelectAll=setTimeout(ge,200)}}if(p&&m>=9&&q(),O){Mt(n);var ne=function(){z(window,"mouseup",ne),setTimeout(G,20)};Me(window,"mouseup",ne)}else setTimeout(G,50)},zt.prototype.readOnlyChanged=function(n){n||this.reset(),this.textarea.disabled=n=="nocursor",this.textarea.readOnly=!!n},zt.prototype.setUneditable=function(){},zt.prototype.needsContentAttribute=!1;function av(n,i){if(i=i?nt(i):{},i.value=n.value,!i.tabindex&&n.tabIndex&&(i.tabindex=n.tabIndex),!i.placeholder&&n.placeholder&&(i.placeholder=n.placeholder),i.autofocus==null){var o=Z(we(n));i.autofocus=o==n||n.getAttribute("autofocus")!=null&&o==document.body}function a(){n.value=y.getValue()}var u;if(n.form&&(Me(n.form,"submit",a),!i.leaveSubmitMethodAlone)){var d=n.form;u=d.submit;try{var v=d.submit=function(){a(),d.submit=u,d.submit(),d.submit=v}}catch{}}i.finishInit=function(b){b.save=a,b.getTextArea=function(){return n},b.toTextArea=function(){b.toTextArea=isNaN,a(),n.parentNode.removeChild(b.getWrapperElement()),n.style.display="",n.form&&(z(n.form,"submit",a),!i.leaveSubmitMethodAlone&&typeof n.form.submit=="function"&&(n.form.submit=u))}},n.style.display="none";var y=Ut(function(b){return n.parentNode.insertBefore(b,n.nextSibling)},i);return y}function ov(n){n.off=z,n.on=Me,n.wheelEventPixels=pg,n.Doc=Mn,n.splitLines=Ur,n.countColumn=je,n.findColumn=Lt,n.isWordChar=Le,n.Pass=jt,n.signal=_e,n.Line=Fr,n.changeEnd=Bi,n.scrollbarModel=df,n.Pos=ue,n.cmpPos=tt,n.modes=P,n.mimeModes=j,n.resolveMode=J,n.getMode=De,n.modeExtensions=Be,n.extendMode=et,n.copyState=Ze,n.startState=ot,n.innerMode=ut,n.commands=fa,n.keyMap=_i,n.keyName=$f,n.isModifierKey=Jf,n.lookupKey=Zr,n.normalizeKeyMap=Og,n.StringStream=Ue,n.SharedTextMarker=la,n.TextMarker=Hi,n.LineWidget=oa,n.e_preventDefault=ht,n.e_stopPropagation=Vt,n.e_stop=Mt,n.addClass=le,n.contains=Q,n.rmClass=oe,n.keyNames=zi}Qg(Ut),nv(Ut);var lv="iter insert remove copy getEditor constructor".split(" ");for(var mo in Mn.prototype)Mn.prototype.hasOwnProperty(mo)&&Je(lv,mo)<0&&(Ut.prototype[mo]=function(n){return function(){return n.apply(this.doc,arguments)}}(Mn.prototype[mo]));return St(Mn),Ut.inputStyles={textarea:zt,contenteditable:Et},Ut.defineMode=function(n){!Ut.defaults.mode&&n!="null"&&(Ut.defaults.mode=n),te.apply(this,arguments)},Ut.defineMIME=re,Ut.defineMode("null",function(){return{token:function(n){return n.skipToEnd()}}}),Ut.defineMIME("text/plain","null"),Ut.defineExtension=function(n,i){Ut.prototype[n]=i},Ut.defineDocExtension=function(n,i){Mn.prototype[n]=i},Ut.fromTextArea=av,ov(Ut),Ut.version="5.65.21",Ut})}(Gc)),Gc.exports}var ib=sm();const rb=nb(ib);(function(l,e){(function(t){t(sm())})(function(t){function r(m){return new RegExp("^(("+m.join(")|(")+"))\\b")}var s=r(["and","or","not","is"]),c=["as","assert","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","lambda","pass","raise","return","try","while","with","yield","in","False","True"],f=["abs","all","any","bin","bool","bytearray","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip","__import__","NotImplemented","Ellipsis","__debug__"];t.registerHelper("hintWords","python",c.concat(f).concat(["exec","print"]));function h(m){return m.scopes[m.scopes.length-1]}t.defineMode("python",function(m,g){for(var _="error",x=g.delimiters||g.singleDelimiters||/^[\(\)\[\]\{\}@,:`=;\.\\]/,T=[g.singleOperators,g.doubleOperators,g.doubleDelimiters,g.tripleDelimiters,g.operators||/^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/],A=0;A<T.length;A++)T[A]||T.splice(A--,1);var w=g.hangingIndent||m.indentUnit,M=c,S=f;g.extra_keywords!=null&&(M=M.concat(g.extra_keywords)),g.extra_builtins!=null&&(S=S.concat(g.extra_builtins));var I=!(g.version&&Number(g.version)<3);if(I){var R=g.identifiers||/^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;M=M.concat(["nonlocal","None","aiter","anext","async","await","breakpoint","match","case"]),S=S.concat(["ascii","bytes","exec","print"]);var N=new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`,"i")}else{var R=g.identifiers||/^[_A-Za-z][_A-Za-z0-9]*/;M=M.concat(["exec","print"]),S=S.concat(["apply","basestring","buffer","cmp","coerce","execfile","file","intern","long","raw_input","reduce","reload","unichr","unicode","xrange","None"]);var N=new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`,"i")}var W=r(M),k=r(S);function B(H,K){var Q=H.sol()&&K.lastToken!="\\";if(Q&&(K.indent=H.indentation()),Q&&h(K).type=="py"){var Z=h(K).offset;if(H.eatSpace()){var le=H.indentation();return le>Z?se(K):le<Z&&pe(H,K)&&H.peek()!="#"&&(K.errorToken=!0),null}else{var de=ae(H,K);return Z>0&&pe(H,K)&&(de+=" "+_),de}}return ae(H,K)}function ae(H,K,Q){if(H.eatSpace())return null;if(!Q&&H.match(/^#.*/))return"comment";if(H.match(/^[0-9\.]/,!1)){var Z=!1;if(H.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)&&(Z=!0),H.match(/^[\d_]+\.\d*/)&&(Z=!0),H.match(/^\.\d+/)&&(Z=!0),Z)return H.eat(/J/i),"number";var le=!1;if(H.match(/^0x[0-9a-f_]+/i)&&(le=!0),H.match(/^0b[01_]+/i)&&(le=!0),H.match(/^0o[0-7_]+/i)&&(le=!0),H.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)&&(H.eat(/J/i),le=!0),H.match(/^0(?![\dx])/i)&&(le=!0),le)return H.eat(/L/i),"number"}if(H.match(N)){var de=H.current().toLowerCase().indexOf("f")!==-1;return de?(K.tokenize=L(H.current(),K.tokenize),K.tokenize(H,K)):(K.tokenize=O(H.current(),K.tokenize),K.tokenize(H,K))}for(var fe=0;fe<T.length;fe++)if(H.match(T[fe]))return"operator";return H.match(x)?"punctuation":K.lastToken=="."&&H.match(R)?"property":H.match(W)||H.match(s)?"keyword":H.match(k)?"builtin":H.match(/^(self|cls)\b/)?"variable-2":H.match(R)?K.lastToken=="def"||K.lastToken=="class"?"def":"variable":(H.next(),Q?null:_)}function L(H,K){for(;"rubf".indexOf(H.charAt(0).toLowerCase())>=0;)H=H.substr(1);var Q=H.length==1,Z="string";function le(fe){return function(ie,he){var we=ae(ie,he,!0);return we=="punctuation"&&(ie.current()=="{"?he.tokenize=le(fe+1):ie.current()=="}"&&(fe>1?he.tokenize=le(fe-1):he.tokenize=de)),we}}function de(fe,ie){for(;!fe.eol();)if(fe.eatWhile(/[^'"\{\}\\]/),fe.eat("\\")){if(fe.next(),Q&&fe.eol())return Z}else{if(fe.match(H))return ie.tokenize=K,Z;if(fe.match("{{"))return Z;if(fe.match("{",!1))return ie.tokenize=le(0),fe.current()?Z:ie.tokenize(fe,ie);if(fe.match("}}"))return Z;if(fe.match("}"))return _;fe.eat(/['"]/)}if(Q){if(g.singleLineStringErrors)return _;ie.tokenize=K}return Z}return de.isString=!0,de}function O(H,K){for(;"rubf".indexOf(H.charAt(0).toLowerCase())>=0;)H=H.substr(1);var Q=H.length==1,Z="string";function le(de,fe){for(;!de.eol();)if(de.eatWhile(/[^'"\\]/),de.eat("\\")){if(de.next(),Q&&de.eol())return Z}else{if(de.match(H))return fe.tokenize=K,Z;de.eat(/['"]/)}if(Q){if(g.singleLineStringErrors)return _;fe.tokenize=K}return Z}return le.isString=!0,le}function se(H){for(;h(H).type!="py";)H.scopes.pop();H.scopes.push({offset:h(H).offset+m.indentUnit,type:"py",align:null})}function oe(H,K,Q){var Z=H.match(/^[\s\[\{\(]*(?:#|$)/,!1)?null:H.column()+1;K.scopes.push({offset:K.indent+w,type:Q,align:Z})}function pe(H,K){for(var Q=H.indentation();K.scopes.length>1&&h(K).offset>Q;){if(h(K).type!="py")return!0;K.scopes.pop()}return h(K).offset!=Q}function V(H,K){H.sol()&&(K.beginningOfLine=!0,K.dedent=!1);var Q=K.tokenize(H,K),Z=H.current();if(K.beginningOfLine&&Z=="@")return H.match(R,!1)?"meta":I?"operator":_;if(/\S/.test(Z)&&(K.beginningOfLine=!1),(Q=="variable"||Q=="builtin")&&K.lastToken=="meta"&&(Q="meta"),(Z=="pass"||Z=="return")&&(K.dedent=!0),Z=="lambda"&&(K.lambda=!0),Z==":"&&!K.lambda&&h(K).type=="py"&&H.match(/^\s*(?:#|$)/,!1)&&se(K),Z.length==1&&!/string|comment/.test(Q)){var le="[({".indexOf(Z);if(le!=-1&&oe(H,K,"])}".slice(le,le+1)),le="])}".indexOf(Z),le!=-1)if(h(K).type==Z)K.indent=K.scopes.pop().offset-w;else return _}return K.dedent&&H.eol()&&h(K).type=="py"&&K.scopes.length>1&&K.scopes.pop(),Q}var X={startState:function(H){return{tokenize:B,scopes:[{offset:H||0,type:"py",align:null}],indent:H||0,lastToken:null,lambda:!1,dedent:0}},token:function(H,K){var Q=K.errorToken;Q&&(K.errorToken=!1);var Z=V(H,K);return Z&&Z!="comment"&&(K.lastToken=Z=="keyword"||Z=="punctuation"?H.current():Z),Z=="punctuation"&&(Z=null),H.eol()&&K.lambda&&(K.lambda=!1),Q?Z+" "+_:Z},indent:function(H,K){if(H.tokenize!=B)return H.tokenize.isString?t.Pass:0;var Q=h(H),Z=Q.type==K.charAt(0)||Q.type=="py"&&!H.dedent&&/^(else:|elif |except |finally:)/.test(K);return Q.align!=null?Q.align-(Z?1:0):Q.offset-(Z?w:0)},electricInput:/^\s*([\}\]\)]|else:|elif |except |finally:)$/,closeBrackets:{triples:`'"`},lineComment:"#",fold:"indent"};return X}),t.defineMIME("text/x-python","python");var p=function(m){return m.split(" ")};t.defineMIME("text/x-cython",{name:"python",extra_keywords:p("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")})})})();function sb(){const l=new IM,e=3100495;l.fog=new ol(e,20,80),l.background=new Qe(e);const t=window.innerWidth/window.innerHeight,r=9,s=new sl(-r*t,r*t,r,-r,1,1e3);s.position.set(20,20,20),s.lookAt(l.position);const c=new cT(16777215,.6);l.add(c);const f=new nm(16777215,.8);f.position.set(10,20,10),f.castShadow=!0,l.add(f);const h=new jp({antialias:!0});return h.setSize(window.innerWidth,window.innerHeight),h.setPixelRatio(Math.min(window.devicePixelRatio,2)),h.shadowMap.enabled=!0,window.addEventListener("resize",()=>{const p=window.innerWidth/window.innerHeight;s.left=-r*p,s.right=r*p,s.top=r,s.bottom=-r,s.updateProjectionMatrix(),h.setSize(window.innerWidth,window.innerHeight)}),{scene:l,camera:s,renderer:h}}const Gt={TERRA:0,PEDRA:1,CUME:2,FAZENDA:3};class am{static generate(e,t){e%2===0&&e++,t%2===0&&t++;const r=Array.from({length:t},()=>Array(e).fill(Gt.PEDRA)),s=1,c=1,f=[[s,c]];r[c][s]=Gt.TERRA;const h=[[0,-2],[0,2],[2,0],[-2,0]];for(;f.length>0;){const[T,A]=f[f.length-1],w=[];for(const[M,S]of h){const I=T+M,R=A+S;I>0&&I<e-1&&R>0&&R<t-1&&r[R][I]===Gt.PEDRA&&w.push({nx:I,ny:R,dx:M,dy:S})}if(w.length>0){const{nx:M,ny:S,dx:I,dy:R}=w[Math.floor(Math.random()*w.length)];r[A+R/2][T+I/2]=Gt.TERRA,r[S][M]=Gt.TERRA,f.push([M,S])}else f.pop()}for(let T=1;T<t-1;T++)for(let A=1;A<e-1;A++)if(r[T][A]===Gt.TERRA){let w=0;if(r[T-1][A]===Gt.PEDRA&&w++,r[T+1][A]===Gt.PEDRA&&w++,r[T][A-1]===Gt.PEDRA&&w++,r[T][A+1]===Gt.PEDRA&&w++,w===3&&Math.random()<.1){const S=[[0,-1],[0,1],[-1,0],[1,0]].filter(([I,R])=>T+R>0&&T+R<t-1&&A+I>0&&A+I<e-1&&r[T+R][A+I]===Gt.PEDRA);if(S.length>0){const[I,R]=S[Math.floor(Math.random()*S.length)];r[T+R][A+I]=Gt.TERRA}}}const p=Array.from({length:t},()=>Array(e).fill(-1)),m=[[s,c,0]];p[c][s]=0;let g=0,_=s,x=c;for(;m.length>0;){const[T,A,w]=m.shift();w>g&&(g=w,_=T,x=A);const M=[[0,1],[0,-1],[1,0],[-1,0]];for(let[S,I]of M){const R=T+S,N=A+I;R>=0&&R<e&&N>=0&&N<t&&r[N][R]===Gt.TERRA&&p[N][R]===-1&&(p[N][R]=w+1,m.push([R,N,w+1]))}}return r[c][s]=Gt.CUME,r[x][_]=Gt.FAZENDA,console.log(`Labirinto gerado! Saída em (${_}, ${x}) distância: ${g}`),r}}class ab{constructor(){this.group=new Ri,this.groundGrid=[],this.materials={ground:new Oc({color:9132587}),start:new Oc({color:255}),exit:new Oc({color:16711680})},this.geometries={ground:new Pr(1,.1,1)}}async render(e,t){this.group.clear(),this.groundGrid=[];const r=t.length,c=-t[0].length/2+.5,f=-r/2+.5;for(let h=0;h<r;h++)this.groundGrid[h]=[];return t.forEach((h,p)=>{h.forEach((m,g)=>{const _=g+c,x=p+f;let T=this.materials.ground;m===Gt.CUME&&(T=this.materials.start),m===Gt.FAZENDA&&(T=this.materials.exit),m!==Gt.TERRA&&(T=T.clone());const A=new Cn(this.geometries.ground,T);if(A.position.set(_,.05,x),A.receiveShadow=!0,this.group.add(A),this.groundGrid[p][g]=A,m===Gt.PEDRA){const w=Math.random();let M={key:"tree",scale:.4,yOffset:.1};w<.5?M={key:"tree",scale:.4,yOffset:0}:w<.7?M={key:"deadTree",scale:.4,yOffset:0}:M={key:"rock",scale:.5,yOffset:.2};const S=ru.get(M.key);S&&(S.position.set(_,M.yOffset,x),S.scale.setScalar(M.scale),S.rotation.y=Math.random()*Math.PI*2,this.group.add(S))}else if(m===Gt.TERRA&&Math.random()<.1){const w=ru.get("bush");w&&(w.position.set(_,0,x),w.scale.setScalar(.2),this.group.add(w))}})}),e.add(this.group),{offsetX:c,offsetZ:f}}highlightTile(e,t,r){if(this.groundGrid[t]&&this.groundGrid[t][e]){const s=this.groundGrid[t][e];s.material.name.includes("highlight")||(s.material=s.material.clone(),s.material.name="highlight"),s.material.color.setHex(r)}}}class ob{constructor(){this.mesh=new Ri;const e=new Pr(.6,.4,.8),t=new np({color:16753920}),r=new Cn(e,t);r.position.y=.3,r.castShadow=!0,this.mesh.add(r);const s=new gu(.2,.4,8),c=new np({color:65535}),f=new Cn(s,c);f.rotation.x=-Math.PI/2,f.position.set(0,.4,-.3),this.mesh.add(f),this.direction="N",this.actionQueue=[],this.isMoving=!1,this.animationTime=0,this.ANIMATION_DURATION=.3,this.startPos=new Y,this.targetPos=new Y,this.startRot=0,this.targetRot=0,this.currentMapData=null,this.mazeRenderer=null,this.onWin=null,this.onCrash=null}addToScene(e){e.add(this.mesh)}setPosition(e,t){this.mesh.position.set(e,0,t)}setRotation(e){this.direction=e;let t=0;switch(e){case"N":t=0;break;case"W":t=Math.PI/2;break;case"S":t=Math.PI;break;case"E":t=-Math.PI/2;break}this.mesh.rotation.y=t}processLogs(e){e.forEach(t=>{let r=t;typeof t.get=="function"&&(r=Object.fromEntries(t)),["MOVE","TURN_LEFT","TURN_RIGHT","PRINT"].includes(r.action)&&this.actionQueue.push(r)})}update(e){if(this.isMoving){this.animationTime+=e;const t=Math.min(this.animationTime/this.ANIMATION_DURATION,1),r=t*t*(3-2*t);this.mesh.position.lerpVectors(this.startPos,this.targetPos,r);let s=this.startRot,c=this.targetRot;this.mesh.rotation.y=s+(c-s)*r,t>=1&&(this.isMoving=!1,this.mesh.position.copy(this.targetPos),this.mesh.rotation.y=this.targetRot,this.checkWinCondition());return}if(this.actionQueue.length>0){const t=this.actionQueue.shift();this.startAnimation(t)}}startAnimation(e){switch(this.isMoving=!0,this.animationTime=0,this.startPos.copy(this.mesh.position),this.startRot=this.mesh.rotation.y,this.targetPos.copy(this.startPos),this.targetRot=this.startRot,e.action){case"MOVE":let r=this.targetPos.x,s=this.targetPos.z;if(this.direction==="N"?s-=1:this.direction==="S"?s+=1:this.direction==="E"?r+=1:this.direction==="W"&&(r-=1),this.isValidMove(r,s)){if(this.mazeRenderer&&typeof this.mazeRenderer.highlightTile=="function"&&this.currentMapData){const{gridX:c,gridZ:f}=this.worldToGrid(this.startPos.x,this.startPos.z);this.mazeRenderer.highlightTile(c,f,16776960)}this.targetPos.x=r,this.targetPos.z=s}else console.warn("CRASH! Wall at",r,s),this.isMoving=!1,this.mesh.position.y=.5,setTimeout(()=>{this.mesh&&(this.mesh.position.y=.3)},200),this.onCrash&&this.onCrash();break;case"TURN_LEFT":this.targetRot+=Math.PI/2,this.updateDirection("LEFT");break;case"TURN_RIGHT":this.targetRot-=Math.PI/2,this.updateDirection("RIGHT");break;case"PRINT":console.log("ROBERTO:",e.message),this.isMoving=!1;break}}worldToGrid(e,t){if(!this.currentMapData)return{gridX:0,gridZ:0};const r=this.currentMapData.length,c=-this.currentMapData[0].length/2+.5,f=-r/2+.5;return{gridX:Math.round(e-c),gridZ:Math.round(t-f)}}isValidMove(e,t){if(!this.currentMapData)return!0;const{gridX:r,gridZ:s}=this.worldToGrid(e,t),c=this.currentMapData.length,f=this.currentMapData[0].length;return r<0||r>=f||s<0||s>=c?!1:this.currentMapData[s][r]!==1}checkWinCondition(){if(!this.currentMapData)return;const{gridX:e,gridZ:t}=this.worldToGrid(this.mesh.position.x,this.mesh.position.z);this.currentMapData[t][e]===3&&this.onWin&&this.onWin()}updateDirection(e){const t=["N","E","S","W"];let r=t.indexOf(this.direction);e==="RIGHT"?r=(r+1)%4:r=(r-1+4)%4,this.direction=t[r]}}class lb{constructor(e,t){this.camera=e,this.rover=t,this.zoomLevel=15,this.minZoom=5,this.maxZoom=40,this.panSpeed=2,this.orbitAngle=Math.PI/4,this.radius=20,this.bindEvents()}bindEvents(){console.log("Binding Camera Controls...");const e=(t,r)=>{const s=document.getElementById(t);s?s.onclick=c=>{c.stopPropagation(),r()}:console.warn(`Camera Control Button not found: ${t}`)};e("btn-pan-n",()=>this.pan(0,1)),e("btn-pan-s",()=>this.pan(0,-1)),e("btn-pan-w",()=>this.pan(1,0)),e("btn-pan-e",()=>this.pan(-1,0)),e("btn-zoom-in",()=>this.zoom(1)),e("btn-zoom-out",()=>this.zoom(-1)),e("btn-focus",()=>this.focusTarget()),e("btn-rotate-cw",()=>this.rotate(1)),e("btn-rotate-ccw",()=>this.rotate(-1))}rotate(e){const t=Math.PI/4;this.orbitAngle+=e*t,this.focusTarget()}pan(e,t){this.camera.position.x+=e*this.panSpeed,this.camera.position.z+=t*this.panSpeed}zoom(e){this.camera.zoom+=e*.1,this.camera.zoom<.5&&(this.camera.zoom=.5),this.camera.zoom>2&&(this.camera.zoom=2),this.camera.updateProjectionMatrix()}focusTarget(){if(!this.rover||!this.rover.mesh)return;const e=this.rover.mesh.position,t=20,r=Math.cos(this.orbitAngle)*this.radius,s=Math.sin(this.orbitAngle)*this.radius;this.camera.position.set(e.x+r,t,e.z+s),this.camera.lookAt(e.x,e.y,e.z),this.camera.updateProjectionMatrix()}}const{scene:Is,camera:om,renderer:lm}=sb();document.getElementById("game-container").appendChild(lm.domElement);const cm=3100495;Is.fog=new ol(cm,20,100);Is.background=new Qe(cm);let Pt,La,Na=0,Ua=0,Li=[];const pp=new fT;(async()=>{const l=document.getElementById("status-readout");try{l.innerText="STATUS: CARREGANDO ASSETS...",await ru.loadAll(),l.innerText="STATUS: GERANDO TERRENO...",La=new ab,Li=am.generate(15,15);const{offsetX:e,offsetZ:t}=await La.render(Is,Li);Pt=new ob,Pt.addToScene(Is),Pt.currentMapData=Li,Pt.mazeRenderer=La,Li.forEach((r,s)=>{r.forEach((c,f)=>{c===Gt.CUME&&(Na=f+e,Ua=s+t)})}),Pt.setPosition(Na,Ua),Pt.setRotation("N"),cb(om,Pt),l.innerText="STATUS: INICIALIZANDO PYTHON...",await vp.init(),l.innerText="STATUS: SISTEMA ONLINE (PYTHON 3.11)",um()}catch(e){l.innerText="STATUS: ERRO CRÍTICO",console.error(e)}})();function cb(l,e){try{const t=new lb(l,e)}catch(t){console.error("Failed to init camera controls",t)}}async function ub(){const l=document.getElementById("status-readout");l.innerText="STATUS: GERANDO NOVO TERRENO...",Li=am.generate(15,15);const{offsetX:e,offsetZ:t}=await La.render(Is,Li);Li.forEach((r,s)=>{r.forEach((c,f)=>{c===Gt.CUME&&(Na=f+e,Ua=s+t)})}),Pt.setPosition(Na,Ua),Pt.setRotation("N"),Pt.currentMapData=Li,Pt.mazeRenderer=La,Pt.actionQueue=[],Pt.isMoving=!1,controls&&controls.focusTarget(),l.innerText="STATUS: TERRENO PRONTO."}const Ns=rb(document.getElementById("editor"),{value:`# -- PRJ: ROBERTO 
# Objetivo: Guiar Roberto do CUME ate a FAZENDA.

def main():
  # Comandos disponiveis:
  # roberto.mover()
  # roberto.virar_esquerda()
  # roberto.virar_direita()
  # if roberto.sensor() == 'LIVRE': ...
  
  for i in range(4):
      roberto.mover()
      roberto.escreva(f"Passo {i}")

# Executa a funcao principal
main()
`,mode:"python",theme:"dracula",lineNumbers:!0,indentUnit:4,extraKeys:{Tab:function(l){l.somethingSelected()?l.indentSelection("add"):l.replaceSelection("    ","end")}}}),mp=document.getElementById("terminal-header"),gp=document.getElementById("interface-container"),Wc=document.getElementById("btn-theme-toggle");mp&&gp&&mp.addEventListener("click",l=>{l.target.closest("#btn-theme-toggle")||(gp.classList.toggle("terminal-fullscreen"),typeof Ns<"u"&&setTimeout(()=>Ns.refresh(),50))});Wc&&Wc.addEventListener("click",l=>{l.stopPropagation();const t=Ns.getOption("theme")==="dracula"?"elegant":"dracula";Ns.setOption("theme",t),Wc.innerText=t==="dracula"?"🌙":"☀️"});function um(){if(requestAnimationFrame(um),!Pt)return;const l=pp.getDelta();Pt.update(l),Pt.mesh&&(Pt.mesh.position.y=Math.sin(pp.getElapsedTime()*2)*.05),lm.render(Is,om)}document.getElementById("btn-run").addEventListener("click",async()=>{if(!Pt)return;const l=Ns.getValue(),e=document.getElementById("status-readout");e.innerText="STATUS: PROCESSANDO...";try{const t=await uv.runUserCode(l,Li);console.log("Planos do Roberto:",t),Pt.processLogs(t),e.innerText="STATUS: EXECUTANDO MOVIMENTOS...",Pt.onWin=()=>{e.innerText="STATUS: RESGATE CONCLUIDO!",confetti({particleCount:100,spread:70,origin:{y:.6}}),alert("PARABENS! Roberto chegou a Fazenda!")},Pt.onCrash=()=>{e.innerText="STATUS: COLISAO DETECTADA (PARE!)"}}catch(t){console.error(t),alert(t.message),e.innerText="STATUS: ERRO DE COMPILACAO"}});document.getElementById("btn-reset").addEventListener("click",()=>{Pt&&(Pt.setPosition(Na,Ua),Pt.setRotation("N"),Pt.actionQueue=[],Pt.isMoving=!1,document.getElementById("status-readout").innerText="STATUS: REINICIADO")});document.getElementById("btn-new-map").addEventListener("click",async()=>{await ub(),Pt.actionQueue=[]});document.getElementById("btn-download").addEventListener("click",()=>{const l=Ns.getValue(),e=new Blob([l],{type:"text/x-python;charset=utf-8"}),t=URL.createObjectURL(e),r=document.createElement("a");r.href=t;const s=new Date().toISOString().slice(0,19).replace(/:/g,"-");r.download=`roberto_solucao_${s}.py`,document.body.appendChild(r),r.click(),document.body.removeChild(r)});
