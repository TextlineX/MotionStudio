precision highp float;
uniform float uTime; uniform float uGlow; uniform vec3 uColor; varying vec2 vUv;
float wave(vec2 p){ return sin(p.x*2.1+sin(p.y*2.0)+uTime*.35)+.6*sin(p.y*4. + uTime*.22)+.3*sin((p.x+p.y)*5.-uTime*.2); }
void main(){ vec2 uv=vUv-.5; uv.x*=1.7; float a=atan(uv.y,uv.x); float r=length(uv); float line=abs(sin(r*16.-uTime*.25+sin(a*3.)*2.)); float arc=smoothstep(.11,0.,abs(r-.48-.15*sin(a*2.+uTime*.12))); float mist=smoothstep(.55,.05,abs(wave(uv*1.5)-.35))*smoothstep(.82,.17,r); float threads=smoothstep(.055,0.,line-.025)*mist; float strength=(arc*.52+threads*.24)*uGlow; vec3 c=uColor*strength; c+=uColor*mist*.025; gl_FragColor=vec4(c, max(strength, mist*.045)); }
