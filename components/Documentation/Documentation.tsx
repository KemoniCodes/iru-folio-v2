import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { DocumentationProps } from "./DocumentationProps";
import Link from "next/link";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function Sidebar({ title, header, onClick }: DocumentationProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(title);
    }
  };
  return (
    <>
      <div
        className={`sidebar-title mb-[2rem] text-right ${header ? "first:border-b-solid first:border-b-[1px] first:border-b-dark-cocoa first:pb-[1.5rem]  not-first:border-t-solid not-first:border-t-[1px] not-first:border-t-dark-cocoa not-first:pt-[2.5rem]" : ""
          }`}
        onClick={handleClick}
      >
        <h3 className={`leading-8 hover:border-b-solid hover:italic hover:cursor-pointer ${header ? "border-b-solid border-b-[1px] border-b-dark-cocoa leading-[2rem] w-fit ml-auto" : ""} heading text-3xl`}>{title}</h3>
      </div>
    </>
  );
}


function Main({ title, description, description2, description3, images, note }: DocumentationProps) {
  return (
    <>
      <div id={title} className="documentation-detail-section mb-16 lg:scroll-m-8 scroll-m-20">
        <h2 className="lg:text-[50px] text-[38px] lg:mb-0 -mb-8 lg:leading-[0] leading-tight">{title}</h2>

        <p className="mt-12 whitespace-pre-line normal-case">{description}</p>


        {images?.map((image, index) => (
          image.includes('/google-step1.png') ||
            image.includes('/google-step2.png') ||
            image.includes('/google-step3.png') ||
            image.includes('/google-step4.png') ||
            image.includes('/customFont1.png') ||
            image.includes('/customFont2.png') ||
            image.includes('/customFont3.png') ?
            '' :
            <Image
              key={index}
              src={image}
              width={300}
              height={300}
              alt={title}
              className="mt-4"
            />
        ))}

        <p className="mt-12 whitespace-pre-line normal-case italic font-normal">
          {note ? (
            <>
              For more information, refer to{' '}
              <Link className="underline" href={note.toString()} target="_blank">
                {title}
              </Link>.
            </>
          ) : (
            ''
          )}
        </p>

        {title === 'how to add custom fonts' ? (
          ''
        ) : (
          description2 ? (
            <p className="mt-12 whitespace-pre-line normal-case">
              <>
                {description2}
              </>
            </p>
          ) : (
            ''
          )
        )}

        {title === 'how to add custom fonts' ?
          <>
            {images?.map((image, index) => (
              image.includes('/google-step1.png') ||
                image.includes('/google-step2.png') ||
                image.includes('/google-step3.png') ||
                image.includes('/google-step4.png') ?
                <Image
                  key={index}
                  src={image}
                  width={700}
                  height={300}
                  alt={title}
                  className="mt-4"
                />
                : ''
            ))}

            <p className="my-12 whitespace-pre-line normal-case">
              <>
                {description2}
              </>
            </p>


            {images?.map((image, index) => (
              image.includes('/customFont1.png') ||
                image.includes('/customFont2.png') ||
                image.includes('/customFont3.png') ?
                <Image
                  key={index}
                  src={image}
                  width={700}
                  height={300}
                  alt={title}
                  className="mt-4"
                />
                : ''
            ))}

            <p className="mt-12 whitespace-pre-line normal-case">
              <>
                {description3}
              </>
            </p>
          </>

          : ''}
      </div>
    </>
  );
}


const documentationData: DocumentationProps[] = [
  {
    title: "introduction",
    description: `Introducing Modern Atelier, a stunning Shopify theme that combines the power of minimalism with exceptional design to elevate your online store. 
    
    At Iru Studios, we understand the importance of providing your customers with a seamless and enjoyable web experience, and that's exactly what this theme delivers. With expertly crafted micro animations that take your customers on a delightful journey as they browse your site, they will always enjoy and value the experience you offer.

    Crafted with modern CEOs in mind, Modern Atelier is the perfect choice for brands that value aesthetics and functionality. Our theme embodies the essence of a Modern Atelier, making it the ideal option for businesses seeking to create an unforgettable impression. Start showcasing your brand today with Modern Atelier, and see the difference it can make for your online store!
    
    In this guide, we walk you through how to get the most out of this theme and all of Shopify 2.0's features. This allows you to easily personalize your new store to match your brand's essence! Perfect for DIY lovers, this documentation provides everything you need; if not, we've got your back and are always available to help.`,
    header: true
  },
  {
    title: "settings overview",
    description: `The theme settings are used to make changes to overall general settings that are applied throughout the theme. For example, colors, typography, borders, buttons, etc.`,
    images: ["/general-settings.png"],
    header: true,
    note: "https://help.shopify.com/en/manual/online-store/themes/theme-structure/theme-settings"
  },
  {
    title: "general",
    description: `This setting includes the favicon settings.`,
    images: [
      '/favicon-settings.png'
    ],
    description2: 'Simply upload the image appointed to be your favicon icon.'
  },
  {
    title: "colors",
    description: "This setting includes the main colors used throughout the theme.",
    images: [
      '/colors.png'
    ],
    description2: `Background Color: modifies the background color of entire theme
    
    Banner Background Color: modifies the background color of the announcment banner bar

    Primary Text Color: modifies the text color of the main text throughout the theme

    Secondary Text Color: modifies the text color of text on secondary background colors

    Link Hover Color: modifies the color of links on hover
    `
  },
  {
    title: "cart",
    description: "This setting includes cart message texts, button texts/links and styles. Also included are settings for the slider cart.",
    images: [
      '/cart-settings.png'
    ],
    description2: `Empty Cart Text: when the cart is empty display this text
    
    Continue Shopping Button Text: continue shopping button text

    Continue Shopping Button Link: continue shopping button link

    Secondary Button Style/Checkout Button Style Checkbox: modifies the button style to secondary button styling when checked, unchecked primary button style
    
    Update Cart Button Text: update cart button text

    Checkout Button Text: checkout button text


    Slider Cart Settings

    Dropright Cart View Button Text: view button text

    Dropright Cart Checkout Button Text: checkout button text`
  },
  {
    title: "buttons",
    description: "This setting includes primary, secondary, and the home hero button styles. The styles being, background, text, and border colors, border radius and border thickness.",
    images: [
      '/buttons1.png',
      '/buttons2.png',
      '/buttons3.png'
    ],
    description2: `There are 3 different subsections: Primary Button Styles, Secondary Button Styles, and Home Hero Button
    

    Primary Button Styles

    Primary Button Background Color: primary button background color

    Primary Button Text Color: primary button text color

    Primary Button Border Radius: primary button border radius(roundness)

    Secondary Button Styles

    Secondary Button Background Color: secondary button background color

    Secondary Button Border Color: secondary button border color

    Secondary Button Hover Background Color: secondary button hover background color

    Secondary Button Hover Text Color: secondary button hover text color

    Secondary Button Border Radius: secondary button border radius(roundness)

    Secondary Button Border Thickness: secondary button border thickness

    Secondary Button Text Color: secondary button text color
    
    Home Hero Button

    Home Hero Button Font Name: home hero button custom font name *leave empty if using a Shopify font

    Home Hero Button Font: home hero button Shopify font selector *when you're not using a custom font use this.

    Home Hero Button Font Size: home hero button font size

    Home Hero Button Font Weight: home hero button font weight

    Background Color: home hero button background color

    Text Color: home hero button text color

    Hero Button Text: home hero button text

    Hero Button Link: home hero button link`
  },
  {
    title: "borders",
    description: "This setting includes border styles for section border(Featured Collection Section), and image borders.",
    images: [
      '/borders.png'
    ],
    description2: `There are two different subsections, Section Border Settings and Image Border Settings
    
    
    Section Border Settings - for general borders like inputs and section borders, etc

    Section Border Color: section border color

    Section Border Thickness: section border thickness

    Image Border Settings - for images with borders

    Image Border Color: image border color

    Image Border Thickness: image border thickness

    Image Border Radius: image border radius(roundness)`
  },
  {
    title: "typography",
    description: `This setting includes font size, weight, and name for nav links, headers and body text.`,
    images: [
      '/typography2.png',
      '/typography1.png',
      '/typography4.png',
      '/typography3.png',
    ],
    description2: `Banner Text - the announcment banner located at the top of the page
    
    Main Nav - the main nav links('home','menu','search', etc.) 
    
    Dropdown Submenu Header - the menu that opens on click of 'menu' in the main nav, specifically the headers of this submenu('shop', 'collections', 'blog', etc.)

    Headings - H1 to H5

    Body - Paragraph

    Font Name: custom font name *leave empty if using a Shopify font

    Font: Shopify font selector *when you're not using a custom font use this.

    Font Size: font size

    Font Weight: font weight`
  },
  {
    title: "home page hero",
    description: "This setting includes images, image caption text, hero text, and mobile hero subtext.",
    images: [
      '/homepagehero1.png',
      '/homepagehero2.png'
    ],
    description2: `Images - the two images in the hero
    
    Image Texts - the two images caption text

    Hero Text - The main text in the hero

    Hero Subtext - The small text at the bottom of the hero for mobile.`
  },
  {
    title: "product",
    description: "This setting includes product badge settings for product cards throughout the theme",
    images: [
      '/product-settings.png'
    ],
    description2: `Show Product Badge: check this button if you want to enable product badge
    
    Background Color: product badge background color

    Text Color: product badge text color`
  },
  {
    title: "account page",
    description: "This setting includes text settings for the account page.",
    images: [
      '/account-settings.png'
    ],
    description2: `No orders: the text to display when no orders are present`
  },
  {
    title: "404 page",
    description: "This setting includes main 404 text and messaging",
    images: [
      '/404-settings.png'
    ],
    description2: `404 Text: main 404 text
    
    404 Message: main 404 messaging
    `
  },
  {
    title: "checkout",
    description: "This setting includes general modifications for the checkout page.",
    images: [
      '/checkout-settings.png'
    ],
    note: "https://help.shopify.com/en/manual/checkout-settings/checkout-style"
  },
  {
    title: "custom css",
    description: "This setting allows you to add custom css that applies throughout the theme.",
    images: [
      '/css-settings.png'
    ],
    note: "https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/add-css"
  },


  {
    title: "sections overview",
    description: `Sections were introduced with Shopify 2.0's version of the theme editor. They've allowed merchants to be able to completely customize a page via sections and blocks.
    
    You can add,reorder, and remove dynamic sections on all of your pages. This has been a game changer for upping the quality of Shopify store-building.`,
    note: "https://help.shopify.com/en/manual/online-store/themes/theme-structure/sections-and-blocks",
    images: [
      '/section-settings.png'
    ],
    header: true
  },
  {
    title: "main menu",
    description: "This setting includes menu link list picker, logo image picker, and banner settings.",
    images: [
      '/header-settings.png'
    ],
    description2: `Menu: choose the link list you've created in Navigation
    
    Logo: image picker for your logo

    Show banner: checkbox that enables the banner to be shown

    Banner Text: banner text

    Banner background color: banner background color

    Banner Text color: banner text color`,
    note: "https://help.shopify.com/en/manual/online-store/menus-and-links"
  },
  {
    title: "footer menu",
    description: "This setting includes footer texts, colors, borders and menu link list picker.",
    images: [
      '/footerMenu-settings.png'
    ],
    description2: `Footer Qoute: text for the qoute in the footer *add '<span></span>' around the text you want italicized
    
    Title: main footer texr

    Background Color: footer background color

    Text Color: footer text color

    Footer Border Color: footer border color

    Footer Border Thickness: footer border thickness

    Footer Border Radius: footer border radius(roundness)

    Menu: choose the link list you've created in Navigation`,
    note: "https://help.shopify.com/en/manual/online-store/menus-and-links"
  },
  {
    title: "rich text",
    description: "This setting includes colors, text alignment, width and padding modifications.",
    images: [
      '/richText-settings.png'
    ],
    description2: `Rich text - a section that displays a block of texts including subheading, heading, paragraph, buttons with link, and background color.
    
    Background Color: rich text background color

    Text Color: rich text text color

    Content alignment: rich text text alignment

    Section Padding: top and bottom padding`
  },
  {
    title: "image with text",
    description: "This setting includes colors, text alignment, image width and height, content layout and padding modifications.",
    images: [
      '/imageWText1.png',
      '/imageWText2.png'
    ],
    description2: `Image With Text - a section that displays a block of texts including subheading, heading, paragraph, buttons with link, and background color and an image.

    Background Color: image with text background color

    Text Color: image with text text color

    Content alignment: image with text text alignment

    Section Padding: top and bottom padding

    Image: width and height`
  },
  {
    title: "image banner",
    description: "This setting includes images, text alignment, content positioning, image height, and content layout.",
    images: [
      '/imageBanner-settings.png',
      '/imageBanner2-settings.png'
    ],
    description2: `Image Banner - a section that displays a block of texts including heading, paragraph, buttons with link overlaying an image.
    
    Images: image picker *option for one or two images

    Image overlay opacity: the opacity of the image overlay

    Banner height: the height of the section

    Content position: the text block position on image

    Content alignment: the text block alignment`
  },
  {
    title: "collapsible content",
    description: "This setting includes accordion tabs, content, an image, and padding modifications.",
    images: [
      '/tabs-settings.png',
      '/tabsBlock-settings.png'
    ],
    description2: `Collapsible Content - a section that displays accordion tabs that can be accompanied with an image.
    
    Caption: subheading

    Heading: section title

    Heading alignment: heading alignment

    Layout: choosing container

    Image: image picker

    Section padding: top and bottom padding


    Collapsible Content Block - each row of collapsible content including heading, icon and row content.

    Heading: row title

    Icon: icon picker

    Row content: content for collapsible row`
  },
  {
    title: "videos",
    description: "This setting includes two different blocks for a Shopify hosted video and an external video.",
    images: [
      '/video-settings.png',
      '/videoBlock1-settings.png',
      '/videoBlock2-settings.png'
    ],
    description2: `Videos Section Settings
    
    Custom content heading: section heading

    Heading Alignment: heading text alignment

    Full Width Video: check this to enable full width video


    Shopify Hosted Video Block Settings

    A Shopify-hosted video: a video that's uploaded via Shopify

    Enable Video Looping: enables video looping like a gif

    Show Video Controls: display play, pause etc. buttons on video

    Autoplay Video: play video automatically without pressing play

    Mute Video: mute video


    External Block Settings

    URL: url of video

    Video alt text: alt text`
  },
  {
    title: "custom liquid",
    description: "This is a setting for custom liquid code.",
    images: [
      '/custom-liquid.png'
    ],
    description2: `Add app snippets or other Liquid code to create advanced customizations`
  },
  {
    title: "blog list",
    description: "This setting includes blog section text, blog menu selection and the amount of blog posts to show.",
    images: [
      '/blogList-settings.png'
    ],
    description2: `Headings - section title
    
    Italicize - part of title that is italicized

    Blog Section Description - a short description of blog section, mainly for SEO

    Blog - link list selection

    Posts - amount of posts to display`
  },
  {
    title: "collections list",
    description: "This setting includes linked list selection, background and text colors, font size and font weights and font selections.",
    images: [
      '/collectionsList-settings.png'
    ],
    description2: `Heading: section title
    
    Collections Menu: link list selection
    
    Custom Collections Menu Font Name: custom font name *leave empty if using a Shopify font

     Collections Menu Font: Shopify font selector *when you're not using a custom font use this
     
    Collections Menu Font Size: font size

    Collections Menu Font Weight: font weight

    Background Color: section background color

    Text Color: text color

    Text Hover Color: text hover color


    Hover images on collection text are the collection images set when creating a collection.`
  },
  {
    title: "featured collection",
    description: "This setting includes section title, subtitle, description, collection menu and product limit.",
    images: [
      '/featuredCollection-settings.png'
    ],
    description2: `Heading: includes an italicized text field
    
    Sub Heading: subheading that dscribes the collection

    Collection Description: a short description of featured collection section, mainly for SEO

    Collection: choosing the collection to display

    Product Limit: limits the amount of products to display in the collection chosen`
  },
  // {
  //   title: "pages overview",
  //   description: "A deeper dive into the page templates created for the theme.",
  //   header: true
  // },
  // {
  //   title: "home page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "product page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "collections listing page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "collection page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "blogs listing page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "article page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // }, {
  //   title: "contact page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "about page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "login page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "register page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "reset password page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "account page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "404 page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "cart page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  // {
  //   title: "checkout page",
  //   description: "this is the best thing since sliced bread",
  //   // images: [
  //   //   '/general-settings.png'
  //   // ]
  // },
  {
    title: "other",
    description: "Additional information.",
    header: true
    // images: [
    //   '/general-settings.png'
    // ]
  },
  {
    title: "app embeds",
    description: "To display some core features you need to enable and customize app embeds.",
    images: [
      '/appEmbeds1.png',
      '/appEmbeds2.png',
    ],
    description2: `Custom Fields: used for product accordions
    
    Instafeed App: used on the homepage to display instagram feed, for more info see the app in the admin`
  },
  {
    title: "how to add custom fonts",
    description: `An easy step by step guide on how to add custom fonts to your theme! 
    
    You can add a google font as well as a font you purchased elsewhere.`,
    images: [
      '/google-step1.png',
      '/google-step2.png',
      '/google-step3.png',
      '/google-step4.png',
      '/customFont1.png',
      '/customFont2.png',
      '/customFont3.png'
    ],
    description2: `Google Fonts
    
    1. Choose your google fonts and the styles youd like.

        1a. Copy the link text within the 'href' in the 'Use on the web' section. *You will use this link in the next steps

        1b. Copy the font family specified in the 'CSS rules to specify families'. *You will use this css in the next steps

    2. In the code editor locate the 'style.scss.liquid' file.

    3. Using the link from step 1a, paste this line of code in the liquid file: '@import url("the link from step 1a goes here");'.
    
    4. Lastly to use this font throughought the code paste in the css from step 1b where you want to use it.`,
    description3: `Other Fonts

    1. In the code editor locate the 'Assets' foleder and add your font file by clicking on the 'Add a new asset' button.

      1a. This file should be in 'woff' or 'woff2' format. If not you can convert the file here: https://cloudconvert.com/ttf-to-woff'

    2. In the code editor locate the 'style.scss.liquid' file.

      2a. Add this code snippet to the liquid file: 

      '@font-face {
        font-family: "replace with name of the font";
        src: url({{"replace with font file name including file extension(.woff/.woff2)" | asset_url}}) format("woff(replace with woff2 if font file is .woff2)");
      }'

    3. Lastly to use this font throughought the newly created font name from step 2a where you want to use it.`
  },
];

export default function Documentation() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const projectTitle = typeof router.query.slug === 'string' ? router.query.slug.replace(/-/g, ' ') : '';

  const [activeSection, setActiveSection] = useState("");

  const handleClick = (title: string) => {
    setActiveSection(title);
    const element = document.getElementById(title);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  const docNav = (event: string) => {
    onClose();
    handleClick(event);
  };


  return (
    <>
      <div className="mx-auto lg:mt-28 mt-16 mb-24">
        <h2 className="text-right lg:px-28 px-4">
          <div className="text-left">{projectTitle}/<br /></div>documentation
        </h2>
        <div className="wrapper flex justify-between mt-12 lg:pb-24 pb-[14rem]">
          <div className="main p-4 pl-0 lg:w-[65%] w-full h-auto h3 pt-24">
            <div className="documentationNav justify-between lg:w-full bg-light-creme items-center py-4 flex sticky top-0 z-10 w-screen lg:ml-0 -ml-8 lg:px-0 px-8 lg:hidden blog">
              <div className="text-[1.25rem]">documentation menu </div>

              <div className="text-[1rem]" onClick={onOpen}>(open me)</div>

              <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={"full"}
                motionPreset="scale"
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalCloseButton className="docNav z-10" />
                  <ModalBody className=" bg-light-creme">
                    <div className="sidebar p-4 pr-3 lg:w-[30%] w-full h-screen sticky top-0 text-center pt-24 mb-40 overflow-scroll lg:block">
                      {documentationData.map((data, index) => (
                        <Sidebar {...data} key={index} onClick={docNav} />

                      ))}
                    </div>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </div>

            {documentationData.map((data, index) => (
              <Main {...data} key={index} />
            ))}
          </div>
          <div className="sidebar p-4 pr-3 w-[30%] h-screen sticky top-0 text-center pt-24 mb-40 overflow-scroll lg:block hidden ">
            {documentationData.map((data, index) => (
              <Sidebar {...data} key={index} onClick={handleClick} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

