OceanBIOS=function(){var a=document.createElement("div");a.style.background="#2e2e2e",a.style.position="absolute",a.style.top=a.style.left=a.style.right=a.style.bottom="0",a.style.margin="auto",a.style.zIndex="99999",a.style.width="600px",a.style.height="400px",a.style.borderRadius="5px";var b=document.createElement("p");b.style.marginTop="15px",b.style.font="35px monospace",b.style.color="#59a7ff",b.style.textAlign="center",b.style.marginBottom="0",b.textContent="OceanBIOS",a.appendChild(b);var c=document.createElement("p");c.style.marginTop="0",c.style.font="20px monospace",c.style.color="#59a7ff",c.style.textAlign="center",c.textContent="0.1",a.appendChild(c);var d=document.createElement("p");d.style.font="20px monospace",d.style.color="#59a7ff",d.style.display="inline",d.style.marginLeft="20px",d.textContent="DCP Server: ",a.appendChild(d);var e=document.createElement("input");e.setAttribute("type","text"),e.setAttribute("value","https://dcpaccesspoint.ga"),a.appendChild(e);var f=document.createElement("button");f.textContent="Save",a.appendChild(f),a.appendChild(document.createElement("br"));var g=document.createElement("button");g.setAttribute("style","margin-left: 20px;margin-top: 35px; margin-bottom: 15px;"),g.textContent="ZIP Liveboot",a.appendChild(g);var h=document.createElement("button");h.textContent="Restore BIOS",a.appendChild(h),a.appendChild(document.createElement("br"));var i=document.createElement("button");i.style.marginLeft="20px",i.style.color="red",i.textContent="Restore FS",a.appendChild(i);var j=document.createElement("button");j.style.color="red",j.textContent="Flash new BIOS",a.appendChild(j);var k=document.createElement("input");k.setAttribute("type","file"),g.onclick=function(){k.onchange=b=>{var c=b.target.files[0],d=new FileReader;d.readAsDataURL(c),d.onload=b=>{var c=b.target.result;c=c.slice(c.indexOf(",")+1),KERNEL_SUN.postMessage(KERNEL_SUN.escapeMessage(`function(){window._ZIPLIVEBOOT="${c}";}`)),KERNEL_SUN.__fsInit=function(){BrowserFS.install(window),BrowserFS.configure({fs:"ZipFS",options:{zipData:BrowserFS.BFSRequire("buffer").Buffer.from(window._ZIPLIVEBOOT,"base64")}},function(a){return a?(sendMessageToSun(a),void console.error(a)):void(window._ZIPLIVEBOOT=void 0,delete window._ZIPLIVEBOOT,sendMessageToSun("success"))})},document.body.removeChild(a),KERNEL_SUN.setupFS().then(()=>KERNEL_SUN.bootIntoROM())}},k.click()},i.onclick=function(){k.onchange=b=>{var c=b.target.files[0],d=new FileReader;d.readAsDataURL(c),d.onload=async b=>{var c=b.target.result;KERNEL_SUN.postMessage(KERNEL_SUN.escapeMessage(`function(){window._ZIPRESTORE="${c}";}`));KERNEL_SUN.postMessage(KERNEL_SUN.escapeMessage(function(){window.indexedDB.deleteDatabase("sun");var a=console.log;a&&a("starting restore"),BrowserFS.install(window),BrowserFS.configure({fs:"IndexedDB",options:{storeName:"sun"}},async function(b){if(b)return sendMessageToSun(b),void console.error(b);var c=require("fs"),d=new zip.ZipReader(new zip.Data64URIReader(window._ZIPRESTORE)),e=await d.getEntries();for(let d of e){if(d.filename.startsWith("/")||(d.filename="/"+d.filename),d.directory){await c.mkdir(d.filename),a&&a(d.filename);continue}let b=await d.getData(new zip.Uint8ArrayWriter);b=b.slice(b.indexOf(",")+1),await c.writeFile(d.filename,BrowserFS.BFSRequire("buffer").Buffer.from(b)),b=null,a&&a("created "+d.filename)}d.close(),alert("Please reload the page to use the new FileSystem")})}.toString())),document.body.removeChild(a)}},k.click()},h.onclick=function(){KERNEL_SUN.postMessage(KERNEL_SUN.escapeMessage(`function(){localStorage.removeItem("_BIOS");}`)),alert("BIOS has been restored."),document.body.removeChild(a)},j.onclick=function(){KERNEL_SUN.postMessage(KERNEL_SUN.escapeMessage(`function(){var data=prompt("WARNING: Press cancel if you don't know what you're doing!\\nNew bios data:"); if(!data || data === "") return; localStorage.setItem("_BIOS",data);alert("BIOS has been flashed.");}`))},document.body.appendChild(a)};var BIOS_FLASH_DEBUG=!1;!1,"_BIOS"in localStorage||localStorage.setItem("_BIOS",OceanBIOS.toString());