const gallaryModel = {
	currentImage: {},
	images: [
		{
			main_url: 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			thumbnail: 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			title: 'Image 1',
		},
		{
			main_url: 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			thumbnail: 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			title: 'Image 1',
		},
		{
			main_url: 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			thumbnail: 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			title: 'Image 1',
		},
		{
			main_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkO6hm4OeWGIe5tzffyJQ-9F1HSKIMWM-FLr_rH0dkI9FLaTjCg',
			thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkO6hm4OeWGIe5tzffyJQ-9F1HSKIMWM-FLr_rH0dkI9FLaTjCg',
			title: 'Image 1',
		},
		{
			main_url: 'https://s3-us-west-1.amazonaws.com/exoticvoyages-wp/wp-content/uploads/2016/12/27082121/The-Temples-of-Bagan-Sunset-in-Myanmar.jpg',
			thumbnail: 'https://s3-us-west-1.amazonaws.com/exoticvoyages-wp/wp-content/uploads/2016/12/27082121/The-Temples-of-Bagan-Sunset-in-Myanmar.jpg',
			title: 'Image 1',
		},
		{
			main_url: 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			thumbnail: 'https://www.thahara.com/uploads/blog/2017/05/cover__thahara-1494582786_Bagan-Temple-Sunset-View-Mandalay-Myanmar.jpg',
			title: 'Image 1',
		},
		{
			main_url: 'https://bagandaytours.com/wp-content/uploads/2015/11/Irrawaddy-River-4.jpg',
			thumbnail: 'https://bagandaytours.com/wp-content/uploads/2015/11/Irrawaddy-River-4.jpg',
			title: 'Image 1',
		},
		{
			main_url: 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1442915382175/shutterstock-281729135small_main_1442915415746.jpeg',
			thumbnail: 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1442915382175/shutterstock-281729135small_main_1442915415746.jpeg',
			title: 'Image 1',
		},
		{
			main_url: 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			thumbnail: 'http://www.thislifeintrips.com/wp-content/uploads/2015/08/IMG_0587.jpg',
			title: 'Image 1',
		},
		{
			main_url: 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			thumbnail: 'https://nomadicboys.com/wp-content/uploads/2015/03/05-Buledi-pagoda-sunset7.jpg',
			title: 'Image 6',
		}
	]
}

const controller = {
	init: function () {
		imageListView.init();
		imagePopupView.init();
	},
	getAllImages: function () {
		return gallaryModel.images;
	},
	setCurrentImage: function (image) {
		gallaryModel.currentImage = image;		
	},
	getCurrentImage: function () {
		return gallaryModel.currentImage;
	}
};

const imageListView = {
	init: function () {
		this.imageHolder = document.querySelector('.gallery');
		this.render();
	},
	render: function () {
		const images = controller.getAllImages();
		for (let i in images) {
			const image = images[i];
			this.imageHolder.appendChild(this.buildImage(image));
		}
	},
	buildImage: function (image) {
		const div = document.createElement('div');
		console.log(div);
		div.classList.add('image-holder');
		div.innerHTML = `
			<img src="${image.thumbnail}"/>
		`;
		div.addEventListener('click', function () {
			controller.setCurrentImage(image);
			imagePopupView.render();
		});

		return div;
	}
}

const imagePopupView = {
	init: function () {
		this.popuparea = document.querySelector('.popuparea');
		this.closeBtn = document.querySelector('.popuparea .closeImage');
		this.viewer = document.querySelector('.viewer');
		this.popupImage = document.querySelector('.viewer img');
		this.title = document.querySelector('.viewer .title');
		this.rotateBtn = document.querySelector('.viewer .btnRotate');

		this.closeBtn.addEventListener('click', function () {
			imagePopupView.hide();
		});

		this.rotateBtn.addEventListener('click', function () {
			imagePopupView.rotate();
		});

		this.popuparea.addEventListener('click', function (e) {
			if (e.target.classList.contains('popuparea')) {
				imagePopupView.hide();
			}
		});
	},
	render: function () {
		const image = controller.getCurrentImage();
		this.popuparea.classList.add("show");
		this.popupImage.src = image.main_url;
		this.title.innerHTML = image.title;
	},
	hide: function () {
		this.popuparea.classList.remove("show");
		this.popupImage.className = '';
		this.popupImage.src = '#';
	},
	rotate: function () {
		const currentDeg = parseInt(this.popupImage.dataset.deg);		
		let newDeg = 0;
		if(currentDeg < 270){
			newDeg = currentDeg + 90;	
		}
		 
		this.popupImage.dataset.deg = newDeg;
		this.popupImage.className = '';
		this.popupImage.classList.add(`rotate-${newDeg}`);
	}
}

controller.init();