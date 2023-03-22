function getProductHtml(product) {
    return `<li class="ast-article-single desktop-align-left tablet-align-left mobile-align-left product type-product post-316 status-publish first instock product_cat-paste-masks has-post-thumbnail shipping-taxable purchasable product-type-simple">
    <div class="astra-shop-thumbnail-wrap">
        <a href="${product.detail_page}" class="woocommerce-LoopProduct-link woocommerce-loop-product__link">
            <img width="300" height="300" src="${product.image_url}"
                class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" decoding="async">
        </a>
    </div>
    <div class="astra-shop-summary-wrap"> 
        <a href="${product.detail_page}" class="ast-loop-product__link">
            <h2 class="woocommerce-loop-product__title">${product.name}</h2>
        </a>
        <span class="price">
            <span class="woocommerce-Price-amount amount">
                <bdi>${product.display_amount}</bdi>
            </span>
        </span>
    </div>
</li>`
}

function getListProductsHtml(products){
    var $productListWrapperHtml = jQuery('<div class="woocommerce columns-4"></div>')
    var $productListHtml = jQuery('<ul class="products columns-4"></ul>')
    for(var i=0; i<products.length; i++){
        $productListHtml.append(getProductHtml(products[i]));
    }
    return $productListWrapperHtml.append($productListHtml);
}

function getCategoryHtml(category){
    return `<div class="uagb-ifb-content"><div class="uagb-ifb-title-wrap"><h2 class="uagb-ifb-title">${category.description}</h2></div></div>`
}

const LIMIT_CHARACTERS = 40;

const ERROR_AT_LEAST_CHARACTERS = "To proceed, please ensure that your text contains at least 40 characters.";
const ERROR_GENERIC = "Error, please try again." 

var apiBasePath = "https://api.giftmind.site"
var promptPath = "/prompt"
var productsPath = "/products"

var $productsSection = jQuery("#products-section");
var $generateBtn = jQuery("#generate-ideas");
var $loaderWrapper = jQuery(".loader-wrapper");
var $promptWrapper = jQuery(".prompt-wrapper");
var $promptField = jQuery("#prompt");
var $promptError = jQuery("#prompt-error");
var products = [
    {
    'name': "example name",
    'asin': "example asin",
    'detail_page': "http://159.89.190.30/product/rose-essential-oil/",
    'image_url': "http://159.89.190.30/wp-content/uploads/2021/03/rose-essential-oil-300x300.jpg",
    'display_amount': "50.00"
},
    {
    'name': "example name",
    'asin': "example asin",
    'detail_page': "http://159.89.190.30/product/rose-essential-oil/",
    'image_url': "http://159.89.190.30/wp-content/uploads/2021/03/rose-essential-oil-300x300.jpg",
    'display_amount': "50.00"
},
    {
    'name': "example name",
    'asin': "example asin",
    'detail_page': "http://159.89.190.30/product/rose-essential-oil/",
    'image_url': "http://159.89.190.30/wp-content/uploads/2021/03/rose-essential-oil-300x300.jpg",
    'display_amount': "50.00"
},
    {
    'name': "example name",
    'asin': "example asin",
    'detail_page': "http://159.89.190.30/product/rose-essential-oil/",
    'image_url': "http://159.89.190.30/wp-content/uploads/2021/03/rose-essential-oil-300x300.jpg",
    'display_amount': "50.00"
},
    {
    'name': "example name",
    'asin': "example asin",
    'detail_page': "http://159.89.190.30/product/rose-essential-oil/",
    'image_url': "http://159.89.190.30/wp-content/uploads/2021/03/rose-essential-oil-300x300.jpg",
    'display_amount': "50.00"
},
    {
    'name': "example name",
    'asin': "example asin",
    'detail_page': "http://159.89.190.30/product/rose-essential-oil/",
    'image_url': "http://159.89.190.30/wp-content/uploads/2021/03/rose-essential-oil-300x300.jpg",
    'display_amount': "50.00"
},
    {
    'name': "example name",
    'asin': "example asin",
    'detail_page': "http://159.89.190.30/product/rose-essential-oil/",
    'image_url': "http://159.89.190.30/wp-content/uploads/2021/03/rose-essential-oil-300x300.jpg",
    'display_amount': "50.00"
}
]
var category = {
    'description': "Example of Category"
}

function showMainLoader(){
    $loaderWrapper.removeClass("d-none").addClass("d-block");
}
function hideMainLoader(){
    $loaderWrapper.removeClass("d-block").addClass("d-none");
}

function hidePromptField(){
    $promptWrapper.removeClass("d-block").addClass("d-none");
}

function showPromptField(){
    $promptWrapper.removeClass("d-none").addClass("d-block");
}

function showProductsSection(){
    $productsSection.removeClass("d-none").addClass("d-block");
}

function hideProductsSection(){
    $productsSection.removeClass("d-block").addClass("d-none");
}

function clearProductsSection(){
    $productsSection.html("");
}

function clearPromptfield(){
    $promptField.val("");
}

function getPromptFieldValue(){
    return $promptField.val();
}

function showErrorPrompt(errorName){
    $promptError.removeClass("d-none").addClass("d-block").html(errorName);
}

function hideErrorPrompt(){
    $promptError.removeClass("d-block").addClass("d-none").html("");
}

function getRemoteCategories(data){
    // return jQuery.post(apiBasePath+promptPath, data, "json");
    return jQuery.ajax({
        type: "POST",
        url: apiBasePath+promptPath,
        data: data,
        contentType:"application/json; charset=utf-8",
        dataType: "json"
    });
}

$generateBtn.on("click", function(e){
    hideErrorPrompt();
    var prompt = getPromptFieldValue();
    if(prompt.length < LIMIT_CHARACTERS){
        showErrorPrompt(ERROR_AT_LEAST_CHARACTERS);
        e.preventDefault();
        return;
    }
    showMainLoader();
    clearProductsSection();
    hideProductsSection();

    getRemoteCategories({statement: prompt})
        .done(function(data){
            console.log('Success: ', { data } );
        })
        .fail(function(){
            showErrorPrompt(ERROR_GENERIC);
            hideMainLoader();
            showPromptField();
        })

    e.preventDefault();
})





// if ($productsSection.size() > 0) {
//     $productsSection.append(getCategoryHtml(category));
//     $productsSection.append(getListProductsHtml(products));
//     $productsSection.append(getCategoryHtml(category));
//     $productsSection.append(getListProductsHtml(products));
// }