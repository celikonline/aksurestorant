import {readFile,readdir,stat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
for(const name of ['posts.js','experience.js']){
 const result=spawnSync(process.execPath,['--check',resolve(root,'dist',name)],{stdio:'inherit'});
 if(result.status!==0)process.exit(1);
}
const assets=(await readdir(resolve(root,'dist/assets'))).filter(x=>/\.(jpg|png)$/.test(x));
for(const name of ['aksu-film.mp4','grill-fire.mp4','steak-fire.mp4','hero-poster.jpg','steak-poster.jpg','aksu-menu.png','logo.jpg',...Array.from({length:12},(_,i)=>`post-${i}.jpg`)]){
 const info=await stat(resolve(root,'dist/assets',name));if(!info.size)throw new Error(`Empty asset: ${name}`);
}
for(const page of ['index.html','menu.html']){
 const html=await readFile(resolve(root,'dist',page),'utf8');
 for(const match of html.matchAll(/(?:src|href)="([^"?#]+)(?:\?[^"#]*)?"/g)){
  const ref=match[1];if(/^(https?:|#)/.test(ref)||ref.includes('fonts.'))continue;
  await stat(resolve(root,'dist',ref));
 }
}
for(const config of ['vercel.json','../vercel.json']){
 let source;try{source=await readFile(resolve(root,config),'utf8');}catch(error){if(config.startsWith('../')&&error.code==='ENOENT')continue;throw error;}
 const json=JSON.parse(source);await stat(resolve(root,config==='vercel.json'?'.':'..',json.outputDirectory));if(json.framework!==null)throw new Error('Expected static Vercel preset');
}
console.log(`Verified scripts, HTML references, ${assets.length} images and 3 local videos.`);
