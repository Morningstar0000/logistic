import BlogCarousel from "../component/blogCarousel";

function Blog() {
    return (
        <>
            <div className="align-element py-18">
                <div className="text-center mb-12">
                    <p className="text-blue-500 font-medium mb-2">OUR BLOG</p>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 max-w-3xl mx-auto py-6">
                        Make A Relation With Our Blog Article And Meet With Our Blogs
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit porro, aliquid reprehenderit iusto inventore
                        sint beatae ipsum impedit in sit numquam illum distinctio sequi quisquam et hic tempore
                    </p>
                </div>
                {/* Carousel  */}
                <div>
                <BlogCarousel />
                </div>
                
            </div>
        </>
    )
};

export default Blog;

