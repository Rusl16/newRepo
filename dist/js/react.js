var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            // if (window.CP.shouldStopExecution(1)) {
            //     break;
            // }
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
        // window.CP.exitedLoop(1);
    }

    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            // if (window.CP.shouldStopExecution(2)) {
            //     break;
            // }
            arr2[i] = arr[i];
        }
        // window.CP.exitedLoop(2);
        return arr2;
    } else {
        return Array.from(arr);
    }
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CitiesSlider = function (_React$Component) {
    _inherits(CitiesSlider, _React$Component);

    function CitiesSlider(props) {
        _classCallCheck(this, CitiesSlider);

        var _this = _possibleConstructorReturn(this, (CitiesSlider.__proto__ || Object.getPrototypeOf(CitiesSlider)).call(this, props));

        _this.IMAGE_PARTS = 4;

        _this.changeTO = null;
        _this.AUTOCHANGE_TIME = 10000; 

        _this.state = {activeSlide: -1, prevSlide: -1, sliderReady: false};
        return _this;
    }

    _createClass(CitiesSlider, [{
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.clearTimeout(this.changeTO);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.runAutochangeTO();
            setTimeout(function () {
                _this2.setState({activeSlide: 0, sliderReady: true});
            }, 0);
        }
    }, {
        key: 'runAutochangeTO',
        value: function runAutochangeTO() {
            var _this3 = this;

            this.changeTO = setTimeout(function () {
                _this3.changeSlides(1);
                _this3.runAutochangeTO();
            }, this.AUTOCHANGE_TIME);
        }
    }, {
        key: 'changeSlides',
        value: function changeSlides(change) {
            window.clearTimeout(this.changeTO);
            var length = this.props.slides.length;

            var prevSlide = this.state.activeSlide;
            var activeSlide = prevSlide + change;
            if (activeSlide < 0) activeSlide = length - 1;
            if (activeSlide >= length) activeSlide = 0;
            this.setState({activeSlide: activeSlide, prevSlide: prevSlide});
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var _state = this.state,
                activeSlide = _state.activeSlide,
                prevSlide = _state.prevSlide,
                sliderReady = _state.sliderReady;

            return React.createElement(
                'div',
                {className: classNames('slider', {'s--ready': sliderReady})},
                React.createElement(
                    'p',
                    {className: 'slider__top-heading'}
                ),
                React.createElement(
                    'div',
                    {className: 'slider__slides'},
                    this.props.slides.map(function (slide, index) {
                        return React.createElement(
                            'div',
                            {
                                className: classNames('slider__slide', {
                                    's--active': activeSlide === index,
                                    's--prev': prevSlide === index
                                }),
                                key: slide.addr,
                                key: slide.country,
                                key: slide.price
                            },
                            React.createElement(
                                'div',
                                {className: 'slider__slide-content'},
                                // React.createElement(
                                //     'h2',
                                //     {className: 'slider__slide-subheading h2 title-wh text-center'},
                                //     slide.addr || slide.country
                                // ),
                                React.createElement(
                                    'h2',
                                    {className: 'slider__slide-heading'},
                                    slide.addr.split('').map(function (l) {
                                        return React.createElement(
                                            'span',
                                            null,
                                            l
                                        );
                                    })
                                ),
                                React.createElement(
                                    'h4',
                                    {className: 'slider__slide-heading'},
                                    slide.country.split('').map(function (l) {
                                        return React.createElement(
                                            'span',
                                            null,
                                            l
                                        );
                                    })
                                ),
                                React.createElement(
                                    'div',
                                    {className: 'slider__slide-heading'},
                                    slide.price.split('').map(function (l) {
                                        return React.createElement(
                                            'span',
                                            null,
                                            l
                                        );
                                    })
                                ),
                                React.createElement(
                                    'a',
                                    {className: 'slider__slide-readmore btn-type btn-load-more',href:slide.link},
                                    React.createElement(
                                        'i',
                                        {className:'icon-plus'}
                                    ),
                                    'Подробнее'
                                )
                            ),
                            React.createElement(
                                'div',
                                {className: 'slider__slide-parts'},
                                [].concat(_toConsumableArray(Array(_this4.IMAGE_PARTS).fill())).map(function (x, i) {
                                    return React.createElement(
                                        'div',
                                        {className: 'slider__slide-part', key: i},
                                        React.createElement('div', {
                                            className: 'slider__slide-part-inner',
                                            style: {backgroundImage: 'url(' + slide.img + ')'}
                                        })
                                    );
                                })
                            )
                        );
                    })
                ),
                React.createElement('div', {
                    className: 'slide-prev icon-arrow_left slick-arrow', onClick: function onClick() {
                        return _this4.changeSlides(-1);
                    }
                }),
                React.createElement('div', {
                    className: 'slide-next icon-arrow_right slick-arrow', onClick: function onClick() {
                        return _this4.changeSlides(1);
                    }
                })
            );
        }
    }]);

    return CitiesSlider;
}(React.Component);

var slides = [{
    addr: 'ЖК Кандинский',
    price: 'от 999$',
    country: 'Французкий бульвар 29',
    link:'https://google.com',
    img: 'dist/img/banner-img.jpg'
}, {
    addr: 'ЖК 25-я жемчужина',
    price: 'от 1200$',
    country: 'Французкий бульвар 29',
    link:'https://google.com',
    img: 'dist/img/lands-img.jpg'
}, {
    addr: 'ЖК Папуса',
    price: 'от 1500$',
    country: 'Французкий  бульвар 29',
    link:'https://google.com',
    img: 'dist/img/banner-img.jpg'
}, {
    addr: 'ЖК Кандинский',
    price: 'от 10000$',
    country: 'Французкий бульвар 29',
    link:'https://google.com',
    img: 'dist/img/banner-img.jpg'
}];

ReactDOM.render(React.createElement(CitiesSlider, {slides: slides}), document.querySelector('#app'));