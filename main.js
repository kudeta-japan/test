(function () {
  const body = document.body;
  const dataset = body.dataset;
  const info = {
    address: dataset.address || '岐阜県岐阜市〇〇町1-2-3',
    hours: dataset.hours || 'ランチ 11:30-15:00 (L.O.14:00) / ディナー 17:30-23:00 (L.O.22:00)',
    phone: dataset.phone || '000-000-0000',
    reservationUrl: dataset.reservationUrl || '#reserve',
    instagram: dataset.instagram || '@ku_deta_gifu',
    seats: dataset.seats || 'テーブル40席 / カウンター6席'
  };

  function bindText(attribute, value) {
    document.querySelectorAll(`[data-bind="${attribute}"]`).forEach((el) => {
      el.textContent = value;
      if (el.tagName === 'A' && el.hasAttribute('href') && el.dataset.bind === 'phone') {
        el.setAttribute('href', `tel:${value.replace(/[^0-9+]/g, '')}`);
      }
    });
  }

  bindText('address', info.address);
  bindText('hours', info.hours);
  bindText('phone', info.phone);
  bindText('instagram', info.instagram);
  bindText('seats', info.seats);

  document.querySelectorAll('[data-reserve-link]').forEach((link) => {
    link.setAttribute('href', info.reservationUrl);
  });

  const phoneLinks = document.querySelectorAll('[data-phone-link]');
  phoneLinks.forEach((link) => {
    link.setAttribute('href', `tel:${info.phone.replace(/[^0-9+]/g, '')}`);
  });

  const instagramLinks = document.querySelectorAll('[data-instagram-link]');
  instagramLinks.forEach((link) => {
    const handle = info.instagram.startsWith('@') ? info.instagram.slice(1) : info.instagram;
    link.setAttribute('href', `https://www.instagram.com/${handle}/`);
  });

  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');
  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = nav.getAttribute('aria-expanded') === 'true';
      nav.setAttribute('aria-expanded', (!expanded).toString());
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const header = document.querySelector('header');
  if (header) {
    const updateHeader = () => {
      header.dataset.shrink = window.scrollY > 20 ? 'true' : 'false';
    };
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  const tabList = document.querySelector('[role="tablist"]');
  if (tabList) {
    tabList.querySelectorAll('[role="tab"]').forEach((tab) => {
      tab.addEventListener('click', () => {
        const selected = tab.getAttribute('aria-controls');
        tabList.querySelectorAll('[role="tab"]').forEach((btn) => {
          const isActive = btn === tab;
          btn.setAttribute('aria-selected', isActive.toString());
          btn.setAttribute('tabindex', isActive ? '0' : '-1');
        });

        document.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
          panel.setAttribute('aria-hidden', (panel.id === selected ? 'false' : 'true'));
        });
      });
    });
  }

  const reserveForm = document.getElementById('reserve-form');
  if (reserveForm) {
    const feedback = document.getElementById('reserve-feedback');
    reserveForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(reserveForm);
      const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
      let valid = true;
      reserveForm.querySelectorAll('.error-message').forEach((msg) => (msg.textContent = ''));

      requiredFields.forEach((field) => {
        const input = reserveForm.querySelector(`[name="${field}"]`);
        if (!input) return;
        if (!input.value.trim()) {
          valid = false;
          const holder = input.closest('label')?.querySelector('.error-message');
          if (holder) {
            holder.textContent = 'この項目は必須です。';
          }
        }
      });

      const email = formData.get('email');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString())) {
        valid = false;
        const holder = reserveForm.querySelector('[data-error="email"]');
        if (holder) holder.textContent = 'メールアドレスの形式が正しくありません。';
      }

      const phone = formData.get('phone');
      if (phone && !/^[0-9+\-]{9,15}$/.test(phone.toString())) {
        valid = false;
        const holder = reserveForm.querySelector('[data-error="phone"]');
        if (holder) holder.textContent = '電話番号の形式をご確認ください。';
      }

      if (!valid) {
        if (feedback) {
          feedback.innerHTML = '<div class="alert-error" role="alert">入力内容をご確認ください。</div>';
        }
        return;
      }

      if (feedback) {
        feedback.innerHTML = '<div class="alert-success" role="alert">仮予約を受け付けました。担当者より折り返しご連絡いたします。</div>';
      }
      reserveForm.reset();
    });
  }

  const recruitForm = document.getElementById('recruit-form');
  if (recruitForm) {
    const feedback = document.getElementById('recruit-feedback');
    recruitForm.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      recruitForm.querySelectorAll('.error-message').forEach((msg) => (msg.textContent = ''));

      ['applicant', 'contact', 'position', 'availability'].forEach((field) => {
        const input = recruitForm.querySelector(`[name="${field}"]`);
        if (!input) return;
        if (!input.value.trim()) {
          valid = false;
          const holder = input.closest('label')?.querySelector('.error-message');
          if (holder) holder.textContent = 'この項目は必須です。';
        }
      });

      const resumeInput = recruitForm.querySelector('input[name="resume"]');
      if (resumeInput) {
        const file = resumeInput.files?.[0];
        if (!file) {
          valid = false;
          const holder = recruitForm.querySelector('[data-error="resume"]');
          if (holder) holder.textContent = 'PDFファイルを添付してください。';
        } else if (file.type !== 'application/pdf') {
          valid = false;
          const holder = recruitForm.querySelector('[data-error="resume"]');
          if (holder) holder.textContent = 'PDF形式のみアップロードできます。';
        }
      }

      if (!valid) {
        if (feedback) {
          feedback.innerHTML = '<div class="alert-error" role="alert">入力内容をご確認ください。</div>';
        }
        return;
      }

      if (feedback) {
        feedback.innerHTML = '<div class="alert-success" role="alert">応募を受け付けました。担当者より連絡いたします。</div>';
      }
      recruitForm.reset();
    });
  }

  const ldRestaurant = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'KU-DETA',
    address: {
      '@type': 'PostalAddress',
      streetAddress: info.address,
      addressLocality: '岐阜市',
      addressRegion: '岐阜県',
      postalCode: '500-0000',
      addressCountry: 'JP'
    },
    telephone: info.phone,
    servesCuisine: ['American', 'Pizza', 'Pasta', 'Cheese', 'Steak'],
    priceRange: '\u00a5\u00a5',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday'
        ],
        opens: '11:30',
        closes: '23:00'
      }
    ],
    acceptsReservations: true,
    hasMenu: '#menu',
    sameAs: [`https://www.instagram.com/${info.instagram.startsWith('@') ? info.instagram.slice(1) : info.instagram}/`]
  };

  const ldMenu = {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: 'KU-DETA メニュー',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'ランチ',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: '牛カツランチ',
            description: '肉汁と衣のコントラストがクセになる看板ランチ。',
            offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '1600' }
          },
          {
            '@type': 'MenuItem',
            name: 'チーズフォンデュランチ',
            description: '4種チーズをブレンドした濃厚フォンデュ。',
            offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '1800' }
          }
        ]
      },
      {
        '@type': 'MenuSection',
        name: 'ディナー',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'ワカモレ&チップス',
            offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '900' }
          },
          {
            '@type': 'MenuItem',
            name: 'シカゴピザ',
            offers: { '@type': 'Offer', priceCurrency: 'JPY', price: '1800' }
          }
        ]
      }
    ]
  };

  const ldFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '予約は必要ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'お席を確実にご用意するため、オンラインまたはお電話での事前予約をおすすめしています。'
        }
      },
      {
        '@type': 'Question',
        name: '記念日プレートは対応できますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '550円でメッセージ付きのデザートプレートをご用意します。ご予約時にメッセージ内容をお知らせください。'
        }
      },
      {
        '@type': 'Question',
        name: '飲み放題プランはありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'アルコールは2,000円、ノンアルコールは1,500円でコースに追加いただけます。'
        }
      }
    ]
  };

  [ldRestaurant, ldMenu, ldFaq].forEach((schema) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
})();
