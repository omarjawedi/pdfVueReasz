<template>
	<div class="flex flex-col border relative max-h-full" ref="pdfViewer">

		<pdf-app  
			ref="pdfApp"       
			:class="isFullscreen ? 'min-h-[calc(100vh-2.5rem)]' : ''"
			class="overflow-auto bg-white" 
			:pdf="pdfLink" 
			:config="config3"  
			:idConfig="idConfig" 
			@pages-rendered="pagesRendered"  
			@open="openHandler" >
			
		</pdf-app>


		<div class="flex flex-row w-full justify-around bg-cancel py-1">
			<div class=""></div>
			<div class="flex flex-row space-x-4 items-center">
	
				<i
					:id="idConfig.previousPage"
					class="fa fa-angle-left text-secondary text-lg cursor-pointer"
				  ></i>

				  <span><input type="number" class="inputPage" :id="idConfig.pageNumber" >  /{{ pageCount }}</span>

				  <i
				  :id="idConfig.nextPage"
				  class="fa fa-angle-right text-secondary text-lg cursor-pointer"
				></i>
				<div class="flex flex-row space-x-4 items-center">
					<i
					:id="idConfig.zoomOut"
					class="fa fa-minus text-secondary text-lg cursor-pointer"
					></i>
	
					<i
					:id="idConfig.zoomIn"
					class="fa fa-plus text-secondary text-lg cursor-pointer"
					></i>
	
					<i
					:class="isFullscreen ? 'fa fa-compress' : 'fa fa-expand'"
					class="text-secondary text-lg cursor-pointer self-end"
					@click="toggleFullscreen"
					></i>
				</div>

			</div>
		</div>		
	</div>
</template>
<script>
	


	export default {
		name:'PdfViewer',

	  data(){
		return{
			pdfUrl:"https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
			idConfig: { 
				zoomIn: "zoomInId", 
				zoomOut: "zoomOutId",
				nextPage: "nextPageId",
				previousPage: "previousPageId",
				pageNumber: "pageNumberId"
			},
			info: [] ,
			config3: {
				toolbar: false,
				sidebar:false
			},
			pageCount: 0,
			page:1,
			isFullscreen: false,
			isPdfLoaded: false,
			
			}
	
	  },
	  computed: {
		pdfLink() {
		  return "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf";
		},
		pageNumber() {
			return this.page
		},
	  },
	  methods: {
		async openHandler(pdfApp) {
		  this.info = [];
		  this.page= pdfApp.page
		  this.pageCount = pdfApp.pagesCount
		  const info = await pdfApp.pdfDocument
			.getMetadata()
			.catch(console.error.bind(console));
	
		  if (!info) return;
		  const props = Object.keys(info.info);
		  props.forEach((prop) => {
			const obj = {
			  name: prop,
			  value: info.info[prop]
			};
			this.info.push(obj);
		  });
		},

		makeFullscreen() {
		  const fullscreenContainer = this.$refs.pdfViewer;
			console.log('fullscreen', fullscreenContainer)
		  // Check if the browser supports the Fullscreen API
		  if (fullscreenContainer.requestFullscreen) {
			fullscreenContainer.requestFullscreen();
		  } else if (fullscreenContainer.mozRequestFullScreen) {
			// Firefox
			fullscreenContainer.mozRequestFullScreen();
		  } else if (fullscreenContainer.webkitRequestFullscreen) {
			// Chrome, Safari, and Opera
			fullscreenContainer.webkitRequestFullscreen();
		  } else if (fullscreenContainer.msRequestFullscreen) {
			// IE/Edge
			fullscreenContainer.msRequestFullscreen();
		  }
	
		  // Update the isFullscreen variable
		  this.isFullscreen = true;
		},
		exitFullscreen() {
		  // Check if the browser supports the Fullscreen API
		  if (document.exitFullscreen) {
			document.exitFullscreen();
		  } else if (document.mozCancelFullScreen) {
			// Firefox
			document.mozCancelFullScreen();
		  } else if (document.webkitExitFullscreen) {
			// Chrome, Safari, and Opera
			document.webkitExitFullscreen();
		  } else if (document.msExitFullscreen) {
			// IE/Edge
			document.msExitFullscreen();
		  }
	
		  // Update the isFullscreen variable
		  this.isFullscreen = false;
		},
		toggleFullscreen() {
		  if (this.isFullscreen) {
			this.exitFullscreen();
		  } else {
			this.makeFullscreen();
		  }
		},
		handleFullscreenChange() {
		  // Update the isFullscreen variable when the fullscreen state changes
		  this.isFullscreen = !!(
			document.fullscreenElement ||
			document.mozFullScreenElement ||
			document.webkitFullscreenElement ||
			document.msFullscreenElement
		  );
		  
		},
		pagesRendered(pdfApp) {
			setTimeout(() => (pdfApp.pdfViewer.currentScaleValue = "page-height"));
		}
	  },
	  mounted() {
		// Listen for the fullscreenchange event
		document.addEventListener("fullscreenchange", this.handleFullscreenChange);
		document.addEventListener(
		  "mozfullscreenchange",
		  this.handleFullscreenChange
		);
		document.addEventListener(
		  "webkitfullscreenchange",
		  this.handleFullscreenChange
		);
		document.addEventListener(
		  "msfullscreenchange",
		  this.handleFullscreenChange
		);
	  },
	  beforeDestroy() {
		// Remove the event listeners when the component is destroyed
		document.removeEventListener(
		  "fullscreenchange",
		  this.handleFullscreenChange
		);
		document.removeEventListener(
		  "mozfullscreenchange",
		  this.handleFullscreenChange
		);
		document.removeEventListener(
		  "webkitfullscreenchange",
		  this.handleFullscreenChange
		);
		document.removeEventListener(
		  "msfullscreenchange",
		  this.handleFullscreenChange
		);
		this.isPdfLoaded = true;
		
	  },
	};
	</script>
	<style >
	.inputPage{
		max-width: 50px;
	}
	.viewer-footer {
		position: absolute;
		bottom: 0px;
		right: 0;
		left: 0;
		background-color: antiquewhite;
	  }
	
	</style>