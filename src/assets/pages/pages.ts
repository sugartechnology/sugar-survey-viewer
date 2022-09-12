export const pages = `
    [

    {
        "title": "",
        "type": "starter",
        "welcomePage": "false",
        "img": "https://sugar.mncdn.com/simurgsurvey/starter/surveystart-min.png",
        "skippage": "Page1",
        "classname": "firstpage",
        "titleText":" Satın almanız için özenle seçilmiş sanat eserlerini bulmak için sanat danışmanlarımızdan rehberlik isteyin",
        "title":"Ücretsiz Sanat Danışmanlığı"
    },

    {
        "title": "Page1",
        "type": "starter",
        "surveyType":"consulting",
        "classname": "secondpage"
    },

    {
        "title": "Page3",
        "column": "4",
        "type": "page",
        "maxanswer": "8",
        "surveyType":"survey",
        "question": "Hangi alanda kullanmak istiyorsunuz? Geçerli olanları seçin:",
        "formQuestionTitle": "Kullanılmak istenen alanlar",
        "answers": [
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/koltuk.png",
                "description": "Koltuk Üzeri"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/yatak_odasi.png",
                "description": "Yatak Odası"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/ofis.png",
                "description": "Ofis"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/yemek_masasi.png",
                "description": "Yemek Masası Üzeri"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/merdiven_boslugu.png",
                "description": "Merdiven Boşluğu"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/antre.png",
                "description": "Antre"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/somine.png",
                "description": "Şömine Üzeri"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage1/konsol_uzeri.png",
                "description": "Konsol Üzeri"
            }
        ]
    },
    {
        "title": "page4",
        "column": "2",
        "type": "page",
        "maxanswer": "1",
        "question": "Hangi kategorileri tercih edersiniz?",
        "formQuestionTitle": "Kategori Tercihleri",
        "filterType":"tdetay",
        "filterId":"9",
        "surveyType":"survey",
        "answers": [
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage2/modern.png",
                "description": "Modern",
                "skippage": "page6",
                "filterValue":"131"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/npage2/klasik.png",
                "description": "Klasik",
                "skippage": "page5",
                "filterValue":"132"
            }
        ]
    },
    {
        "title": "page5",
        "column": "5",
        "type": "page",
        "filterType":"category",
        "maxanswer": "3",
        "filterId":"null",
        "surveyType":"survey",
        "classname":"untitled",
        "question": "",
        "formQuestionTitle": "Modern seçim kategorileri",
        "answers": [
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/modern_istanbul.png",
            "description": "Modern İstanbul",
            "filterValue":"203?"
           
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/soyut.png",
            "description": "Soyut",
            "filterValue":"216"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/cicek_bitki.png",
            "description": "Çiçek ve Bitki",
            "filterValue":"199"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/semazen.png",
            "description": "Semazen",
            "filterValue":"203"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/dekoratif.png",
            "description": "Dekoratif",
            "filterValue":"629"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/hayvanlar.png",
            "description": "Hayvanlar",
            "filterValue":"209"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/manzara.png",
            "description": "Manzara",
            "filterValue":"208"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/figuratif.png",
            "description": "Figüratif",
            "filterValue":"890"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/simurg.png",
            "description": "Simurg Kuşu",
            "filterValue":"824"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage3/hat.png",
            "description": "Modern Hat Sanatı",
            "filterValue":"843"
        }
        ]
    },
    {
        "title": "page6",
        "column": "5",
        "type": "page",
        "maxanswer": "3",
        "filterType":"category",
        "filterId":"null",
        "surveyType":"survey",
        "classname":"untitled",
        "formQuestionTitle": "Klasik seçim kategorileri",
        "question": "",
        "answers": [
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/klasik_istanbul.png",
            "description": "Klasik İstanbul",
            "filterValue":"203"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/naturmort.png",
            "description": "Natürmort",
            "filterValue":"211"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/hayvanlar.png",
            "description": "Hayvanlar",
            "filterValue":"209"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/manzara.png",
            "description": "Manzara",
            "filterValue":"208"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/Ataturk.png",
            "description": "Atatürk",
            "filterValue":"649"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/figuratif.png",
            "description": "Figüratif",
            "filterValue":"890"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/cicek_bitki.png",
            "description": "Çiçek ve Bitki",
            "filterValue":"199"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/kavramsal.png",
            "description": "Kavramsal",
            "filterValue":"534"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/semazen.png",
            "description": "Semazen",
            "filterValue":"202"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage4/hat.png",
            "description": "Klasik Hat Sanatı",
            "filterValue":"844"
        }
        ]
    },
    {
        "title": "page7",
        "column": "3",
        "type": "page",
        "maxanswer": "3",
        "surveyType":"survey",
        "question": "Belirli bir yönlendirmeye mi ihtiyacınız var? Geçerli olanları seçin:",
        "formQuestionTitle": "Tercih Yönü",
        "filterType":"tdetay",
        "filterId":"4",
        "classname":"measurements",
        "answers": [
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/page7/yatay.png",
                "description": "Yatay",
                "filterValue":"99"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/page7/dikey.png",
                "description": "Dikey",
                "filterValue":"98"
            },
            {
                "answer": "https://sugar.mncdn.com/simurgsurvey/page7/kare.png",
                "description": "Kare",
                "filterValue":"89"
            }
        ]
    },
    {
        "title": "page8",
        "column": "4",
        "type": "page",
        "maxanswer": "4",
        "lastpage": "true",
        "finishText":"Eserleri Gösterin",
        "filterType":"measurement",
        "surveyType":"survey",
        "question": "Hangi ölçüyü arıyorsunuz? Geçerli olanları seçin",
        "formQuestionTitle": "Ölçü boyutu",
        "filterId":"7",
        "answers": [
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage5/small.png",
            "description": "Küçük",
            "filterValue":"140,118,335,171,172,139,168,119,340,165"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage5/middle.png",
            "description": "Orta",
            "filterValue":"142,163,128,143,120,339,141,164,121,147,122,125,341,330,129,179,331,148"

        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage5/big.png",
            "description": "Büyük",
            "filterValue":"138, 156, 149, 150, 123, 162, 160, 130, 158, 126, 342, 333, 161, 167, 343, 151,336"
        },
        {
            "answer": "https://sugar.mncdn.com/simurgsurvey/npage5/bigger.png",
            "description": "Ekstra Büyük",
            "filterValue":"337, 154, 328, 153, 327, 338, 93, 127, 159, 177, 176, 326, 152, 332"

        }
        ]
    },
    {
        "title": "page10",
        "column": "2",
        "type": "form",
        "maxanswer": "12",
        "surveyType":"consulting",
        "classname":"form_file",
        "question": "Neredeyse bitirdiniz. Lütfen aşağıdaki alanları doldurun:",
        "formQuestionTitle": "Form: ",
        "inputs": [
            { "input": "Ad:", "classname": "formInput" },
            { "input": "Soyad:", "classname": "formInput" },

            {
                "input": "E-mail:",
                "classname": "formInput",
                "type":"email"
            },

            {
                "input": "Telefon:",
                "classname": "formInput",
                "type":"phonenumber"
            }
        ]
    },
    {
        "title": "page11",
        "column": "2",
        "lastpage": "true",
        "finishText":"Istek Gönderin",
        "type": "messageform",
        "maxanswer": "0",
        "surveyType":"consulting",
        "question": "Resimde yer almasını istediğiniz renkleri ve ayrıntıları gönderiniz.",
        "formQuestionTitle": "Istenen Resim Özellikleri",
        "inputs": [
            {
                "input": "Buraya yaz... ",
                "classname": "messagetext"
            }
        ]
    },
    {
        "title": "Page12",
        "type": "starter",
        "classname": "lastpage"
    }
]
`;



