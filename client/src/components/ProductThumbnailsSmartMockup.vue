<template>
  <div class="product-thumbnails-component">
    <ul class="thumbnails">
            <li v-for="thumbnail in thumbnails" :key="thumbnail.id" @click="selectThumb(thumbnail)" :class="{selected: selectedThumbnailIds.includes(thumbnail.id)}">
                <img :src="thumbnail.thumb" />
            </li>
    </ul>
        <ul>
            [<li v-for="th in selectedThumbnails" :key="th.id" @click="removeThumbnail(th)">{smartMockupId:"{{th.id}}", url:"{{th.thumb}}", category:"{{th.category}}"},</li>]
        </ul>
  </div>
</template>

<script>
// response from https://public-api.smartmockups.com/v1/mockups
const thumbnails = 
[

    {
        "id": "rBkJcv3k@",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_5_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 795,
        "image_height": 562,
        "category": "brochures"
    },
    {
        "id": "bkSauLqbk",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_17_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 792,
        "image_height": 1124,
        "category": "brochures"
    },
    {
        "id": "FsPb7Fd76",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_us_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 362,
        "image_height": 560,
        "category": "brochures"
    },
    {
        "id": "XLXEVNWRQ",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_dl_7_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 264,
        "image_height": 560,
        "category": "brochures"
    },
    {
        "id": "0PL5LXqfH",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_7_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 562,
        "image_height": 795,
        "category": "brochures"
    },
    {
        "id": "2x$7jXTp@",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_iso_2_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 396,
        "image_height": 560,
        "category": "brochures"
    },
    {
        "id": "XbIFG$yMG",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_us_23_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 433,
        "category": "brochures"
    },
    {
        "id": "OMYgDkw7G",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_dl_12_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 264,
        "image_height": 560,
        "category": "brochures"
    },
    {
        "id": "cfYT0p5sm",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_iso_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 396,
        "image_height": 560,
        "category": "brochures"
    },
    {
        "id": "hq8LtPBx7",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_iso_11_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 396,
        "image_height": 560,
        "category": "brochures"
    },
    {
        "id": "cGFqkIqf1",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_32_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 427,
        "image_height": 907,
        "category": "brochures"
    },
    {
        "id": "FowrpCBPX",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_bc_3_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 476,
        "image_height": 308,
        "category": "business-cards"
    },
    {
        "id": "yUGo6PYpq",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_bc_13_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 308,
        "image_height": 476,
        "category": "business-cards"
    },
    {
        "id": "QUBeK0KDo",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_business_23_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 280,
        "image_height": 490,
        "category": "business-cards"
    },
    {
        "id": "eKF1EDn$p",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_business_11_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 280,
        "image_height": 433,
        "category": "business-cards"
    },
    {
        "id": "CgCNQTvn7",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_bc_9_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 476,
        "image_height": 308,
        "category": "business-cards"
    },
    {
        "id": "z7@qlDKVi",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_9_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 518,
        "image_height": 288,
        "category": "business-cards"
    },
    {
        "id": "WC7WA1UeN",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_business_9_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 433,
        "image_height": 280,
        "category": "business-cards"
    },
    {
        "id": "yxJrZ5Cqw",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 518,
        "image_height": 288,
        "category": "business-cards"
    },
    {
        "id": "9KUYfeLoR",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_business_17_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 433,
        "image_height": 280,
        "category": "business-cards"
    },
    {
        "id": "b0@m56ax1",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_26_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 635,
        "image_height": 399,
        "category": "business-cards"
    },
    {
        "id": "AE406c6zw",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_11_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 635,
        "image_height": 399,
        "category": "business-cards"
    },
    {
        "id": "fO4xRHBt8",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_288_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 870,
        "image_height": 490,
        "category": "desktop"
    },
    {
        "id": "8KKNd5t7E",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_19_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 448,
        "image_height": 252,
        "category": "desktop"
    },
    {
        "id": "zubIa5PrR",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_100_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 672,
        "image_height": 378,
        "category": "desktop"
    },
    {
        "id": "Hp6bhajkc",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_1_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 672,
        "image_height": 378,
        "category": "desktop"
    },
    {
        "id": "$gyiaAQ@D",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_104_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 788,
        "image_height": 525,
        "category": "desktop"
    },
    {
        "id": "RjCwTHM3f",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_101_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 672,
        "image_height": 378,
        "category": "desktop"
    },
    {
        "id": "aRJnoeMPL",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_73_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 870,
        "image_height": 490,
        "category": "desktop"
    },
    {
        "id": "TqWygmQUt",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_2_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 672,
        "image_height": 378,
        "category": "desktop"
    },
    {
        "id": "g7QQfRMe@",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_3_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 870,
        "image_height": 490,
        "category": "desktop"
    },
    {
        "id": "jAQHKS3k0",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_119_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 870,
        "image_height": 490,
        "category": "desktop"
    },
    {
        "id": "qSAtBQxoA",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_117_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 870,
        "image_height": 490,
        "category": "desktop"
    },
    {
        "id": "3@VMZ5e1r",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_71_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 870,
        "image_height": 490,
        "category": "desktop"
    },
    {
        "id": "NKK3i9bwV",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_28_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 403,
        "category": "greeting-cards"
    },
    {
        "id": "zXsN9P1g3vs",
        "thumb": "https://smartmockupsv2.imgix.net/print_mockette_4_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 403,
        "image_height": 302,
        "category": "greeting-cards"
    },
    {
        "id": "B0vlgEYKY",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_32_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 433,
        "category": "greeting-cards"
    },
    {
        "id": "fc13wMpG3",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_24_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 433,
        "category": "greeting-cards"
    },
    {
        "id": "oTCUKWF9C",
        "thumb": "https://smartmockupsv2.imgix.net/print_mocup_23_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 613,
        "image_height": 434,
        "category": "greeting-cards"
    },
    {
        "id": "dBkgzSwCV",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_3_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 700,
        "image_height": 504,
        "category": "greeting-cards"
    },
    {
        "id": "EyLX@tnDI",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_1_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 433,
        "category": "greeting-cards"
    },
    {
        "id": "wMqZBsfvs",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 433,
        "category": "greeting-cards"
    },
    {
        "id": "RLL44V$RT",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_42_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 403,
        "image_height": 403,
        "category": "greeting-cards"
    },
    {
        "id": "BJX44W1aA",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_15_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 403,
        "image_height": 560,
        "category": "greeting-cards"
    },
    {
        "id": "zysqbYn3m",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_46_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 403,
        "image_height": 403,
        "category": "greeting-cards"
    },
    {
        "id": "VEPeH9Yxy",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_greetings_37_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 403,
        "image_height": 403,
        "category": "greeting-cards"
    },
    {
        "id": "Nsj2XNgyW",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_74_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "hoodies"
    },
    {
        "id": "oOAWsqKRq",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_41_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "hoodies"
    },
    {
        "id": "ktVMF9J6y",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_12_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 327,
        "image_height": 467,
        "category": "hoodies"
    },
    {
        "id": "iPXRQVT$Q",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_37_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "hoodies"
    },
    {
        "id": "kQnciPoI@",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_39_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "hoodies"
    },
    {
        "id": "NgIgyTa2U",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_78_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1306,
        "image_height": 816,
        "category": "laptop"
    },
    {
        "id": "maRUBRSXHv",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_5_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 504,
        "image_height": 315,
        "category": "laptop"
    },
    {
        "id": "@eXKMvVPL",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_202_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 653,
        "image_height": 408,
        "category": "laptop"
    },
    {
        "id": "YTuWMIESF",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_121_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 653,
        "image_height": 408,
        "category": "laptop"
    },
    {
        "id": "DW1o_9JBY",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_7_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 504,
        "image_height": 315,
        "category": "laptop"
    },
    {
        "id": "a7zZFMASE",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_106_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 672,
        "image_height": 448,
        "category": "laptop"
    },
    {
        "id": "jQvnKf$pW",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_25_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 336,
        "image_height": 210,
        "category": "laptop"
    },
    {
        "id": "06ypKxFoz",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_11_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 672,
        "image_height": 420,
        "category": "laptop"
    },
    {
        "id": "abP4v1RDv",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_176_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 653,
        "image_height": 408,
        "category": "laptop"
    },
    {
        "id": "LP04OA6E1",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_7_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 653,
        "image_height": 408,
        "category": "laptop"
    },
    {
        "id": "7Zee8n4Dt",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_15_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1161,
        "image_height": 725,
        "category": "laptop"
    },
    {
        "id": "JqAo5oDUE",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_47_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1306,
        "image_height": 816,
        "category": "laptop"
    },
    {
        "id": "JtcY0KQk$",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_16_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1161,
        "image_height": 725,
        "category": "laptop"
    },
    {
        "id": "KMyZ@Ln3k",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_other_9_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 280,
        "image_height": 420,
        "category": "magazines&books"
    },
    {
        "id": "OX9$a6CPo",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_other_6_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 280,
        "image_height": 420,
        "category": "magazines&books"
    },
    {
        "id": "lu845v0GO",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_other_1_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 280,
        "image_height": 420,
        "category": "magazines&books"
    },
    {
        "id": "r33MElE0S",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_56_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 405,
        "image_height": 573,
        "category": "magazines&books"
    },
    {
        "id": "7snquD360",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_96_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 444,
        "image_height": 573,
        "category": "magazines&books"
    },
    {
        "id": "xprLcb4zE",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_91_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 573,
        "image_height": 573,
        "category": "magazines&books"
    },
    {
        "id": "t0nBU80Em",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_14_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1032,
        "image_height": 738,
        "category": "mugs"
    },
    {
        "id": "lOfv9Gt7Y",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_enamel_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 573,
        "image_height": 197,
        "category": "mugs"
    },
    {
        "id": "U9Ty47Ck9",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_mugs_10_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 573,
        "image_height": 218,
        "category": "mugs"
    },
    {
        "id": "6GHoNvdzs",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_other_5_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 420,
        "category": "mugs"
    },
    {
        "id": "0a$1U75kq",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_mugs_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 573,
        "image_height": 218,
        "category": "mugs"
    },
    {
        "id": "NtL9riK7N",
        "thumb": "https://smartmockupsv2.imgix.net/print_smartmockups_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 941,
        "image_height": 670,
        "category": "mugs"
    },
    {
        "id": "eoV7IjQ$n",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_other_7_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 504,
        "image_height": 420,
        "category": "mugs"
    },
    {
        "id": "5jqak6N4g",
        "thumb": "https://smartmockupsv2.imgix.net/print_bundle_other_2_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 560,
        "image_height": 420,
        "category": "mugs"
    },
    {
        "id": "v8ga0SmH$",
        "thumb": "https://smartmockupsv2.imgix.net/home_smartmockups_14_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 315,
        "image_height": 210,
        "category": "other"
    },
    {
        "id": "nSLVn@fAj",
        "thumb": "https://smartmockupsv2.imgix.net/home_smartmockups_3_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 573,
        "image_height": 386,
        "category": "pillows"
    },
    {
        "id": "r0OvQZVBD",
        "thumb": "https://smartmockupsv2.imgix.net/home_smartmockups_1_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 568,
        "image_height": 568,
        "category": "pillows"
    },
    {
        "id": "wokV1l1Bp",
        "thumb": "https://smartmockupsv2.imgix.net/home_smartmockups_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 568,
        "image_height": 568,
        "category": "pillows"
    },
    {
        "id": "dimDitjJj",
        "thumb": "https://smartmockupsv2.imgix.net/print_poster_4_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 416,
        "image_height": 589,
        "category": "posters&boards"
    },
    {
        "id": "txZgbwVEJ",
        "thumb": "https://smartmockupsv2.imgix.net/print_poster_7_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 416,
        "image_height": 589,
        "category": "posters&boards"
    },
    {
        "id": "lgyvXqQwX",
        "thumb": "https://smartmockupsv2.imgix.net/print_poster_18_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 589,
        "image_height": 416,
        "category": "posters&boards"
    },
    {
        "id": "Jn1E8U$ux",
        "thumb": "https://smartmockupsv2.imgix.net/print_poster_16_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 589,
        "image_height": 416,
        "category": "posters&boards"
    },
    {
        "id": "7gkWeJbHV",
        "thumb": "https://smartmockupsv2.imgix.net/print_kavoon_12_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 700,
        "image_height": 1091,
        "category": "posters&boards"
    },
    {
        "id": "ni@$ttQJ6",
        "thumb": "https://smartmockupsv2.imgix.net/print_kavoon_16_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 868,
        "image_height": 868,
        "category": "posters&boards"
    },
    {
        "id": "0EgHhtRqw",
        "thumb": "https://smartmockupsv2.imgix.net/print_kavoon_1_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 700,
        "image_height": 1091,
        "category": "posters&boards"
    },
    {
        "id": "zijSiT@$a",
        "thumb": "https://smartmockupsv2.imgix.net/print_kavoon_5_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 772,
        "image_height": 1091,
        "category": "posters&boards"
    },
    {
        "id": "mKaNAx@rj",
        "thumb": "https://smartmockupsv2.imgix.net/print_kavoon_26_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 868,
        "image_height": 1228,
        "category": "posters&boards"
    },
    {
        "id": "ALesO@c60",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_52_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 510,
        "image_height": 1104,
        "category": "smartphone"
    },
    {
        "id": "YZAzTUu5T",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_356_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 315,
        "image_height": 682,
        "category": "smartphone"
    },
    {
        "id": "fxvUG6rmb",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_21_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 340,
        "image_height": 605,
        "category": "smartphone"
    },
    {
        "id": "KCfuLxL@D",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_332_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 682,
        "image_height": 315,
        "category": "smartphone"
    },
    {
        "id": "jobUA4fSM",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_110_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 340,
        "image_height": 605,
        "category": "smartphone"
    },
    {
        "id": "SNGhW2Dnz",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_23_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 490,
        "image_height": 870,
        "category": "smartphone"
    },
    {
        "id": "MaS8SFhT9",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_61_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 510,
        "image_height": 1104,
        "category": "smartphone"
    },
    {
        "id": "uE1Mha0Xz",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_331_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 202,
        "image_height": 437,
        "category": "smartphone"
    },
    {
        "id": "89UEGkCFV",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_22_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 263,
        "image_height": 568,
        "category": "smartphone"
    },
    {
        "id": "zSyihZqWB",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 263,
        "image_height": 568,
        "category": "smartphone"
    },
    {
        "id": "4V7iOxK4k",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_9_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 263,
        "image_height": 568,
        "category": "smartphone"
    },
    {
        "id": "pJGVid2CV",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_15_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 263,
        "image_height": 568,
        "category": "smartphone"
    },
    {
        "id": "z0g8n3Zrp",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_330_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 403,
        "image_height": 829,
        "category": "smartphone"
    },
    {
        "id": "Q2ROCXV1v",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_76_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 340,
        "image_height": 605,
        "category": "smartphone"
    },
    {
        "id": "R6lEIJ5hS",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_340_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 232,
        "image_height": 502,
        "category": "smartphone"
    },
    {
        "id": "zKIGxyin$",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_63_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 510,
        "image_height": 1104,
        "category": "smartphone"
    },
    {
        "id": "WnhSeVacd",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_17_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 263,
        "image_height": 467,
        "category": "smartphone"
    },
    {
        "id": "h3c0X5YYq",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_302_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 467,
        "image_height": 263,
        "category": "smartphone"
    },
    {
        "id": "9RoWqFEahl",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_58_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "Fz73$72qqX",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_61_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "uQId5xojCn",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_52_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "fg6Zz$oE2P",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_81_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "XI4FiA7lXO",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_63_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "1qfBOW0mUD",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_74_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "GRjl8AznUO",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_50_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "pluJnipIt@",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_79_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "sweatshirts"
    },
    {
        "id": "Mk16gSArH",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_88_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 696,
        "image_height": 928,
        "category": "tablet"
    },
    {
        "id": "fYLeI0FJl",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_363_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 573,
        "image_height": 430,
        "category": "tablet"
    },
    {
        "id": "WvZtwKxmr",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_75_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 928,
        "image_height": 696,
        "category": "tablet"
    },
    {
        "id": "V4V3$aXvu",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_282_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 696,
        "image_height": 928,
        "category": "tablet"
    },
    {
        "id": "MTuD8Ac2m",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_289_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 696,
        "image_height": 928,
        "category": "tablet"
    },
    {
        "id": "clEHXzrDq",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_25_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 696,
        "image_height": 928,
        "category": "tablet"
    },
    {
        "id": "EG1YJ0kga",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_4_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 696,
        "image_height": 928,
        "category": "tablet"
    },
    {
        "id": "wOBHdsPXM",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_211_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 696,
        "image_height": 928,
        "category": "tablet"
    },
    {
        "id": "GpAzTrpeg",
        "thumb": "https://smartmockupsv2.imgix.net/digital_device_7_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 717,
        "image_height": 956,
        "category": "tablet"
    },
    {
        "id": "Yx0skRXmw",
        "thumb": "https://smartmockupsv2.imgix.net/digital_mocup_27_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 928,
        "image_height": 696,
        "category": "tablet"
    },
    {
        "id": "RwWmfWYni",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_338_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 430,
        "image_height": 573,
        "category": "tablet"
    },
    {
        "id": "I2Kam8WUW",
        "thumb": "https://smartmockupsv2.imgix.net/digital_bundle_9_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 538,
        "image_height": 717,
        "category": "tablet"
    },
    {
        "id": "O0Mh42evQ",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_27_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tanks"
    },
    {
        "id": "ozMtqYk3y",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_36_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tanks"
    },
    {
        "id": "OGp2DSBaj",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_57_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tanks"
    },
    {
        "id": "WXtyRy$IH",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_30_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tanks"
    },
    {
        "id": "1Nj3Vu@BYi",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_108_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tanks"
    },
    {
        "id": "nHuBglnts",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_8_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 508,
        "image_height": 685,
        "category": "tanks"
    },
    {
        "id": "6G0iiresL",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_6_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 397,
        "image_height": 630,
        "category": "tanks"
    },
    {
        "id": "qI$FczsFL",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_26_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "Li$1zBtIR",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_21_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "4jkMTdhzv",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_54_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "jcA2UV@Rb",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_15_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "hwvBHs5Mz",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_43_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "zC$bGUNl8",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_22_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "78fyWEKrh",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_14_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "6jVTxZT6X",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_44_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "3ZaF77kaX",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_10_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "I@BV2JXYF",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_20_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "Kh994wMNu",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_35_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "2cWVVueJa",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_4_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "yMKAizvJ1",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_63_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "FDmLh5lys",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_129_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "409hZrQDo",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_2_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 397,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "GOOl8PsWW",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_19_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "2uI9FCpPb",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_smartmockups_25_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 420,
        "image_height": 560,
        "category": "tshirts"
    },
    {
        "id": "NL6S41Vgf",
        "thumb": "https://smartmockupsv2.imgix.net/apparel_freeman_tshirt_6_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 525,
        "image_height": 700,
        "category": "tshirts"
    },
    {
        "id": "uhgy3Fu_A9",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_5_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1344,
        "image_height": 756,
        "category": "tv&screens"
    },
    {
        "id": "Lmia3jnG3P",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_2_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1344,
        "image_height": 756,
        "category": "tv&screens"
    },
    {
        "id": "qGvdXUHiW5",
        "thumb": "https://smartmockupsv2.imgix.net/digital_smartmockups_4_pr.jpg?w=400&auto=format%2Ccompress&ixlib=js-2.2.0",
        "image_width": 1344,
        "image_height": 756,
        "category": "tv&screens"
    }

]
export default {
  name: 'ProductThmbnails',
  props: {
    select: Function
  },
    data() {
        return {
            thumbnails,
            selectedThumbnails: [],
        }
    },
    computed: {
        selectedThumbnailIds() {
            return this.selectedThumbnails.map(t => t.id)
        },
    },
    methods: {
        selectThumb(id) {
            if (this.selectedThumbnails.indexOf(id) === -1) {
                this.selectedThumbnails.push(id)
            } else {
                this.selectedThumbnails = this.selectedThumbnails.filter(t => t !== id)
            }
        },
        removeThumbnail(id) {
            this.selectedThumbnails = this.selectedThumbnails.filter(i => i !== id)
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.thumbnails {
  li {
     border: 1px solid transparent;
     &.selected {
         border: 1px solid #ffff00;
     }
  }
}
</style>
