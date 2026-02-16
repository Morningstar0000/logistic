import BlogCarousel from "../component/blogCarousel";

function Blog() {
    return (
        <div className="w-full bg-white py-12 md:py-16 lg:py-24" id="blog">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <p className="text-blue-500 font-medium mb-2 uppercase tracking-wide text-sm md:text-base">
                        OUR BLOG
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto">
                        Make A Relation With Our Blog Article And Meet With Our Blogs
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit porro, aliquid reprehenderit iusto inventore
                        sint beatae ipsum impedit in sit numquam illum distinctio sequi quisquam et hic tempore
                    </p>
                </div>
                
                {/* Carousel */}
                <div className="relative">
                    <BlogCarousel />
                </div>
            </div>
        </div>
    )
};

export default Blog;