const LANGUAGES = 
[
        {  value: 'Abkhazian', label: 'Abkhazian'},
        { value: 'Afar', label: 'Afar'},
        { value: 'Afrikaans', label: 'Afrikaans'},
        {  value: 'Akan', label: 'Akan'},
        { value: 'Albanian', label: 'Albanian'},
        { value: 'Amharic', label: 'Amharic'},
        { value: 'Arabic', label: 'Arabic'},
        { value: 'Aragonese', label: 'Aragonese'},
        { value: 'Armenian', label: 'Armenian'},
        { value: 'Assamese', label: 'Assamese'},
        { value: 'Avaric', label: 'Avaric'},
        { value: 'Avestan', label: 'Avestan'},
        { value: 'Aymara', label: 'Aymara'},
        { value: 'Azerbaijani', label: 'Azerbaijani'},
        { value: 'Bambara', label: 'Bambara'},
        { value: 'Bashkir', label: 'Bashkir'},
        { value: 'Basque', label: 'Basque'},
        { value: 'Belarusian', label: 'Belarusian'},
        { value: 'Bengali (Bangla)', label: 'Bengali (Bangla)'},
        { value: 'Bihari', label: 'Bihari'},
        { value: 'Bislama', label: 'Bislama'},
        { value: 'Bosnian', label: 'Bosnian'},
        { value: 'Breton', label: 'Breton'},
        { value: 'Bulgarian', label: 'Bulgarian'},
        { value: 'Burmese', label: 'Burmese'},
        { value: 'Catalan', label: 'Catalan'},
        { value: 'Chamorro', label: 'Chamorro'},
        { value: 'Chechen', label: 'Chechen'},
        { label: 'Chichewa, Chewa, Nyanja', value: 'Chichewa, Chewa, Nyanja'},
        { label: 'Chinese', value: 'Chinese' },
        { label: 'Chuvash', value: 'Chuvash' },
        { label: 'Cornish', value: 'Cornish' },
        { label: 'Corsican', value: 'Corsican' },
        { label: 'Cree', value: 'Cree' },
        { label: 'Croatian', value: 'Croatian' },
        { label: 'Czech', value: 'Czech' },
        { label: 'Danish', value: 'Danish' },
        { label: 'Divehi, Dhivehi, Maldivian', value: 'Divehi, Dhivehi, Maldivian' },
        { label: 'Dutch', value: 'Dutch' },
        { label: 'Dzongkha', value: 'Dzongkha' },
        { label: 'English', value: 'English' },
        { label: 'Esperanto', value: 'Esperanto' },
        { label: 'Estonian', value: 'Estonian' },
        { label: 'Ewe', value: 'Ewe' },
        { label: 'Faroese', value: 'Faroese' },
        { label: 'Fijian', value: 'Fijian' },
        { label: 'Finnish', value: 'Finnish' },
        { label: 'French', value: 'French' },
        { label: 'Fula, Fulah, Pulaar, Pular', value: 'Fula, Fulah, Pulaar, Pular' },
        { label: 'Galician', value: 'Galician' },
        { label: 'Gaelic (Scottish)', value: 'Gaelic (Scottish)' },
        { label: 'Gaelic (Manx)', value: 'Gaelic (Manx)' },
        { label: 'Georgian', value: 'Georgian' },
        { label: 'German', value: 'German' },
        { label: 'Greek', value: 'Greek' },
        { label: 'Greenlandic', value: 'Greenlandic' },
        { label: 'Guarani', value: 'Guarani' },
        { label: 'Gujarati', value: 'Gujarati' },
        { label: 'Haitian Creole', value: 'Haitian Creole' },
        { label: 'Hausa', value: 'Hausa' },
        { label: 'Hebrew', value: 'Hebrew' },
        { label: 'Herero', value: 'Herero' },
        { label: 'Hindi', value: 'Hindi' },
        { label: 'Hiri Motu', value: 'Hiri Motu' },
        { label: 'Hungarian', value: 'Hungarian' },
        { label: 'Icelandic', value: 'Icelandic' },
        { label: 'Ido', value: 'Ido' },
        { label: 'Igbo', value: 'Igbo' },
        { label: 'Indonesian', value: 'Indonesian' },
        { label: 'Interlingua', value: 'Interlingua' },
        { label: 'Interlingue', value: 'Interlingue' },
        { label: 'Inuktitut', value: 'Inuktitut' },
        { label: 'Inupiak', value: 'Inupiak' },
        { label: 'Irish', value: 'Irish' },
        { label: 'Italian', value: 'Italian' },
        { label: 'Japanese', value: 'Japanese' },
        { label: 'Javanese', value: 'Javanese' },
        { label: 'Kalaallisut, Greenlandic', value: 'Kalaallisut, Greenlandic' },
        { label: 'Kannada', value: 'Kannada' },
        { label: 'Kanuri', value: 'Kanuri' },
        { label: 'Kashmiri', value: 'Kashmiri' },
        { label: 'Kazakh', value: 'Kazakh' },
        { label: 'Khmer', value: 'Khmer' },
        { label: 'Kikuyu', value: 'Kikuyu' },
        { label: 'Kinyarwanda (Rwanda)', value: 'Kinyarwanda (Rwanda)' },
        { label: 'Kirundi', value: 'Kirundi' },
        { label: 'Kyrgyz', value: 'Kyrgyz' },
        { label: 'Komi', value: 'Komi' },
        { label: 'Kongo', value: 'Kongo' },
        { label: 'Korean', value: 'Korean' },
        { label: 'Kurdish', value: 'Kurdish' },
        { label: 'Kwanyama', value: 'Kwanyama' },
        { label: 'Lao', value: 'Lao' },
        { label: 'Latin', value: 'Latin' },
        { label: 'Latvian (Lettish)', value: 'Latvian (Lettish)' },
        { label: 'Limburgish ( Limburger)', value: 'Limburgish ( Limburger)' },
        { label: 'Lingala', value: 'Lingala' },
        { label: 'Lithuanian', value: 'Lithuanian' },
        { label: 'Luga-Katanga', value: 'Luga-Katanga' },
        { label: 'Luganda, Ganda', value: 'Luganda, Ganda' },
        { label: 'Luxembourgish', value: 'Luxembourgish' },
        { label: 'Manx', value: 'Manx' },
        { label: 'Macedonian', value: 'Macedonian' },
        { label: 'Malagasy', value: 'Malagasy' },
        { label: 'Malay', value: 'Malay' },
        { label: 'Malayalam', value: 'Malayalam' },
        { label: 'Maltese', value: 'Maltese' },
        { label: 'Maori', value: 'Maori' },
        { label: 'Marathi', value: 'Marathi' },
        { label: 'Marshallese', value: 'Marshallese' },
        { label: 'Moldavian', value: 'Moldavian' },
        { label: 'Mongolian', value: 'Mongolian' },
        { label: 'Nauru', value: 'Nauru' },
        { label: 'Navajo', value: 'Navajo' },
        { label: 'Ndonga', value: 'Ndonga' },
        { label: 'Northern Ndebele', value: 'Northern Ndebele' },
        { label: 'Nepali', value: 'Nepali' },
        { label: 'Norwegian', value: 'Norwegian' },
        { label: 'Norwegian bokmål', value: 'Norwegian bokmål' },
        { label: 'Norwegian nynorsk', value: 'Norwegian nynorsk' },
        { label: 'Nuosu', value: 'Nuosu' },
        { label: 'Occitan', value: 'Occitan' },
        { label: 'Ojibwe', value: 'Ojibwe' },
        { label: 'Old Church Slavonic, Old Bulgarian', value: 'Old Church Slavonic, Old Bulgarian' },
        { label: 'Oriya', value: 'Oriya' },
        { label: 'Oromo (Afaan Oromo)', value: 'Oromo (Afaan Oromo)' },
        { label: 'Ossetian', value: 'Ossetian' },
        { label: 'Pāli', value: 'Pāli' },
        { label: 'Pashto, Pushto', value: 'Pashto, Pushto' },
        { label: 'Persian (Farsi)', value: 'Persian (Farsi)' },
        { label: 'Polish', value: 'Polish' },
        { label: 'Portuguese', value: 'Portuguese' },
        { label: 'Punjabi (Eastern)', value: 'Punjabi (Eastern)' },
        { label: 'Quechua', value: 'Quechua' },
        { label: 'Romansh', value: 'Romansh' },
        { label: 'Romanian', value: 'Romanian' },
        { label: 'Russian', value: 'Russian' },
        { label: 'Sami', value: 'Sami' },
        { label: 'Samoan', value: 'Samoan' },
        { label: 'Sango', value: 'Sango' },
        { label: 'Sanskrit', value: 'Sanskrit' },
        { label: 'Serbian', value: 'Serbian' },
        { label: 'Serbo-Croatian', value: 'Serbo-Croatian' },
        { label: 'Sesotho', value: 'Sesotho' },
        { label: 'Setswana', value: 'Setswana' },
        { label: 'Shona', value: 'Shona' },
        { label: 'Sichuan Yi', value: 'Sichuan Yi' },
        { label: 'Sindhi', value: 'Sindhi' },
        { label: 'Sinhalese', value: 'Sinhalese' },
        { label: 'Siswati', value: 'Siswati' },
        { label: 'Slovak', value: 'Slovak' },
        { label: 'Slovenian', value: 'Slovenian' },
        { label: 'Somali', value: 'Somali' },
        { label: 'Southern Ndebele', value: 'Southern Ndebele' },
        { label: 'Spanish', value: 'Spanish' },
        { label: 'Sundanese', value: 'Sundanese' },
        { label: 'Swahili (Kiswahili)', value: 'Swahili (Kiswahili)' },
        { label: 'Swati', value: 'Swati' },
        { label: 'Swedish', value: 'Swedish' },
        { label: 'Tagalog', value: 'Tagalog' },
];

export default LANGUAGES