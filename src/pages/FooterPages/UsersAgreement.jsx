import React from "react";
import { Header, Footer } from "../../components/index";
import "./footer-pages.css";

const UsersAgreement = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="CardThings">
      <Header />
      <div className="CardThings_Wrapper">
        <div className="CardThings_Wrapper_container">
          <div className="container_content_card">
            <div className="card_content_footer_pages">
              <h1 className="footer_pages_main_title">
                ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ{" "}
              </h1>
              <h2 className="footer_pages_main_title">
                (между платформой Razdelisdrugim.by и пользователем)
              </h2>
              <h3>1. ОБЩИЕ ПОЛОЖЕНИЯ </h3>
              <p className="footer_pages_main_p">
                1.1. Онлайн-сервис (платформа) Razdelisdrugim.by (далее также –
                «Портал») – это онлайн площадка с предложениями (объявлениями)
                от арендодателей об аренде любого вида имущества, являющаяся
                коммуникационной платформой между арендодателями и арендаторами.
                <br></br>
                1.2. В настоящем Соглашении пользователя термины используются в
                следующих значениях:<br></br>
                Администрация Портала (владелец Портала) – Индивидуальный
                предприниматель Клементьева Ольга Анатольевна и/или лица,
                уполномоченные им должным образом на управление Порталом и
                оказание услуг Пользователям. Администрация Портала является
                поставщиком услуг промежуточного характера в информационной
                сфере и не является инициатором передачи информации.<br></br>
                Пользователь Портала (арендатор) – любое дееспособное физическое
                лицо (или юридическое лицо), принявшее условия настоящего
                Соглашения и взаимодействующее с Порталом в соответствии с
                настоящим Пользовательским соглашением.<br></br>
                Арендодатель (автор объявления) – любое дееспособное физическое
                лицо (или юридическое лицо, или индивидуальный предприниматель),
                которое в порядке, установленном Договором-офертой о
                предоставлении услуг, получил услугу доступа к Порталу и
                публикующее в соответствующем разделе Портала объявления с
                информацией об Имуществе, предлагаемом к принятию в аренду
                Пользователям.<br></br>
                Верификация (идентификация Пользователя Портала) – совокупность
                мероприятий по установлению сведений о Пользователе Портала, а
                именно: проверка Пользователя, которая осуществляется путем
                введения в соответствующее поле на странице верификации
                специального кода, отправленного Администрацией Портала в
                SMS/Viber-сообщении на номер, указанный Пользователем при
                регистрации на Портале. При этом один номер мобильного телефона
                и (или) один комплект иных идентификационных данных могут быть
                использованы для регистрации не более одной Учетной записи
                Пользователя на Портале.<br></br>
                Контент – любая информация, размещаемая Арендодателем на
                Портале, включая, но не ограничиваясь: название и описание
                Имущества, фотографии, характеристики, информация об
                Арендодателе и т.д.<br></br>
                Личный кабинет – это раздел Портала, функции которого доступны
                Пользователю после ввода логина-пароля. Также в Личном кабинете
                отображается хранимая на Портале информация о Пользователе.
                <br></br>
                Объявление – сообщение с информацией об Имуществе, предлагаемом
                в аренду, которое размещается Арендодателем.<br></br>
                Имущество – любая вещь, объект, движимое и недвижимое имущество,
                предлагаемые Арендодателем в аренду Пользователям.<br></br>
                Политика конфиденциальности – условия работы с конфиденциальной
                информацией на Портале, которая является неотъемлемой частью
                настоящего Соглашения и размещена по ссылке на сайте
                Razdelisdrugim.by.<br></br>
                Портал – совокупность программных и аппаратных средств,
                результат компьютерного программирования в виде онлайн сервиса
                (платформы) Razdelisdrugim.by, который размещен в сети Интернет
                по адресу https://razdelisdrugim.by.<br></br>
                Правила оформления рекламных объявлений на Портале – требования
                к оформлению Контента на Портале, которые являются неотъемлемой
                частью настоящего Соглашения и размещены по ссылке
                Razdelisdrugim.by.<br></br>
                Правила публикации отзывов – требования, которые должны
                соблюдать Пользователи при размещении и публикации отзывов о
                деятельности Арендодателей на Портале либо их Имуществе, которые
                являются неотъемлемой частью настоящего Соглашения и размещены
                по ссылке Razdelisdrugim.by.<br></br>
                Сервисы – совокупность услуг, которые предоставляются
                Пользователям на Портале в соответствии с этим Соглашением и
                Договором-офертой о предоставлении услуг.<br></br>
                Соглашение – Пользовательское соглашение, в котором определены
                условия использования Портала Razdelisdrugim.by, а также
                взаимные права и обязанности Пользователя и Администрации
                Портала, и которое размещено по ссылке Razdelisdrugim.by.
                <br></br>
                1.3. Настоящее Пользовательское соглашение регламентирует
                отношения между Администрацией Портала и любым Пользователем,
                изъявившим желание воспользоваться услугами Портала. Моментом
                заключения настоящего Соглашения считается момент любого
                взаимодействия Пользователя с Порталом. Этим Пользователи
                подтверждают свое согласие со всеми условиями настоящего
                Пользовательского соглашения, а Портал предоставляет им
                персональное, неисключительное, неотчуждаемое, ограниченное
                право на вход на страницы Портала и использование Портала, а
                также Сервисы на условиях, изложенных в этом Соглашении.
                Заключение настоящего Пользовательского соглашения производится
                путем присоединения Пользователя к настоящему Пользовательскому
                соглашению, т.е. посредством принятия (акцепта) Пользователем
                условий настоящего Договора в целом, без каких-либо условий,
                изъятий и оговорок (статья 398 Гражданского кодекса Республики
                Беларусь).<br></br>
                1.4. Любое взаимодействие Пользователя с Порталом (в том числе,
                но не исключительно, регистрация на Портале, Верификация)
                означает безусловное согласие Пользователя со всеми пунктами
                настоящего Соглашения (включая его приложения), безусловное
                принятие его условий с обязательством соблюдать обязанности,
                возложенные на Пользователя, вытекающие из настоящего
                Соглашения. Такое взаимодействие с Порталом является полным и
                безусловным акцептом настоящего Соглашения, незнание которого не
                освобождает Пользователя от ответственности за невыполнение его
                условий.<br></br>
                1.5. Пользовательское соглашение может быть изменено
                Администрацией Портала без предварительного уведомления. Текущая
                версия Пользовательского соглашения доступна на странице
                Razdelisdrugim.by. Продолжение пользования Порталом
                Пользователем (любая его дальнейшее взаимодействие с Порталом)
                означает его согласие с изменениями в Соглашении.<br></br>
                1.6. В случае, если Пользователь не согласен с какими-либо
                условиями настоящего Соглашения и/или не согласен соблюдать
                условия настоящего Соглашения (или новой редакции Соглашения),
                он не вправе пользоваться возможностями/Сервисами Портала и
                обязан прекратить использование Портала и покинуть его.<br></br>
              </p>
              <h3>2. ОПИСАНИЕ УСЛУГ </h3>
              <p className="footer_pages_main_p">
                2.1. Портал предоставляет услуги, позволяющие Пользователям
                бесплатно регистрироваться и создавать на Портале Учетные
                записи, ознакамливаться с предложениями Арендодателей и
                коммуницировать с ними.<br></br>
                2.2. После регистрации на Портале Пользователь получает доступ к
                разделу Портала «Личный кабинет», в котором хранится информация
                о нем, информация о предлагаемом к аренде имуществе, истории
                бронирований, другая информация, с помощью которой он может
                получить доступ к полной базе данных объявлений от
                Арендодателей.<br></br>
                2.3. Любой Пользователь, пользуясь Сервисами на Портале, может
                оставлять свои отзывы об Арендодателях, соблюдая при этом
                Правила публикации отзывов.<br></br>
                2.4. Регистрация и создание на Портале Личного кабинета
                Пользователя, а также предоставление доступа Пользователя ко
                всем разделам Портала осуществляется бесплатно.<br></br>
                2.5. Администрация Портала не является стороной электронной
                сделки между Пользователем и Арендодателем, предметом которой
                выступает передача в аренду Имущества, предлагаемого
                Арендодателями на Портале. Все сделки между Арендодателями и
                Пользователями заключаются напрямую. Администрация Портала не
                является участником таких соглашений, а лишь предоставляет
                коммуникационную площадку для размещения объявлений и другой
                рекламной информации. Администрация Портала не несет
                ответственности за содержание передаваемой или получаемой
                информации и за ущерб, причиненный в результате использования
                Пользователями результатов Сервисов Портала.<br></br>
                2.6. Платные услуги предоставляются Порталом Арендодателям на
                условиях Договора-оферты о предоставлении услуг.<br></br>
              </p>
              <h3>3. ПРАВА И ОБЯЗАННОСТИ АДМИНИСТРАЦИИ ПОРТАЛА </h3>
              <p className="footer_pages_main_p">
                3.1. Обязанности Администрации Портала заключаются исключительно
                в обеспечении возможности получения Пользователем Сервисов в
                порядке, определенном этим Соглашением.<br></br>
                3.2. Администрация Портала оставляет за собой право по
                собственному усмотрению изменять или удалять любую информацию,
                которая публикуется Пользователями на Портале, приостанавливать,
                ограничивать или прекращать доступ Пользователя к Сервисам
                Портала в любое время и без объяснения причин.<br></br>
                3.3. Администрация Портала вправе устанавливать какие-либо
                ограничения в использовании Сервисов Пользователями.<br></br>
                3.4. Администрация Портала вправе изменять условия настоящего
                Соглашения. Информация о таких изменениях публикуется
                Администрацией на Портале и/или в информационной рассылке.
                <br></br>
                3.5. Администрация Портала вправе размещать рекламную и/или
                другую информацию в любом разделе Портала без согласования с
                Пользователем.<br></br>
                3.6. В случае нарушения Пользователем условий настоящего
                Соглашения (вместе с его неотъемлемыми частями), Администрация
                Портала имеет право приостановить, ограничить или прекратить
                доступ такого Пользователя к любому из Сервисов в одностороннем
                порядке в любое время. При этом Портал не несет ответственности
                за любой ущерб, который может быть нанесен Пользователю такими
                действиями.<br></br>
                3.7. Администрация Портала имеет право осуществлять рассылки
                Пользователям сообщений (коммерческих предложений), в том числе
                электронных сообщений на адреса предоставленной Пользователем
                электронной почты, телефонных SMS сообщений или сообщений
                посредствам мессенджеров Viber, WhatsAPP, Telegram на
                предоставленные Пользователем номера его мобильных телефонов,
                содержащие организационно-техническую, информационную,
                маркетинговую или другую информацию о возможностях Сервисов на
                Портале, деятельности Администрации Портала или его партнеров.
                Пользователь в любой момент может отказаться от дальнейшего
                получения таких сообщений в разделе Уведомления на Портале.
                <br></br>
                3.8. Администрация Портала обязуется не использовать данные
                Пользователя, полученные при регистрации в целях, не
                предусмотренных этим Соглашением и приложениями к нему, и
                гарантирует неразглашение этих данных, кроме случаев, когда
                раскрытие такой информации является обязанностью Портала в силу
                законодательства Республики Беларусь.<br></br>
                3.9. Администрация Портала обязуется предоставлять Пользователю
                возможность получения консультаций службы поддержки в случае
                указания Пользователем идентификационных данных. Объем
                консультаций ограничивается конкретными вопросами, связанными с
                предоставлением Сервисов. Администрация Портала может по своему
                усмотрению требовать от Пользователя оформления запроса в службу
                поддержки по электронной почте с адреса, указанного
                Пользователем при регистрации и/или указанного в его Личном
                кабинете.<br></br>
                3.11. Администрация Портала оставляет за собой право
                осуществлять модерацию информации и удалять с Портала и из
                собственных серверов любую информацию или материалы, которые, по
                ее мнению, являются неприемлемыми, незаконными, недостоверными,
                дискриминационными, нарушающими этические, гуманистические,
                моральные нормы, пренебрегают правилами приличия, и т.п. или
                нарушают настоящее Соглашение.<br></br>
              </p>
              <h3>4. ПРАВА И ОБЯЗАННОСТИ АДМИНИСТРАЦИИ ПОЛЬЗОВАТЕЛЯ </h3>
              <p className="footer_pages_main_p">
                4.1. Во время регистрации на Портале Пользователь должен
                предоставить правдивую, точную и полную информацию о себе по
                вопросам, которые предлагаются в форме для регистрации и в
                формах разделов Портала и поддерживать эту информацию в
                актуальном состоянии, которое соответствует действительности.
                <br></br>
                4.2. В случае предоставления недостоверной или неполной
                информации, Администрация Портала имеет право приостановить или
                отменить регистрацию Пользователя и прекратить предоставление
                ему Сервисов.<br></br>
                4.3. Пользователь обязуется использовать Портал только в
                законных целях, соблюдать действующее законодательство
                Республики Беларусь, а также права и законные интересы
                Администрации Портала, Арендодателей и иных Пользователей. Не
                допускается размещение Пользователем на Портале сообщений и
                материалов, содержащих информацию, распространение которой
                запрещено законодательством Республики Беларусь.<br></br>
                4.4. Пользователь не имеет права совершать действия, которые
                влияют на нормальную работу Портала и является его
                недобросовестным использованием.<br></br>
                4.5. Пользователь обязуется не осуществлять действий,
                направленных на получение доступа к чужому Личному кабинету,
                путем подбора логина и пароля, взлома или иных действий.
                <br></br>
                4.6. Пользователь не имеет права передавать, уступать,
                продавать, передавать в пользование и т.п. свои логин и пароль
                для доступа к Порталу и Сервисам, третьим лицам без согласия
                Администрации Портала. В случае передачи логина и пароля или
                прав на Личный кабинет третьему лицу, всю ответственность за
                действия такого третьего лица после этого несет Пользователь.
                <br></br>
                4.7. В случае нарушения безопасности или несанкционированного
                использования Личного кабинета Пользователя, он должен
                немедленно сообщить об этом Администрации Портала. Администрация
                Портала не несет ответственности за любые убытки, вызванные
                несанкционированным использованием Личного кабинета
                Пользователя.<br></br>
                4.8. Пользователь обязуется не использовать самостоятельно или с
                привлечением третьих лиц возможности Портала в целях, которые
                могут быть квалифицированы как нарушение прав третьих лиц на
                объекты интеллектуальной собственности, недобросовестная
                конкуренция, иное нарушение действующего законодательства
                Республики Беларусь.<br></br>
                4.9. Пользователь Портала имеет право в любое время расторгнуть
                в одностороннем порядке Пользовательское соглашение путем отказа
                от использования Сервисов.<br></br>
              </p>
              <h3>5. РАЗГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ </h3>
              <p className="footer_pages_main_p">
                5.1. Администрация Портала не осуществляет обязательную проверку
                информации и Контента (в том числе в Объявлениях), которая
                размещается Арендодателями на Портале и не несет ответственности
                за соответствие такой информации действующему законодательству
                Республики Беларусь.<br></br>
                5.2. Администрация Портала не несет ответственности за ошибки,
                неточности, упущения, которые были допущены при регистрации или
                размещении информации как Арендодателем, так и Пользователем
                Портала, а также любые материальные или нематериальные убытки,
                возникшие в связи с этим (включая упущенную выгоду).<br></br>
                5.5. Администрация Портала не несет ответственности за
                использование (как правомерное, так и неправомерное) третьими
                лицами информации, размещенной на Портале, включая ее
                воспроизведение и распространение, осуществленные как в рамках
                Портала, так и другими возможными способами.<br></br>
                5.6. Администрация Портала оставляет за собой право в
                одностороннем порядке удалять информацию размещенную
                Пользователями по требованию от правообладателей или
                компетентных государственных органов, а также в случае, если
                размещенная информация нарушает права (в т.ч. права
                интеллектуальной собственности) третьих лиц или не соответствует
                по мнению Администрации Портала принципам общественной морали.
                <br></br>
                5.7. Вся размещенная Арендодателям на Портале информация
                считается собственностью Арендодателя, который ее разместил, до
                тех пор, пока не будет оснований считать иначе. Всю
                ответственность за соответствие такой информации (Контента)
                несут такие Арендодатели.<br></br>
                5.8. Администрация Портала не несет ответственности за любые
                ошибки, упущения, прерывания, дефекты и задержки в обработке или
                передаче данных, сбои в линиях связи, уничтожения любого
                оборудования, неправомерный доступ третьих лиц к Порталу,
                ставших причиной ограничения доступа Пользователя к Сервисам.
                Администрация Портала не несет ответственности за любые
                технические сбои или иные проблемы любых телефонных сетей или
                служб, компьютерных систем, серверов или провайдеров,
                компьютерного или телефонного оборудования, программного
                обеспечения, сбоев сервисов электронной почты или скриптов по
                техническим причинам, за нормальное функционирование и
                доступность отдельных сегментов сети Интернет и сетей операторов
                электросвязи, задействованных при осуществлении доступа
                Пользователя к Сервисам.<br></br>
                5.9. Услуги на Портале предоставляются «как есть». Администрация
                Портала не гарантирует безусловного сохранения Учетной записи
                Пользователя и размещенной Пользователем информации на Портале.
                <br></br>
                5.10. Администрация Портала не несет ответственности за
                соответствие Сервиса целиком или его частей ожиданиям
                Пользователя, безошибочное и бесперебойное предоставление
                Сервисов, прекращение доступа Пользователя к Сервисам, а также
                за сохранность логина и пароля Пользователя, обеспечивающие
                доступ к Сервисам, по причинам, связанным с техническими сбоями
                аппаратного или программного обеспечения Портала, и не возмещает
                Пользователю любые связанные с этим убытки.<br></br>
                5.11. При нарушении Пользователями условий настоящего Соглашения
                Администрация Портала оставляет за собой право ограничить доступ
                Пользователя к Сервисам Портала на временной основе, а в случае
                грубого и/или неоднократного нарушения условий настоящего
                Соглашения – отказать в доступе к Сервисам и в предоставлении
                услуг на постоянной основе.<br></br>
                5.12. Администрация Портала не несет ответственности перед
                Пользователем за ограничение доступа к Сервисам, за прекращение
                доступа к Сервисам, если эти ограничения и прекращения возникли
                вследствие обстоятельств непреодолимой силы, возникших после
                заключения настоящего Соглашения и на наступление которых
                Стороны не могли повлиять, включая, но не ограничиваясь,
                следующим: война, мятежи, забастовки, саботаж, эмбарго, пожары,
                наводнения, стихийные бедствия, ухудшение радиоэлектронной или
                радиологической обстановки, взрывы, действия или бездействие
                правительства Республики Беларусь или другой страны, акты
                государственных органов и/или органов местного самоуправления,
                внесение изменений в законодательство Республики Беларусь,
                аварии на сетях общего пользования, изменения условий доступа к
                линейно-кабельным средствам связи и прочее.<br></br>
                5.13. Администрация Портала не несет ответственности перед
                Пользователем или любыми третьими лицами за любые прямые и/или
                косвенные убытки, включая упущенную выгоду или потерянные
                данные, вред чести, достоинству или деловой репутации,
                понесенные в связи с использованием им Сервисов, или
                невозможности его использования или несанкционированного доступа
                к коммуникациям Пользователя третьих лиц.<br></br>
                5.14. Администрация Портала не несет ответственности за любые
                убытки электронным устройствам Пользователя или иного лица,
                любого другого оборудования или программного обеспечения,
                вызванные или связанные с использованием Пользователем Сервисов.
                <br></br>
                5.15. Администрация Портала не несет ответственности перед
                Пользователями или другими третьими лицами за:<br></br>
                - содержание и законность, достоверность и полноту информации на
                Портале;<br></br>
                - качество товаров/услуг, представляемых Арендодателями;
                <br></br>
                - соответствие товаров/услуг, приобретенных с помощью Портала;
                <br></br>
                - выполнение Арендодателями и Пользователями своих обязательств;
                <br></br>
                5.16. Администрация Портала ни при каких обстоятельствах не
                будет нести ответственность за любой ущерб или убытки, прямо или
                косвенно возникшие у Пользователей или в результате деятельности
                Арендодателей на Портале.
              </p>
              <h3>6. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ </h3>
              <p className="footer_pages_main_p">
                6.1. Совокупность программ, данных, торговых марок, объектов
                авторского права, и других объектов, используемых на Портале при
                предоставлении Сервисов, является интеллектуальной
                собственностью его законных правообладателей и охраняется
                законодательством об интеллектуальной собственности Республики
                Беларусь, а также соответствующими международными договорами и
                конвенциями. Любое использование элементов, символики, текстов,
                графических изображений, программ и других объектов, входящих в
                состав Сервиса и принадлежащих Администрации Портала, кроме
                разрешенного в настоящем Соглашении, без разрешения
                Администрации Портала или иного законного правообладателя
                является незаконным и может стать причиной судебного
                разбирательства и привлечения нарушителей к гражданско-правовой,
                административной и уголовной ответственности в соответствии с
                законодательством Республики Беларусь.
              </p>
              <h3>7. ПЛАТНЫЕ УСЛУГИ </h3>
              <p className="footer_pages_main_p">
                7.1. Услуги доступа, рекламные услуги и дополнительные услуги
                предоставляются на условиях Договора-оферты о предоставлении
                услуг.<br></br>
                7.2. Администрация Портала имеет право предоставлять услуги на
                специальных условиях, во время проведения акций, информация о
                которых размещается на Портале.<br></br>
              </p>
              <h3>8. ПОРЯДОК ВНЕСЕНИЯ ИЗМЕНЕНИЙ И ДОПОЛНЕНИЙ В СОГЛАШЕНИЕ </h3>
              <p className="footer_pages_main_p">
                8.1. Изменения и/или дополнения в Соглашение вносятся в
                одностороннем порядке по решению Администрации Портала. Датой
                вступления в силу изменений и/или дополнений к настоящему
                Соглашению является дата размещения таких изменений и/или
                дополнений или новой редакции настоящего Соглашения на Портале.
                <br></br>
                8.2. Текст изменений и/или дополнений к Соглашению либо его
                новая редакция доводится Администрацией Портала до всеобщего
                сведения путем размещения соответствующей информации на Портале.
                <br></br>
                8.3. В случае несогласия Пользователя с внесенными изменениями
                и/или дополнениями к настоящему Соглашению, Пользователь имеет
                право расторгнуть это Соглашение путем уведомления Администрации
                Портала о несогласии с внесенными изменениями и/или дополнениями
                либо о неприсоединении к новой редакции Соглашения или об отказе
                соблюдать его условия.<br></br>
                8.4. Стороны договариваются, что молчание (отсутствие письменных
                уведомлений о расторжении Соглашения либо о несогласии с
                отдельными положениями Соглашения, в том числе с изменением
                тарифов) в соответствии с п. 3 ст. 159 Гражданского кодекса
                Республики Беларусь признается согласием и присоединением
                Стороны к новой редакции Соглашения.
              </p>
              <h3>9. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ </h3>
              <p className="footer_pages_main_p">
                9.1. Настоящее Соглашение и отношения между Администрацией
                Портала и Пользователем регулируются и толкуются в соответствии
                с законодательством Республики Беларусь. Вопросы, не
                урегулированные Соглашением, подлежат разрешению в соответствии
                с законодательством Республики Беларусь.<br></br>
                9.2. Если по тем или иным причинам какие-либо из условий
                настоящего Соглашения являются недействительными или не имеющими
                юридической силы, это не оказывает влияния на действительность
                или применимость остальных условий Соглашения.<br></br>
                9.3. Настоящее Соглашение в отношении каждого из Пользователей
                вступает в силу с момента совершения Пользователем действий,
                указанных в пункте 1.3. настоящего Соглашения.<br></br>
                9.4. В соответствии с п. 3 ст. 404 Гражданского кодекса
                Республики Беларусь настоящее Соглашение будет считаться
                заключенным в письменной форме.<br></br>
                9.5. Пользователь и Администрация Портала соглашаются, что все
                споры и разногласия, которые могут возникнуть из настоящего
                Соглашения или в связи с ним, будут разрешаться с обязательным
                соблюдением досудебного претензионного порядка разрешения
                споров. Претензия Пользователя в отношении предоставляемых
                Администрацией Портала услуг принимается к рассмотрению при
                условии, что она составлена в письменной форме и направлена по
                юридическому адресу Администрации Портала заказной
                корреспонденцией с обратным уведомлением либо вручена под
                роспись.<br></br>
                9.6. В случае, если согласие не будет достигнуто, все споры по
                поводу исполнения настоящего Соглашения разрешаются в судебном
                порядке в соответствии с действующим законодательством
                Республики Беларусь по месту нахождения Администрации Портала.
              </p>
              <h3>10. РЕКВИЗИТЫ АДМИНИСТРАЦИИ ПОРТАЛА </h3>
              <p className="footer_pages_main_p">
                Индивидуальный предприниматель Клементьева Ольга Анатольевна
                <br></br>
                Адрес: Республика Беларусь, Минский район, аг. Вишневка, ул.
                Школьная, д. 12А<br></br>
                223044<br></br>
                УНП 692190483<br></br>
                тел. +375445860988<br></br>
                Telegram: @razdelisdrugim
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UsersAgreement;
