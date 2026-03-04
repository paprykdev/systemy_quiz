import { useState, useEffect, useCallback } from 'react';

const questions = [
    {
        id: 1,
        question:
            'Wskaż prawidłowe stwierdzenia dotyczące klasyfikacji zasobów:',
        options: [
            'Czas pracy procesora jest zasobem nieodzyskiwalnym.',
            'Procesor jest zasobem wywłaszczalnym.',
            'Fragment pamięci operacyjnej może być zasobem współdzielonym.',
            'Pamięć operacyjna jest zasobem odzyskiwalnym.',
            'Urządzenie wejścia/wyjścia może być zasobem wyłącznym.',
        ],
        correct: [0, 1, 2, 3, 4],
    },
    {
        id: 2,
        question:
            'Dostęp do terminala tekstowego współczesnych systemów uniksopodobnych można uzyskać na wiele sposobów.',
        options: [
            'Użytkownik lokalny może skorzystać z emulatora terminala tekstowego.',
            'Użytkownik korzystający z systemu Windows nie może się połączyć zdalnie z maszyną działającą pod kontrolą systemu uniksopodobnego.',
            'Użytkownik zdalny może uzyskać dostęp do pseudoterminala za pośrednictwem protokołu SSH.',
            'Użytkownik korzystający z dystrybucji Ubuntu może uzyskać dostęp do wirtualnego terminala zdalnej maszyny za pomocą programu PuTTY.exe',
            'Użytkownik lokalny może skorzystać z wirtualnych terminali.',
        ],
        correct: [0, 2, 4],
    },
    {
        id: 3,
        question:
            'Załóżmy, że użytkownik ma prawo wykonania pliku skrypt.sh, znajdującego się w bieżącym katalogu roboczym. Które polecenia są równoważne, w konsekwencjach, poleceniu ./skrypt.sh?',
        options: [
            'run skrypt.sh',
            'bash skrypt.sh',
            '/bin/bash skrypt.sh',
            '.. skrypt.sh',
            '. skrypt.sh',
        ],
        correct: [1, 2],
    },
    {
        id: 4,
        question: 'Zaznacz prawidłowe stwierdzenia.',
        options: [
            'Poznanie fizycznej lokalizacji n-tego bajtu pliku jest zawsze trudniejsze (bardziej czasochłonne) w dostępie swobodnym niż w sekwencyjnym.',
            'Dostęp indeksowy do plików ma sens implementacyjny tylko wtedy, gdy możliwy jest dostęp swobodny do pliku.',
            'Dostęp sekwencyjny do pliku może wynikać z ograniczeń stosowanego systemu plików, a niekoniecznie z ograniczeń sprzętowych.',
            'Jedną z podstawowych operacji możliwych do wykonania w dostępie sekwencyjnym jest odczyt poprzedniego rekordu.',
            'Organizacja fizyczna i logiczna systemu plików, umożliwiająca dostęp swobodny do danych zapisanych w pliku, jest możliwa tylko w przypadku małych plików.',
        ],
        correct: [1, 2],
    },
    {
        id: 5,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące semaforów i monitorów.',
        options: [
            'Semafory pozwalają rozwiązać problem sekcji krytycznej z wykorzystaniem aktywnego czekania (a dokładniej algorytmu Petersona)',
            'Inna nazwa semafora, który może przyjmować wyłącznie wartości 0 i 1, to mutex.',
            'Jeśli w chwili zwolnienia zasobu krytycznego istnieje wiele procesów wstrzymanych z powodu oczekiwania na jego zwolnienie, to do sekcji krytycznej wejdzie zawsze ten proces, który został wstrzymany jako pierwszy.',
            'Rozwiązanie problemu pięciu filozofów wymaga zastosowania monitorów.',
            'Semafory i monitory dostępne są wyłącznie z poziomu pakietu BACI.',
        ],
        correct: [1],
    },
    {
        id: 6,
        question:
            'Zaznacz prawdziwe stwierdzenia dotyczące przełączania kontekstu:',
        options: [
            'Za każdym razem, gdy dochodzi do przerwania zegarowego, system operacyjny może podjąć decyzję o zmianie wykonywanego procesu.',
            'Wszystkie rejestry procesora stanowią element kontekstu procesu.',
            'Przełączenie kontekstu polega na zapamiętaniu stanu wykonywanego procesu i załadowaniu stanu procesu, który ma być odtąd kontynuowany na procesorze.',
            'Przełączenie kontekstu następuje zawsze na wyraźne żądanie procesu (proces rezygnuje z procesora).',
            'Przełączanie kontekstu nie wymaga dodatkowego czasu pracy procesora, ponieważ dzieje się w tle.',
        ],
        correct: [0, 2],
    },
    {
        id: 7,
        question: 'Zaznacz prawdziwe stwierdzenia dotyczące planistów:',
        options: [
            'Planista długoterminowy odgrywa kluczową rolę w systemach interaktywnych.',
            'Planista krótkoterminowy odgrywa kluczową rolę w systemach interaktywnych.',
            'Planista krótkoterminowy jest odpowiedziany za wybór procesu, który będzie się wykonywał na procesorze w najbliższym kwancie czasu.',
            'Planista średnioterminowy ustala kolejność, w jakiej procesy będą przydzielane do procesora przez planistę krótkoterminowego.',
            'Planista długoterminowy odpowiada za proces ładowania nowych procesów do pamięci.',
        ],
        correct: [1, 2, 4],
    },
    {
        id: 8,
        question:
            'Wśród zasobów, którymi zarządza system operacyjny, można wymienić:',
        options: [
            'informacje udostępniane programom w postaci plików,',
            'procesor (czas procesora),',
            'urządzenia wejścia/wyjścia,',
            'czas pracy użytkowników.',
            'pamięć operacyjną,',
        ],
        correct: [0, 1, 2, 4],
    },
    {
        id: 9,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące przydziału bloków do plików na dysku.',
        options: [
            'Zastosowanie metody przydziału ciągłego zmniejsza fragmentację wewnętrzną, ale powoduje zwiększenie fragmentacji zewnętrznej.',
            'Jeśli blok dysku ma rozmiar 1kB, dysk ma pojemność 2GB, a numer bloku zajmuje całkowitą liczbę bajtów, to tablica FAT zajmie w pamięci około 6MB.',
            'W systemach listowych, wpis w katalogu zawiera, co do zasady, listę wszystkich bloków przechowujących kolejne części zawartości pliku.',
            'Zastosowanie metody przydziału łańcuchowego znacząco utrudnia realizację dostępu bezpośredniego.',
            'Maksymalny rozmiar pliku w systemie FAT wynosi 4GB.',
        ],
        correct: [1, 3, 4],
    },
    {
        id: 10,
        question:
            'Zaznacz prawdziwe stwierdzenia dotyczące ogólnej koncepcji zarządzania pamięcią operacyjną.',
        options: [
            'Za przekształcenie adresu logicznego w fizyczny odpowiada jednostka MMU.',
            'Mechanizmy ochrony pamięci operacyjnej powinny być implementowane na poziomie sprzętowym.',
            'Translacja to proces przekształcenia adresu fizycznego na logiczny.',
            'We współczesnych komputerach wieloprogramowych, procesy (i procesor) posługują się adresami logicznymi, a nie fizycznymi.',
            'Zasada okna polega na tym, że pamięć wolniejsza przechowuje podzbiór informacji przechowywanych w pamięci bliżej procesora.',
        ],
        correct: [0, 1, 3],
    },
    {
        id: 11,
        question: 'Brak wprowadzenia. (Pytanie o powłokę)',
        options: [
            'Powłoka może udostępniać własne polecenia (tzw. polecenia wbudowane).',
            'Jeden użytkownik może w danej chwili mieć otwartą wyłącznie jedną sesję powłoki.',
            'Powłoka tekstowa to program przetwarzający polecenia zapisane w formie tekstowej.',
            'Słowa \„powłoka" i \„terminal" mogą być używane zamiennie.',
            'Powłoka jest integralną częścią jądra systemu operacyjnego (jądra narzuca użytkownikowi, jakiej powłoki musi używać).',
        ],
        correct: [0, 2],
    },
    {
        id: 12,
        question:
            'Wskaż prawidłowe stwierdzenia dotyczące realizacji operacji wejścia/wyjścia:',
        options: [
            'Sterowniki są zawsze wbudowane w jądro systemu operacyjnego.',
            'Urządzenie wejścia/wyjścia (kontroler) może wygenerować przerwanie, gdy zakończy wykonywanie żądanej operacji.',
            'Jednym ze sposobów realizacji operacji wejścia/wyjścia jest aktywne oczekiwanie.',
            'Sterownik to program, który pośredniczy pomiędzy systemem operacyjnym a kontrolerem urządzenia w wykonywaniu operacji wejścia/wyjścia.',
            'Niektóre operacje wejścia/wyjścia realizowane pomiędzy urządzeniami nie wymagają pośrednictwa procesora.',
        ],
        correct: [1, 2, 3, 4],
    },
    {
        id: 13,
        question: 'System operacyjny można zdefiniować jako:',
        options: [
            'powłokę tekstową przyjmującą od użytkownika polecenia w postaci sekwencji znaków.',
            'sterownik dla procesora.',
            'zbiór procedur pozwalających grupie osób na współdzielenie komputera.',
            'zbiór programów pośredniczących między sprzętem a użytkownikiem, dający użytkownikom środki dla projektowania, kodowania uruchamiania i eksploatacji programów, równocześnie zarządzający przydziałem zasobów w celu zapewnienia efektywnego działania komputera.',
            'zestaw programów kluczowych dla zarządzania komputerem (jądro systemu) oraz programów systemowych dostarczanych wraz z jądrem.',
        ],
        correct: [2, 3, 4],
    },
    {
        id: 14,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące zachowania integralności systemu plików.',
        options: [
            'Potencjalne problemy z integralnością są zwykle powiązane z awariami sprzętowymi, które uniemożliwiają przeniesienie zawartości pamięci podręcznej na dysk.',
            'Jednym z potencjalnych problemów z integralnością systemu plików jest wielokrotne pojawienie się bloku w wykazie bloków wolnych.',
            'Integralność systemu plików może być monitorowana wyłącznie w systemach plików z przydziałem indeksowym.',
            'Aby sprawdzić integralność systemu plików, konieczne jest ręczne uruchomienie odpowiedniej procedury systemu operacyjnego.',
            'Przywrócenie integralności systemu plików jest równoważne przywróceniu prawidłowej zawartości wszystkich plików.',
        ],
        correct: [0, 1],
    },
    {
        id: 15,
        question: 'Wskaż prawidłowe stwierdzenia dotyczące magistral:',
        options: [
            'We współczesnych systemach komputerowych stosuje się magistrale wielordzeniowe, każda z własną pamięcią podręczną.',
            'We współczesnych komputerach wszystkie komponenty (w tym urządzenia wejścia/wyjścia) współdzielą jedną magistralę.',
            'Kontroler (np. kontrolera ATA) umieszczony jest między magistralą a urządzeniem wejścia/wyjścia. Zadaniem kontrolera jest udostępnienie systemowi operacyjnemu interfejsu do obsługi urządzenia.',
            'Magistrala jest pojęciem abstrakcyjnym (programowym) i jest implementowana na poziomie systemu operacyjnego.',
            'Magistrala łącząca różne komponenty komputera składa się zwykle z kilku równoległych kanałów komunikacji o różnym przeznaczeniu.',
        ],
        correct: [2, 4],
    },
    {
        id: 16,
        question:
            'Załóżmy, że komputer nie jest wyposażony w jednostkę MMU, a ochrona pamięci nie musi być realizowana. W jaki sposób można zapewnić prawidłowe odwołania do adresów fizycznych w ramach procesu?',
        options: [
            'Jeśli z góry wiadomo, w którym miejscu pamięci zostanie umieszczony proces, można wygenerować odpowiednie adresy fizyczne na etapie tworzenia programu.',
            'Nie jest to możliwe. Jednostka MMU jest zawsze niezbędna.',
            'Rozwiązanie problemu, który zdefiniowano w treści zadania, jest konieczne przy projektowaniu urządzeń z systemami wbudowanymi (np. piekarnik).',
            'Adresy logiczne mogłyby być przekształcane w adresy fizyczne automatycznie, w czasie ładowania programu do pamięci.',
            'Przemieszczenie obrazu procesu w pamięci, niezależnie od zastosowanego rozwiązania, jest niemożliwe. Proces, który został umieszczony w pamięci musi pozostać w przydzielonym miejscu już na zawsze.',
        ],
        correct: [0, 2, 3],
    },
    {
        id: 17,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące implementacji katalogów w systemach plików.',
        options: [
            'W przypadku listowego systemu plików, wpis w katalogu zawiera numer pierwszego bloku przechowującego zawartość pliku.',
            'Ze względu na budowę dysku, jedyną metodą poszukiwania elementu wewnątrz katalogu jest przeszukiwanie liniowe.',
            'Co do zasady, dotarcie do i-węzła opisującego plik wymaga przejścia przez i-węzły opisujące wszystkie katalogi pośrednie, włącznie z i-węzłem opisującym katalog główny.',
            'Nie istnieje metoda pozwalająca na stosowanie nazw plików o dowolnej długości – nazwa pliku jest zawsze przechowywana jako część wpisu o stałej długości.',
            'W systemie plików V7 systemu UNIX, nazwa pliku może się składać z bazowej nazwy pliku o rozmiarze 1-8 znaków i opcjonalnie rozszerzenia składającego się z 1-3 znaków.',
        ],
        correct: [0, 2],
    },
    {
        id: 18,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące mechanizmu stronicowania:',
        options: [
            'Tablice stron są zawsze tak małe, że mieszczą się w pojedynczej ramce.',
            'W stronicowaniu dopuszcza się niewielką fragmentację wewnętrzną, ograniczoną z góry przez rozmiar pojedynczej ramki.',
            'W stronicowaniu, pamięć dzielona jest na ramki, a każdemu procesowi przydzielana jest ramka o rozmiarze odpowiadającym jego zapotrzebowaniu.',
            'Przekształcenie adresu logicznego na fizyczny, przy zastosowaniu stronicowania, wymaga zawsze dokładnie tyle samo czasu co w przypadku metody stałego podziału pamięci.',
            'Zastosowanie hierarchicznych tablic stron pozwala zaadresować więcej stron przy zastosowaniu takiej samej liczby bitów na numer strony.',
        ],
        correct: [1],
    },
    {
        id: 19,
        question:
            'Rozważmy sposoby przekazywania sygnałów do uruchomionych procesów.',
        options: [
            'Sygnały są przekazywane za pośrednictwem łącz nienazwanych.',
            'Wciśnięcie kombinacji klawiszy Ctrl+C pozwala przesłać pierwszoplanowemu procesowi sygnał SIGINT.',
            'Sygnał do procesu może zostać wysłany przez system operacyjny lub inny proces.',
            'Proces ma prawo zignorować niektóre sygnały.',
            'Liczba różnych sygnałów, które można przesłać do procesu, wynosi 3 (SIGINT, SIGKILL lub SIGTSTP).',
        ],
        correct: [1, 2, 3],
    },
    {
        id: 20,
        question: 'Zaznacz prawdziwe stwierdzenia dotyczące wątków:',
        options: [
            'Wątki mogą być realizowane na poziomie jądra systemu operacyjnego albo użytkownika.',
            'Przełączenie kontekstu między wątkami realizowanymi na poziomie użytkownika wymaga pośrednictwa systemu operacyjnego.',
            'Niektóre procesory wspierają szybsze wykonywanie procesów wielowątkowych.',
            'W systemach z rodziny Windows wątki realizowane na poziomie użytkownika określa się mianem żyłki.',
            'Przełączanie kontekstu pomiędzy wątkami jest o wiele szybsze niż pomiędzy procesami ciężkimi.',
        ],
        correct: [0, 2, 4],
    },
    {
        id: 21,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące śledzenia wolnych bloków na dysku. Przyjmij, że wielkość bloku jest zawsze wyrażona jako potęga dwójki (w bajtach).',
        options: [
            'W przypadku dysku, który co do zasady jest prawie pełny, wykorzystanie metody mapy bitowej wymaga mniej pamięci niż wykorzystanie metody listy jednokierunkowej.',
            'Zwiększenie jednostka alokacji (bloku) powoduje zwiększenie fragmentacji wewnętrznej.',
            'W metodzie zliczania przechowuje się listę krotek złożonych z dwóch wartości: indeks pierwszego wolnego bloku i liczba wolnych bloków znajdujących się bezpośrednio za nim.',
            'Zmniejszenie jednostki alokacji (bloku) nie wpływa na szybkość odczytu pliku z dysku, o ile plik jest wystarczająco mały.',
            'Przy zastosowaniu jednokierunkowej listy wolnych bloków dyskowych, każdy wolny blok wskazuje na inny wolny blok na dysku.',
        ],
        correct: [1, 2, 3],
    },
    {
        id: 22,
        question:
            'Rozważmy poniższy wynik działania polecenia ls: --wxrw-r-- 1 jan osoby 11 Jul 30 18:17 sop',
        options: [
            'Użytkownik jan jest z pewnością superużytkownikiem systemu.',
            'Użytkownik azor będący członkiem grupy zwierzęta ma prawo do usunięcia elementu sop.',
            'Użytkownik adam będący członkiem grupy osoby ma prawo modyfikacji elementu sop.',
            'Użytkownik jan będący członkiem grupy osoby może skopiować element sop.',
            'Użytkownik jan będący członkiem grupy osoby ma prawo odczytu elementu sop.',
        ],
        correct: [2],
    },
    {
        id: 23,
        question:
            'Rozważmy procedurę tworzenia procesów w systemach uniksopodobnych.',
        options: [
            'Pierwszym etapem utworzenia procesu potomnego jest utworzenie kopii procesu tworzącego (rozdwojenie).',
            'Proces potomny zna identyfikator (PID) swojego jedynego procesu macierzystego.',
            'Funkcja systemowa fork zwraca różne wartości w ramach procesu tworzącego i procesu tworzonego.',
            'Proces może zostać utworzony wyłącznie przez inny proces.',
            'Możliwe jest, aby proces macierzysty zakończył swoje działanie przed końcem działania procesu potomnego.',
        ],
        correct: [0, 1, 2, 3, 4],
    },
    {
        id: 24,
        question: 'System operacyjny:',
        options: [
            'umożliwia programom wykonywanym na komputerze dostęp do sprzętu za pośrednictwem wywołań systemowych, ukrywając tym samym szczegóły techniczne dotyczące sprzętu.',
            'zarządza procesem ładowania i uruchamiania programów oraz komunikacją między uruchomionymi programami (procesami).',
            'powinien dostarczać użytkownikom graficzne aplikacje ogólnego przeznaczenia, np. edytor tekstu czy kalkulator.',
            'przydziela wykonywanym programom zasoby tak, aby nie dopuścić do zakleszczeń.',
            'nadzoruje przesyłanie danych między jednostką centralną a urządzeniami, a także przeciwdziała błędom użytkowników i programistów.',
        ],
        correct: [0, 1, 3, 4],
    },
    {
        id: 25,
        question:
            'Wskaż prawdziwe zdania dotyczące komputera jako urządzenia zbudowanego z komponentów.',
        options: [
            'Współczesne komputery wykorzystują wiele magistral do wymiany informacji między komponentami.',
            'Karta graficzna może być wyposażona we własną jednostkę obliczeniową (procesor).',
            'Obowiązkowym komponentem komputera jest nośnik pamięci trwałej (np. dysk SSD).',
            'Współczesny procesor wykonuje obliczenia dzięki miniaturowym elementom mechanicznym zasilanym energią elektryczną.',
            'Komputer do prawidłowego działania wymaga klawiatury.',
        ],
        correct: [0, 1],
    },
    {
        id: 26,
        question: 'Wskaż prawdziwe stwierdzenia dotyczące stanów procesów.',
        options: [
            'Proces może przejść bezpośrednio ze stanu zakończony do stanu oczekujący.',
            'Proces może przejść bezpośrednio ze stanu wykonywany do stanu gotowy.',
            'Proces może przejść bezpośrednio ze stanu gotowy do stanu zakończony.',
            'Proces może przejść bezpośrednio ze stanu nowy do stanu oczekujący.',
            'Proces może przejść bezpośrednio ze stanu oczekujący do stanu gotowy.',
        ],
        correct: [1, 4],
    },
    {
        id: 27,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące logicznej i fizycznej struktury pliku.',
        options: [
            'Logiczna struktura pliku musi być tak zaprojektowana, aby w każdym momencie istnienia wielkość pliku w bajtach była wielokrotnością rozmiaru sektora.',
            'Zawartość każdego pliku rozpoczyna się od tzw. liczby magicznej.',
            'W systemach uniksopodobnych, rozszerzenie pliku determinuje dopuszczalną strukturę logiczną pliku.',
            'Co do zasady, każdy plik zajmuje co najmniej jeden sektor na dysku.',
            'Jednostka logiczna pliku (np. nagłówek, rekord) odpowiada zawsze dokładnie jednej jednostce fizycznej (np. sektorowi na dysku) i odwrotnie.',
        ],
        correct: [3],
    },
    {
        id: 28,
        question:
            'W systemach uniksopodobnych, proces może przekazać innemu procesowi informacje za pośrednictwem:',
        options: [
            'programu powłoki.',
            'łącza.',
            'przerwan zewnętrznych.',
            'współdzielonego obszaru pamięci operacyjnej.',
            'sygnałów.',
        ],
        correct: [1, 3, 4],
    },
    {
        id: 29,
        question:
            'W wywłaszczeniowym trybie decyzji o przydziale procesów do procesora, do wywłaszczenia wykonywanego procesu może dojść, gdy:',
        options: [
            'priorytet wykonywanego procesu się zwiększy.',
            'inny wstrzymany uprzednio proces zostanie wznowiony (przeniesiony do stanu gotowego).',
            'w systemie pojawi się nowy proces.',
            'zrealizowana zostanie procedura obsługi przerwania.',
            'priorytet innego procesu zmaleje.',
        ],
        correct: [1, 2, 3],
    },
    {
        id: 30,
        question: 'Wskaż prawdziwe zdania dotyczące statusu wyjścia:',
        options: [
            'Status wyjścia przekazywany jest przez kończący się proces do systemu operacyjnego.',
            'Statusy wyjścia są brane pod uwagę przy warunkowym wykonywaniu poleceń połączonych operatorami && i ||.',
            'Na poziomie powłoki bash, status wyjścia ostatniego zakończonego podprocesu powłoki przechowywany jest w specjalnej zmiennej $EXIT_STATUS.',
            'Program true kończy się zawsze statusem wyjścia równym 0.',
            'Program, który zakończył się powodzeniem, powinien zwrócić status wyjścia większy lub równy 0, a program, który zakończył się porażką ujemny.',
        ],
        correct: [1, 3],
    },
    {
        id: 31,
        question:
            'W skład obrazu procesu przechowywanego w pamięci operacyjnej wchodzą:',
        options: [
            'zasoby fizyczne wykorzystywane przez proces.',
            'blok kontrolny procesu.',
            'program.',
            'stos.',
            'dane.',
        ],
        correct: [1, 2, 3, 4],
    },
    {
        id: 32,
        question:
            'W systemach uniksopodobnych do elementów struktury plików można tworzyć dowiązania stałe i symboliczne.',
        options: [
            'Dowiązanie stałe można utworzyć jedynie do pliku znajdującego się w tym samym systemie plików, w którym ma zostać umieszczone dowiązanie.',
            'Użytkownik systemu może tworzyć dowiązania stałe zarówno do plików, jak i do katalogów.',
            'Można utworzyć dowiązanie stałe do dowiązania symbolicznego.',
            'Elementy specjalne . oraz .. są dowiązaniami symbolicznymi do, odpowiednio, katalogu bieżącego i nadrzędnego.',
            'Można utworzyć dowiązanie symboliczne do dowolnego (nawet nieistniejącego) elementu struktury plików.',
        ],
        correct: [0, 2, 4],
    },
    {
        id: 33,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące ogólnej koncepcji planowania procesów:',
        options: [
            'Priorytet procesu może zależeć od wielu czynników, ale wszystkie te czynniki są niezależne od woli użytkownika.',
            'W trybie niewywłaszczeniowym, proces przydzielony do procesora jest na nim wykonywany od początku do końca. W tym czasie nie są wykonywane żadne instrukcje pochodzące od jądra systemu operacyjnego.',
            'Przełączenie kontekstu leży w zakresie obowiązków planisty krótkoterminowego.',
            'Jeśli więcej niż jeden proces ma dokładnie taki sam priorytet, to decyzje o tym, który proces będzie wykonywany, podejmuje się w oparciu o regułę arbitrażu.',
            'W trybie wywłaszczeniowym, wykonywanie procesu może zostać wstrzymane na jakiś czas, aby przydzielić procesor innemu procesowi.',
        ],
        correct: [3, 4],
    },
    {
        id: 34,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące dobrego rozwiązania problemu sekcji krytycznej.',
        options: [
            'Jeśli procesy rywalizują o dostęp do wolnego (niezajętego) zasobu krytycznego, to jeden z tych procesów uzyska w końcu do niego dostęp.',
            'Każdy proces żądający dostępu do zasobu krytycznego uzyska go w skończonym czasie.',
            'W ramach współbieżnych procesów, dokładnie jeden zasób może być traktowany jako krytyczny (tzw. zasób główny).',
            'Może się zdarzyć, że proces będzie oczekiwał na wejście do sekcji krytycznej w nieskończoność.',
            'W danej chwili co najwyżej jeden proces może przebywać w sekcji krytycznej.',
        ],
        correct: [0, 1, 4],
    },
    {
        id: 35,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące systemów plików o strukturze dziennika i księgujących systemów plików.',
        options: [
            'W systemach księgujących operacje zapisu buforuje się, a następnie okresowo zapisuje się je na dysku w postaci pojedynczego segmentu.',
            'Księgujące systemy plików opierają się na dziennikach, ale są to inne dzienniki niż w przypadku systemów plików o strukturze dziennika.',
            'System plików o strukturze dziennika wykorzystuje pamięć podręczną, aby przyspieszyć dostęp programów do danych zapisanych na dysku.',
            'Przykładem księgującego systemu plików jest NTFS.',
            'Księgujące systemy plików pozwalają przywrócić integralność danych zapisanych na dysku w przypadku nagłej awarii dysku.',
        ],
        correct: [1, 2, 3, 4],
    },
    {
        id: 36,
        question:
            'Zapoznaj się z poniższym uszeregowaniem trzech procesów (diagram Gantta P1/P2/P3).',
        options: [
            'Czas przetwarzania procesu P2 w systemie wyniósł 12 jednostek.',
            'Proces P1 musiał być wykonywany przez choćiaż niewielką chwilę w okolicach chwili 9.',
            'Zużycie procesora w czasie [0-14] wyniosło mniej niż 90%.',
            'Gdyby z procesem P2 była związana czasowa linia krytyczna równa 12, to proces ten miałby opóźnienie równe 2 jednostkom.',
            'Proces P2 został wywłaszczony dwukrotnie.',
        ],
        correct: [0, 3],
    },
    {
        id: 37,
        question:
            'Zaznacz prawdziwe stwierdzenia dotyczące metod podziału i w konsekwencji przydziału pamięci operacyjnej do procesów.',
        options: [
            'Zastosowanie metody podziału stałego nie pociąga za sobą ograniczenia górnego na liczbę wykonywanych jednocześnie procesów.',
            'W metodzie podziału na bloki bliźniacze, procesowi może zostać przydzielony obszar pamięci o rozmiarze 180KB.',
            'Strategia best fit stosowana przy podziale dynamicznym jest w praktyce szybsza niż strategia first fit.',
            'Metoda podziału dynamicznego może prowadzić do konieczności wyboru pomiędzy dużą fragmentacją zewnętrzną a czasochłonną realokacją obrazów procesów.',
            'Metoda podziału stałego jest łatwa w implementacji, ale prowadzi do dużej fragmentacji wewnętrznej.',
        ],
        correct: [3, 4],
    },
    {
        id: 38,
        question: 'Wskaż prawidłowe stwierdzenia dotyczące zasobów:',
        options: [
            'Zasobem dostępnym za pośrednictwem systemu operacyjnego może być jedynie fizyczne urządzenie wejścia/wyjścia.',
            'System operacyjny może tworzyć tzw. wirtualne zasoby.',
            'Proces może uzyskać dostęp do większości zasobów wyłącznie za pośrednictwem systemu operacyjnego.',
            'Pamięć jest przykładem elementu (zasobu) programowego, ponieważ jest wykorzystywana przez uruchomiony program.',
            'Plik jest zasobem sprzętowym, ponieważ jest zapisany na fizycznym urządzeniu, np. dysku.',
        ],
        correct: [1, 2],
    },
    {
        id: 39,
        question:
            'Przyjmijmy, że w systemie wieloprogramowym działa współbieżnie dokładnie 5 niezależnych procesów. Wiemy, że każdy z tych procesów poświęca 60% czasu na oczekiwanie na wykonanie operacji wejścia/wyjścia. Jakie będzie średnie wykorzystanie procesora w takim systemie?',
        options: ['ok. 80%', 'ok. 65%', 'ok. 40%', 'ok. 50%', 'ok. 90%'],
        correct: [4],
    },
    {
        id: 40,
        question:
            'Zaznacz prawidłowe stwierdzenia dotyczące układu systemu plików.',
        options: [
            'Rekord startowy (MBR) znajduje się w początkowej części adresowej dysku.',
            'Pierwsza partycja na dysku jest zawsze oznaczona jako aktywna.',
            'BIOS (Basic Input/Output System) realizuje proces wczytywania do pamięci systemu operacyjnego.',
            'Dysk jest zorganizowany w bloki. System operacyjny posługuje się numerami bloków, a nie adresami pojedynczych bajtów.',
            'W ramach jednego urządzenia (np. dysku) może być stosowany tylko jeden system plików (np. FAT).',
        ],
        correct: [0, 3],
    },
    {
        id: 41,
        question:
            'Zaznacz prawdziwe stwierdzenia dotyczące procesu uzyskiwania obrazu procesu, który można wczytać do pamięci:',
        options: [
            'Pojęcia \„translacji" i \„kompilacji" mogą być używane zamiennie.',
            'Obraz procesu jest niezależny od systemu operacyjnego. Raz skompilowany program można z powodzeniem uruchomić w różnych systemach.',
            'Efektem translacji jest powstanie modułu wynikowego, który może odwoływać się do niezdefiniowanych obiektów (np. funkcji).',
            'Funkcje biblioteczne muszą być dołączane do programu na etapie konsolidacji statycznej. W przeciwnym przypadku nie będzie możliwe korzystanie z nich.',
            'Zadaniem konsolidatora (linkera) jest łączenie modułów w program ładowalny.',
        ],
        correct: [2, 4],
    },
    {
        id: 42,
        question:
            'Wskaż struktury danych, które są utrzymywane na potrzeby ewidencji stanu procesów i zasobów:',
        options: [
            'tabela procesów.',
            'deskryptor procesu.',
            'rejestr kontrolera zasobu.',
            'blok kontrolny procesu.',
            'deskryptor zasobu.',
        ],
        correct: [0, 1, 3, 4],
    },
    {
        id: 43,
        question:
            'Struktura katalogów w systemach uniksopodobnych przyjmuje formę:',
        options: [
            'listy jednokierunkowej.',
            'acyklicznego grafu skierowanego.',
            'ogólnego grafu skierowanego z ograniczeniami na dopuszczalne cykle.',
            'drzewa skierowanego.',
            'listy dwukierunkowej.',
        ],
        correct: [2],
    },
    {
        id: 44,
        question:
            'Zapoznaj się z poniższym uszeregowaniem trzech procesów (algorytm scheduling).',
        options: [
            'Powyższe uszeregowanie mogło powstać w wyniku zastosowania algorytmu SRT.',
            'Powyższe uszeregowanie mogło powstać w wyniku zastosowania algorytmu FCFS.',
            'Powyższe uszeregowanie mogło powstać w wyniku zastosowania algorytmu Round-Robin.',
            'Powyższe uszeregowanie mogło powstać w wyniku zastosowania algorytmu SJF.',
            'Powyższe uszeregowanie mogło powstać w wyniku zastosowania algorytmu LIFO.',
        ],
        correct: [0, 3, 4],
    },
    {
        id: 45,
        question:
            'Wskaż sytuacje, których natychmiastowym następstwem może być wywłaszczenie procesora (odebranie procesora procesowi).',
        options: [
            'Proces zakończył się.',
            'Proces oczekuje na zdarzenie związane z mechanizmem synchronizacji procesów.',
            'Proces zażądał wykonania operacji wejścia/wyjścia.',
            'Proces umieścił dane we współdzielonym fragmencie pamięci.',
            'Proces zakończył wczytywanie danych do rejestrów procesora.',
        ],
        correct: [0, 1, 2],
    },
    {
        id: 46,
        question:
            'Wskaż prawdziwe stwierdzenia dotyczące klasyfikacji systemów operacyjnych.',
        options: [
            'W systemach dla jednego użytkownika mechanizmy autoryzacji i ochrony informacji są bardziej rozbudowane niż w systemach wielodostępnych.',
            'W systemach przetwarzania bezpośredniego (online) błąd w czasie wykonywania zadania lub brak danych skutkuje koniecznością wykonania zadania ponownie, od początku.',
            'W systemach jednozadaniowych dopuszcza się przerwanie wykonywanego zadania w celu wykonania procedur systemowych.',
            'Ważnymi elementami systemów wielozadaniowych są mechanizm przełączania kontekstu i strategia przydzielania zasobu procesora.',
            'W systemach przetwarzania pośredniego (offline) użytkownik może wchodzić w interakcję z systemem operacyjnym w czasie wykonywania zadania.',
        ],
        correct: [2, 3],
    },
    {
        id: 47,
        question:
            'Struktura procesów w systemach uniksopodobnych przyjmuje formę:',
        options: [
            'acyklicznego grafu skierowanego, w którym jeden wierzchołek może mieć kilka krawędzi wchodzących.',
            'ogólnego grafu skierowanego.',
            'drzewa ukorzenionego.',
            'listy jednokierunkowej.',
            'listy dwukierunkowej.',
        ],
        correct: [2],
    },
];

export default function QuizApp() {
    const [mode, setMode] = useState('menu'); // menu, quiz, review, results, examReview, hardReview, database
    const [currentQ, setCurrentQ] = useState(0);
    const [selected, setSelected] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [shuffled, setShuffled] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [hardQuestions, setHardQuestions] = useState(() => {
        try {
            const saved = localStorage.getItem('hardQuestions');
            return saved ? new Set(JSON.parse(saved)) : new Set();
        } catch {
            return new Set();
        }
    });

    const toggleHard = (questionId) => {
        setHardQuestions((prev) => {
            const next = new Set(prev);
            if (next.has(questionId)) {
                next.delete(questionId);
            } else {
                next.add(questionId);
            }
            localStorage.setItem('hardQuestions', JSON.stringify([...next]));
            return next;
        });
    };

    const startQuiz = () => {
        const sh = [...questions].sort(() => Math.random() - 0.5);
        setShuffled(sh);
        setCurrentQ(0);
        setSelected([]);
        setAnswers({});
        setSubmitted(false);
        setMode('quiz');
    };

    const startReview = () => {
        setShuffled([...questions]);
        setCurrentQ(0);
        setSelected([]);
        setAnswers({});
        setSubmitted(false);
        setMode('review');
    };

    const startHardReview = () => {
        const hard = questions.filter((q) => hardQuestions.has(q.id));
        if (hard.length === 0) return;
        setShuffled(hard);
        setCurrentQ(0);
        setSelected([]);
        setAnswers({});
        setSubmitted(false);
        setMode('hardReview');
    };

    const q = shuffled[currentQ];

    const toggleOption = (idx) => {
        if (submitted) return;
        setSelected((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    };

    const submitAnswer = () => {
        setAnswers((prev) => ({ ...prev, [currentQ]: selected }));
        setSubmitted(true);
    };

    const next = () => {
        if (currentQ < shuffled.length - 1) {
            setCurrentQ((c) => c + 1);
            if (mode === 'examReview') {
                setSelected(answers[currentQ + 1] || []);
                setSubmitted(true);
            } else {
                setSelected(answers[currentQ + 1] || []);
                setSubmitted(!!answers[currentQ + 1]);
            }
        } else if (mode === 'examReview') {
            setMode('results');
        } else {
            setMode('results');
        }
    };

    const prev = () => {
        if (currentQ > 0) {
            setCurrentQ((c) => c - 1);
            if (mode === 'examReview') {
                setSelected(answers[currentQ - 1] || []);
                setSubmitted(true);
            } else {
                setSelected(answers[currentQ - 1] || []);
                setSubmitted(!!answers[currentQ - 1]);
            }
        }
    };

    const getScore = () => {
        let correct = 0;
        shuffled.forEach((q, i) => {
            const ans = answers[i] || [];
            const isCorrect =
                ans.length === q.correct.length &&
                ans.every((a) => q.correct.includes(a));
            if (isCorrect) correct++;
        });
        return correct;
    };

    const isCorrectAnswer = (q, ans) => {
        return (
            ans.length === q.correct.length &&
            ans.every((a) => q.correct.includes(a))
        );
    };

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === 'Escape') {
                if (mode === 'examReview') {
                    setMode('results');
                } else {
                    setMode('menu');
                }
                return;
            }
            if (
                mode !== 'review' &&
                mode !== 'examReview' &&
                mode !== 'hardReview'
            )
                return;
            if (e.key === 'ArrowRight') {
                if (currentQ < shuffled.length - 1) {
                    const nextQ = currentQ + 1;
                    setCurrentQ(nextQ);
                    if (mode === 'examReview') {
                        setSelected(answers[nextQ] || []);
                        setSubmitted(true);
                    } else {
                        setSelected([]);
                        setSubmitted(false);
                    }
                } else {
                    setMode(mode === 'examReview' ? 'results' : 'menu');
                }
            } else if (e.key === 'ArrowLeft') {
                if (currentQ > 0) {
                    const prevQ = currentQ - 1;
                    setCurrentQ(prevQ);
                    if (mode === 'examReview') {
                        setSelected(answers[prevQ] || []);
                        setSubmitted(true);
                    } else {
                        setSelected([]);
                        setSubmitted(false);
                    }
                }
            }
        },
        [mode, currentQ, shuffled.length, answers]
    );

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // MENU
    if (mode === 'menu') {
        return (
            <div
                style={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Segoe UI', sans-serif",
                }}
            >
                <div
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 24,
                        padding: '48px 40px',
                        maxWidth: 520,
                        width: '90%',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    }}
                >
                    <div style={{ fontSize: 56, marginBottom: 16 }}>🖥️</div>
                    <h1
                        style={{
                            color: '#e2e8f0',
                            fontSize: 28,
                            fontWeight: 700,
                            margin: '0 0 8px',
                        }}
                    >
                        Quiz: Systemy Operacyjne
                    </h1>
                    <p
                        style={{
                            color: '#94a3b8',
                            fontSize: 15,
                            marginBottom: 36,
                        }}
                    >
                        {questions.length} pytań wielokrotnego wyboru
                    </p>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 14,
                        }}
                    >
                        <button
                            onClick={startQuiz}
                            style={{
                                background:
                                    'linear-gradient(135deg, #3b82f6, #6366f1)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 12,
                                padding: '16px 24px',
                                fontSize: 16,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'transform 0.15s',
                                boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.transform = 'translateY(-2px)')
                            }
                            onMouseOut={(e) =>
                                (e.target.style.transform = 'translateY(0)')
                            }
                        >
                            🎯 Tryb egzaminacyjny
                        </button>
                        <button
                            onClick={startReview}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: '#e2e8f0',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: 12,
                                padding: '16px 24px',
                                fontSize: 16,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'transform 0.15s',
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.transform = 'translateY(-2px)')
                            }
                            onMouseOut={(e) =>
                                (e.target.style.transform = 'translateY(0)')
                            }
                        >
                            📚 Tryb nauki (z odpowiedziami)
                        </button>
                        <button
                            onClick={startHardReview}
                            disabled={hardQuestions.size === 0}
                            style={{
                                background:
                                    hardQuestions.size === 0
                                        ? 'rgba(255,255,255,0.04)'
                                        : 'rgba(239,68,68,0.15)',
                                color:
                                    hardQuestions.size === 0
                                        ? '#475569'
                                        : '#fca5a5',
                                border:
                                    hardQuestions.size === 0
                                        ? '1px solid rgba(255,255,255,0.08)'
                                        : '1px solid rgba(239,68,68,0.3)',
                                borderRadius: 12,
                                padding: '16px 24px',
                                fontSize: 16,
                                fontWeight: 600,
                                cursor:
                                    hardQuestions.size === 0
                                        ? 'not-allowed'
                                        : 'pointer',
                                transition: 'transform 0.15s',
                            }}
                            onMouseOver={(e) =>
                                hardQuestions.size > 0 &&
                                (e.target.style.transform = 'translateY(-2px)')
                            }
                            onMouseOut={(e) =>
                                (e.target.style.transform = 'translateY(0)')
                            }
                        >
                            🔥 Trudne pytania ({hardQuestions.size})
                        </button>
                        <div
                            style={{
                                height: 1,
                                background: 'rgba(255,255,255,0.1)',
                                margin: '4px 0',
                            }}
                        />
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setMode('database');
                            }}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: '#e2e8f0',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: 12,
                                padding: '16px 24px',
                                fontSize: 16,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'transform 0.15s',
                            }}
                            onMouseOver={(e) =>
                                (e.target.style.transform = 'translateY(-2px)')
                            }
                            onMouseOut={(e) =>
                                (e.target.style.transform = 'translateY(0)')
                            }
                        >
                            📋 Baza pytań
                        </button>
                    </div>

                    <p
                        style={{
                            color: '#64748b',
                            fontSize: 13,
                            marginTop: 28,
                        }}
                    >
                        Zaznacz wszystkie prawidłowe odpowiedzi
                    </p>
                </div>
            </div>
        );
    }

    // DATABASE
    if (mode === 'database') {
        const filtered = questions.filter((q) => {
            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            if (q.question.toLowerCase().includes(query)) return true;
            if (q.options.some((o) => o.toLowerCase().includes(query)))
                return true;
            return false;
        });

        return (
            <div
                style={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    fontFamily: "'Segoe UI', sans-serif",
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Header */}
                <div style={{ width: '100%', maxWidth: 700, marginBottom: 20 }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 16,
                        }}
                    >
                        <button
                            onClick={() => setMode('menu')}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: '#94a3b8',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 8,
                                padding: '6px 14px',
                                fontSize: 13,
                                cursor: 'pointer',
                            }}
                        >
                            ← Menu
                        </button>
                        <span style={{ color: '#94a3b8', fontSize: 14 }}>
                            📋 Baza pytań · {filtered.length}/{questions.length}
                        </span>
                        <span style={{ width: 70 }}></span>
                    </div>

                    {/* Search bar */}
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Szukaj pytanie lub odpowiedź..."
                            autoFocus
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: 12,
                                padding: '12px 16px 12px 42px',
                                fontSize: 15,
                                color: '#e2e8f0',
                                outline: 'none',
                                boxSizing: 'border-box',
                                transition: 'border-color 0.2s',
                            }}
                            onFocus={(e) =>
                                (e.target.style.borderColor =
                                    'rgba(99,102,241,0.5)')
                            }
                            onBlur={(e) =>
                                (e.target.style.borderColor =
                                    'rgba(255,255,255,0.15)')
                            }
                        />
                        <span
                            style={{
                                position: 'absolute',
                                left: 14,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                fontSize: 16,
                                pointerEvents: 'none',
                            }}
                        >
                            🔍
                        </span>
                    </div>
                </div>

                {/* Questions list */}
                <div
                    style={{
                        width: '100%',
                        maxWidth: 700,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                    }}
                >
                    {filtered.length === 0 && (
                        <div
                            style={{
                                textAlign: 'center',
                                color: '#64748b',
                                fontSize: 15,
                                padding: 40,
                            }}
                        >
                            Brak wyników dla "{searchQuery}"
                        </div>
                    )}
                    {filtered.map((question) => (
                        <div
                            key={question.id}
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                borderRadius: 16,
                                padding: '20px 24px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                position: 'relative',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8,
                                    marginBottom: 10,
                                }}
                            >
                                <span
                                    style={{
                                        color: '#64748b',
                                        fontSize: 11,
                                        fontWeight: 600,
                                        textTransform: 'uppercase',
                                        letterSpacing: 1,
                                    }}
                                >
                                    Pytanie {question.id}
                                </span>
                                {hardQuestions.has(question.id) && (
                                    <span style={{ fontSize: 14 }}>🔥</span>
                                )}
                            </div>
                            <h3
                                style={{
                                    color: '#e2e8f0',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    lineHeight: 1.5,
                                    margin: '0 0 14px',
                                }}
                            >
                                {question.question}
                            </h3>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 6,
                                }}
                            >
                                {question.options.map((opt, idx) => {
                                    const isCorrect =
                                        question.correct.includes(idx);
                                    return (
                                        <div
                                            key={idx}
                                            style={{
                                                background: isCorrect
                                                    ? 'rgba(34,197,94,0.1)'
                                                    : 'rgba(255,255,255,0.03)',
                                                border: isCorrect
                                                    ? '1px solid rgba(34,197,94,0.3)'
                                                    : '1px solid rgba(255,255,255,0.06)',
                                                borderRadius: 8,
                                                padding: '8px 12px',
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: 8,
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize: 12,
                                                    marginTop: 1,
                                                    flexShrink: 0,
                                                }}
                                            >
                                                {isCorrect ? '✓' : ''}
                                            </span>
                                            <span
                                                style={{
                                                    color: isCorrect
                                                        ? '#86efac'
                                                        : '#94a3b8',
                                                    fontSize: 13,
                                                    lineHeight: 1.5,
                                                }}
                                            >
                                                {opt}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // RESULTS
    if (mode === 'results') {
        const score = getScore();
        const pct = Math.round((score / shuffled.length) * 100);
        const grade =
            pct >= 90
                ? '🏆 Doskonale!'
                : pct >= 70
                  ? '✅ Dobrze!'
                  : pct >= 50
                    ? '📖 Ćwicz dalej'
                    : '💪 Nie poddawaj się!';

        return (
            <div
                style={{
                    minHeight: '100vh',
                    background:
                        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Segoe UI', sans-serif",
                    padding: 20,
                }}
            >
                <div
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        borderRadius: 24,
                        padding: '48px 40px',
                        maxWidth: 560,
                        width: '100%',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    }}
                >
                    <div style={{ fontSize: 64, marginBottom: 16 }}>
                        {grade.split(' ')[0]}
                    </div>
                    <h2
                        style={{
                            color: '#e2e8f0',
                            fontSize: 26,
                            fontWeight: 700,
                            margin: '0 0 8px',
                        }}
                    >
                        {grade.slice(2)}
                    </h2>
                    <div style={{ margin: '28px 0', position: 'relative' }}>
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: 50,
                                height: 140,
                                width: 140,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto',
                                border: `4px solid ${pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444'}`,
                            }}
                        >
                            <span
                                style={{
                                    color: '#e2e8f0',
                                    fontSize: 36,
                                    fontWeight: 800,
                                }}
                            >
                                {pct}%
                            </span>
                            <span style={{ color: '#94a3b8', fontSize: 14 }}>
                                {score}/{shuffled.length}
                            </span>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: 12,
                            marginBottom: 28,
                        }}
                    >
                        {shuffled.map((q, i) => {
                            const ans = answers[i] || [];
                            const ok = isCorrectAnswer(q, ans);
                            return (
                                <div
                                    key={i}
                                    style={{
                                        background: ok
                                            ? 'rgba(34,197,94,0.1)'
                                            : 'rgba(239,68,68,0.1)',
                                        border: `1px solid ${ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                                        borderRadius: 8,
                                        padding: '8px 12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                    }}
                                >
                                    <span style={{ fontSize: 14 }}>
                                        {ok ? '✅' : '❌'}
                                    </span>
                                    <span
                                        style={{
                                            color: '#94a3b8',
                                            fontSize: 13,
                                        }}
                                    >
                                        Pytanie {i + 1}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            gap: 12,
                            justifyContent: 'center',
                        }}
                    >
                        <button
                            onClick={() => setMode('menu')}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: '#e2e8f0',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: 12,
                                padding: '12px 24px',
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            ← Menu
                        </button>
                        <button
                            onClick={() => {
                                setCurrentQ(0);
                                setSelected(answers[0] || []);
                                setSubmitted(true);
                                setMode('examReview');
                            }}
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                color: '#e2e8f0',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: 12,
                                padding: '12px 24px',
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            🔍 Sprawdź błędy
                        </button>
                        <button
                            onClick={startQuiz}
                            style={{
                                background:
                                    'linear-gradient(135deg, #3b82f6, #6366f1)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 12,
                                padding: '12px 24px',
                                fontSize: 15,
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            🔄 Jeszcze raz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // QUIZ / REVIEW
    if (!q) return null;
    const progress = ((currentQ + 1) / shuffled.length) * 100;
    const isReview =
        mode === 'review' || mode === 'examReview' || mode === 'hardReview';

    return (
        <div
            style={{
                minHeight: '100vh',
                background:
                    'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                fontFamily: "'Segoe UI', sans-serif",
                padding: 20,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Header */}
            <div style={{ width: '100%', maxWidth: 700, marginBottom: 20 }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 10,
                    }}
                >
                    <button
                        onClick={() =>
                            setMode(mode === 'examReview' ? 'results' : 'menu')
                        }
                        style={{
                            background: 'rgba(255,255,255,0.08)',
                            color: '#94a3b8',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 8,
                            padding: '6px 14px',
                            fontSize: 13,
                            cursor: 'pointer',
                        }}
                    >
                        {mode === 'examReview' ? '← Wyniki' : '← Menu'}
                    </button>
                    <span style={{ color: '#94a3b8', fontSize: 14 }}>
                        {mode === 'examReview'
                            ? '🔍 Przegląd'
                            : mode === 'hardReview'
                              ? '🔥 Trudne'
                              : isReview
                                ? '📚 Nauka'
                                : '🎯 Egzamin'}{' '}
                        · {currentQ + 1}/{shuffled.length}
                    </span>
                    {!isReview && (
                        <span style={{ color: '#64748b', fontSize: 13 }}>
                            {Object.keys(answers).length} odpowiedzi
                        </span>
                    )}
                    {isReview && (
                        <span style={{ color: '#64748b', fontSize: 13 }}></span>
                    )}
                </div>
                <div
                    style={{
                        background: 'rgba(255,255,255,0.08)',
                        borderRadius: 50,
                        height: 6,
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            background:
                                'linear-gradient(90deg, #3b82f6, #6366f1)',
                            height: '100%',
                            width: `${progress}%`,
                            transition: 'width 0.3s',
                        }}
                    />
                </div>
            </div>

            {/* Question card */}
            <div
                style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 20,
                    padding: '28px 32px',
                    maxWidth: 700,
                    width: '100%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    position: 'relative',
                }}
            >
                {mode === 'quiz' && q && hardQuestions.has(q.id) && (
                    <span
                        style={{
                            position: 'absolute',
                            top: 16,
                            right: 20,
                            fontSize: 24,
                        }}
                        title="Trudne pytanie"
                    >
                        🔥
                    </span>
                )}
                <p
                    style={{
                        color: '#94a3b8',
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                        marginBottom: 12,
                    }}
                >
                    Pytanie {currentQ + 1}
                </p>
                <h2
                    style={{
                        color: '#e2e8f0',
                        fontSize: 17,
                        fontWeight: 600,
                        lineHeight: 1.6,
                        marginBottom: 24,
                        margin: '0 0 24px',
                    }}
                >
                    {q.question}
                </h2>
                <p
                    style={{
                        color: '#64748b',
                        fontSize: 12,
                        marginBottom: 16,
                        margin: '0 0 16px',
                    }}
                >
                    Wybierz wszystkie prawidłowe:
                </p>

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                    }}
                >
                    {q.options.map((opt, idx) => {
                        const isSel = selected.includes(idx);
                        const isCorrect = q.correct.includes(idx);
                        let bg = 'rgba(255,255,255,0.04)';
                        let border = '1px solid rgba(255,255,255,0.08)';
                        let color = '#cbd5e1';

                        if (submitted || isReview) {
                            if (isCorrect) {
                                bg = 'rgba(34,197,94,0.12)';
                                border = '1px solid rgba(34,197,94,0.4)';
                                color = '#86efac';
                            }
                            if (isSel && !isCorrect) {
                                bg = 'rgba(239,68,68,0.12)';
                                border = '1px solid rgba(239,68,68,0.4)';
                                color = '#fca5a5';
                            }
                        } else if (isSel) {
                            bg = 'rgba(99,102,241,0.15)';
                            border = '1px solid rgba(99,102,241,0.5)';
                            color = '#a5b4fc';
                        }

                        return (
                            <div
                                key={idx}
                                onClick={() =>
                                    isReview ? null : toggleOption(idx)
                                }
                                style={{
                                    background: bg,
                                    border,
                                    borderRadius: 12,
                                    padding: '14px 16px',
                                    cursor: isReview ? 'default' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 12,
                                    transition: 'all 0.15s',
                                    userSelect: 'none',
                                }}
                            >
                                <div
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: 4,
                                        border:
                                            submitted || isReview
                                                ? 'none'
                                                : `2px solid ${isSel ? '#6366f1' : 'rgba(255,255,255,0.2)'}`,
                                        background:
                                            submitted || isReview
                                                ? 'transparent'
                                                : isSel
                                                  ? '#6366f1'
                                                  : 'transparent',
                                        flexShrink: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 1,
                                        fontSize: 14,
                                    }}
                                >
                                    {submitted || isReview
                                        ? isCorrect
                                            ? '✓'
                                            : isSel
                                              ? '✗'
                                              : ''
                                        : isSel
                                          ? '✓'
                                          : ''}
                                </div>
                                <span
                                    style={{
                                        color,
                                        fontSize: 14,
                                        lineHeight: 1.5,
                                    }}
                                >
                                    {opt}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Hard question toggle */}
                {(mode === 'review' || mode === 'hardReview') && q && (
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginTop: 20,
                            padding: '10px 14px',
                            borderRadius: 10,
                            background: hardQuestions.has(q.id)
                                ? 'rgba(239,68,68,0.12)'
                                : 'rgba(255,255,255,0.04)',
                            border: hardQuestions.has(q.id)
                                ? '1px solid rgba(239,68,68,0.3)'
                                : '1px solid rgba(255,255,255,0.08)',
                            cursor: 'pointer',
                            userSelect: 'none',
                            transition: 'all 0.15s',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={hardQuestions.has(q.id)}
                            onChange={() => toggleHard(q.id)}
                            style={{
                                width: 18,
                                height: 18,
                                accentColor: '#ef4444',
                                cursor: 'pointer',
                            }}
                        />
                        <span
                            style={{
                                color: hardQuestions.has(q.id)
                                    ? '#fca5a5'
                                    : '#94a3b8',
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            🔥 Trudne pytanie
                        </span>
                    </label>
                )}

                {/* Feedback */}
                {submitted && !isReview && (
                    <div
                        style={{
                            marginTop: 20,
                            padding: '12px 16px',
                            borderRadius: 10,
                            background: isCorrectAnswer(q, selected)
                                ? 'rgba(34,197,94,0.1)'
                                : 'rgba(239,68,68,0.1)',
                            border: `1px solid ${isCorrectAnswer(q, selected) ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
                        }}
                    >
                        <span
                            style={{
                                color: isCorrectAnswer(q, selected)
                                    ? '#86efac'
                                    : '#fca5a5',
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                        >
                            {isCorrectAnswer(q, selected)
                                ? '✅ Poprawna odpowiedź!'
                                : '❌ Niepoprawna odpowiedź — zaznaczone poprawne opcje na zielono'}
                        </span>
                    </div>
                )}

                {/* Mark as hard after submit in exam mode */}
                {submitted && mode === 'quiz' && q && (
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            marginTop: 12,
                            padding: '10px 14px',
                            borderRadius: 10,
                            background: hardQuestions.has(q.id)
                                ? 'rgba(239,68,68,0.12)'
                                : 'rgba(255,255,255,0.04)',
                            border: hardQuestions.has(q.id)
                                ? '1px solid rgba(239,68,68,0.3)'
                                : '1px solid rgba(255,255,255,0.08)',
                            cursor: 'pointer',
                            userSelect: 'none',
                            transition: 'all 0.15s',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={hardQuestions.has(q.id)}
                            onChange={() => toggleHard(q.id)}
                            style={{
                                width: 18,
                                height: 18,
                                accentColor: '#ef4444',
                                cursor: 'pointer',
                            }}
                        />
                        <span
                            style={{
                                color: hardQuestions.has(q.id)
                                    ? '#fca5a5'
                                    : '#94a3b8',
                                fontSize: 14,
                                fontWeight: 500,
                            }}
                        >
                            🔥 Trudne pytanie
                        </span>
                    </label>
                )}

                {/* Buttons */}
                <div
                    style={{
                        display: 'flex',
                        gap: 12,
                        marginTop: 24,
                        justifyContent: 'space-between',
                    }}
                >
                    <button
                        onClick={prev}
                        disabled={currentQ === 0}
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            color: currentQ === 0 ? '#475569' : '#94a3b8',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: 10,
                            padding: '10px 20px',
                            fontSize: 14,
                            cursor: currentQ === 0 ? 'not-allowed' : 'pointer',
                        }}
                    >
                        ← Poprzednie
                    </button>

                    {!isReview && !submitted && (
                        <button
                            onClick={submitAnswer}
                            disabled={selected.length === 0}
                            style={{
                                background:
                                    selected.length === 0
                                        ? 'rgba(99,102,241,0.3)'
                                        : 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 10,
                                padding: '10px 28px',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor:
                                    selected.length === 0
                                        ? 'not-allowed'
                                        : 'pointer',
                            }}
                        >
                            Sprawdź
                        </button>
                    )}

                    <button
                        onClick={next}
                        style={{
                            background:
                                'linear-gradient(135deg, #3b82f6, #6366f1)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 10,
                            padding: '10px 24px',
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                    >
                        {currentQ === shuffled.length - 1
                            ? mode === 'examReview'
                                ? 'Wyniki →'
                                : isReview
                                  ? 'Koniec'
                                  : 'Wyniki →'
                            : 'Następne →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
