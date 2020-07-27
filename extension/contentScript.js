// Set-up on each page

const currentPageURL = window.location.href;

console.info(`altML: now running JS on ${currentPageURL}`);

const testPageURL = chrome.runtime.getURL("test.html");

if(currentPageURL.includes(testPageURL)) { // If the current page URL matches the test page, then run test page specific code
  console.warn(`altML: altML may run a little differently on this test page (${testPageURL}) than on the rest of the internet. You have been warned!`);
}

if(currentPageURL.includes("http")) { // If current page looks like it is on the web 

  console.info(`altML: Starting image scan...`);

  const images = document.images;

  for(i = 0; i < images.length; i++) { // Loop over all of the images in the website
    let currentImage = images[i];
    if(currentImage.alt == "" && currentImage.hasAttribute("src") && currentImage.src !== "") { // If the alt tag of the image is empty, the image has an src attribute, and the src attribute is not empty.
      let oldAlt = images[i].alt;
      let newAlt = "altML changed the alt attribute in this image." // TODO: Set newAlt to tensorflow result
      images[i].alt = newAlt; // Changes oldAlt to newAlt
      console.info(`altML: changed the alt tag in "${images[i].src}" from "${oldAlt}" to "${newAlt}"`);
    }
  }

}