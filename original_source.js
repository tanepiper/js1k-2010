window.onload = function() {
    
    var width=200,
        height=200,
        buffer1=[],
        buffer2=[],
        cvs,
        ctx,
        initData,
        renderData;
        
    function init() {
        cvs=document.body.children[0];
        cvs.setAttribute('width',width);
        cvs.setAttribute('height',height);
        cvs.onclick = gradient;
        ctx=cvs.getContext('2d');
        gradient();
        for( var i = (initData.length / 4); i >0 ; i--) {
            buffer1[i]=0;
            buffer2[i]=0;
        }
        setupRender();
    }
    
    function gradient() {
        var gradient;
        ctx.clearRect(0,0,width,height);
        gradient = ctx.createRadialGradient(0,0,0,0,0,width);
        var c1=[mathRand(99), mathRand(99),mathRand(99)];
        gradient.addColorStop(0, 'rgb(' + c1.join(',') + ')');
        var c2=[mathRand(50+205), mathRand(50+205),mathRand(50+205)];
        gradient.addColorStop(1, 'rgb(' + c2.join(',') + ')');
        ctx.fillStyle = gradient;
        ctx.fillRect(0,0,width,height);
        initData = ctx.getImageData(0,0,width,height).data;
        renderData = ctx.getImageData(0,0,width,height);
    }
    
    function processWater(source, dest) {
        for (var i=dest.length-width; i>width; i--) {
	        var xi = i % width;
	        if ((xi==0) || (xi==width-1)) continue; 
		    dest[i] = (
		        ((source[i-1]+
		        source[i+1]+
		        source[i-width]+
		        source[i+width])  >>1) ) - dest[i];
		    dest[i] -= (dest[i] >> 5);
	    }
    }
    
    function texture(buffer) {
        var xoffset, yoffset;
        
        for (var i=buffer.length-width; i>width; i--) {
	        // check for bounds
	        var xi = i % width;
	        if ((xi==0) || (xi==width-1)) continue; 
		    xoffset = buffer[i-1] - buffer[i+1];
            yoffset = buffer[i-width] - buffer [i+width];
            var offset = i+xoffset+yoffset*width;
            if (offset>0 && offset<buffer.length) {
                for (var x=4;x>0;x--) { //4 for alpha
		            renderData.data[i*4+x] = initData[offset*4+x];
	            }
            }
        }
        try {
            ctx.putImageData(renderData, 0, 0);
        } catch(e) {
            // This is to catch the occasional error thrown up in Firefox
        }
    }
    
    function setupRender() {
        setInterval(function() {
            processWater(buffer2, buffer1);
            var tmp = buffer1;
            buffer1 = buffer2;
            buffer2 = tmp;
            texture(buffer1);
        }, 10);
        setInterval(function() {
            buffer1[(mathRand(height) * width + mathRand(width))] += mathRand(-500);    
        },300);
    }
    
    function mathRand(modifier) {
        return Math.round(Math.random() * modifier);
    }
    
    init();
}