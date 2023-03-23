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

function getProductHtml(product) {
    return `<li class="ast-article-single desktop-align-left tablet-align-left mobile-align-left product type-product post-316 status-publish first instock product_cat-paste-masks has-post-thumbnail shipping-taxable purchasable product-type-simple">
    <div class="astra-shop-thumbnail-wrap">
        <a href="${product.detail_page}" class="woocommerce-LoopProduct-link woocommerce-loop-product__link" target="_blank">
            <img width="300" height="300" src="${product.image_url}"
                class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail" alt="" decoding="async">
        </a>
    </div>
    <div class="astra-shop-summary-wrap"> 
        <a href="${product.detail_page}" class="ast-loop-product__link" target="_blank">
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
    var $productListWrapperHtml = jQuery('<div class="woocommerce columns-5"></div>')
    var $productListHtml = jQuery('<ul class="products columns-5"></ul>')
    for(var i=0; i<products.length; i++){
        $productListHtml.append(getProductHtml(products[i]));
    }
    return $productListWrapperHtml.append($productListHtml);
}

function getCategoryHtml(category){
    return `<div class="uagb-ifb-content"><div class="uagb-ifb-title-wrap"><h2 class="uagb-ifb-title">${category.description}</h2></div></div>`
}

function getLoaderHtml(){
    return '<div class="loader-wrapper d-block"><span class="loader"></span></div>'
}

function hide($el){
    return $el.removeClass("d-block").addClass("d-none");
}
function show($el){
    return $el.removeClass("d-none").addClass("d-block");
}

function showMainLoader(){
    return show($loaderWrapper);
}
function hideMainLoader(){
    return hide($loaderWrapper);
}

function hidePromptField(){
    return hide($promptWrapper);
}

function showPromptField(){
    return show($promptWrapper);
}

function showProductsSection(){
    return show($productsSection);
}

function hideProductsSection(){
    return hide($productsSection);
}

function clearProductsSection(){
    $productsSection.empty();
}

function clearPromptField(){
    $promptField.val("");
}

function getPromptFieldValue(){
    return $promptField.val();
}

function showErrorPrompt(errorName){
    return show($promptError).html(errorName);
}

function hideErrorPrompt(){
    return hide($promptError).html("");
}

function showBtnGenerateIdeas(){
    return show($generateBtn)
}

function hideBtnGenerateIdeas(){
    return hide($generateBtn)
}

function getRemoteCategories(data){
    // return jQuery.post(apiBasePath+promptPath, data, "json");
    return jQuery.ajax({
        type: "POST",
        url: apiBasePath+promptPath,
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType: "json"
    }).retry({times:3});
}

function getRemoteProducts(data){
    // return jQuery.post(apiBasePath+promptPath, data, "json");
    return jQuery.ajax({
        type: "POST",
        url: apiBasePath+productsPath,
        data: JSON.stringify(data),
        contentType:"application/json; charset=utf-8",
        dataType: "json"
    }).retry({times:3});
}


function renderCategoryAndProducts(category){
    var $container = jQuery("<div></div>").appendTo($productsSection);
    $container.append(getCategoryHtml(category));
    var $loader = jQuery(getLoaderHtml()).appendTo($container);
    getRemoteProducts({category: category.description})
    .done(function(data){
        console.log('Success: ', data );
         var $products = getListProductsHtml(data);
        $container.append($products);
    })
    .fail(function(){
        $container.remove();
    })
    .always(function(){
        $loader.remove();
    })
}

var loading = false;
$generateBtn.on("click", function(e){
    if(loading)return;
    loading = true;
    hideBtnGenerateIdeas();
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
    // hidePromptField();
    getRemoteCategories({statement: prompt})
        .done(function(data){
            console.log('Success: ', data );
            showProductsSection();
            var categories = data;
            categories.map(category => renderCategoryAndProducts(category));
        })
        .fail(function(){
            showErrorPrompt(ERROR_GENERIC);
            // showPromptField();
        })
        .always(function(){
            hideMainLoader();
            showBtnGenerateIdeas();
            loading=false;
        })

    e.preventDefault();
})
