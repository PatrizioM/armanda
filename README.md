# armanda
3D Talking Agent based on Three.js and Google Text-to-Speech API

TO DO

- switch italiano-inglese/multilingua
- interfaccia con chatbot esistente (?)

KNOWN BUGS

- data la complessità della scena, il rendering risulta fluido solo su sistemi particolarmente performanti.
- la sincronizzazione di testo e movimento della bocca è possibile solo se la velocità di rendering del browser
  permette il giusto rapporto tra la velocità dell'audio e generazione delle immagini.
  questo è strettamente legato alla potenza di calcolo del client e all'ottimizzazione della libreria WebGL.
- nonostante sia possibile modificare dinamicamente il modello 3D per dare un aspetto di genere diverso,
  la lingua del motore Text-to-Speech delle API di Google per la lingua italiana è disponibile solo con voce femminile. 

CHANGE LIST

v0.5
- implementata Speech-to-Text API di Google.
- risolti bug minori

v0.4.3
- implementato il battito delle palpebre a tempo casuale compreso tra 2 e 10 secondi (utilizzo della variabile renderReady).

v0.4.2
- risolti bug minori

v0.4.1
- realizzata interfaccia per input di testo client-side con verifica sull'inserimento, se nessun testo viene inserito
  manualmente dall'utente, viene utilizzato il file ./text con il testo di default.

v0.4
- realizzazione parser per la creazione dei parametri di movimento in base al testo (./text).
  non più necessario il file ./values per il movimento della bocca, la funzione resta commentata nello script
  per l'eventuale implementazione del controllo server-side. i movimenti sono generati randomicamente
  e il numero dei movimenti è stabilito in base al numero di parole inserite nel testo.
  
v0.3.1
- risolti bug minori relativi alle prestazioni.

v0.3 
- implementazione delle API di rendering text-to-speech con relativo sistema di test del browser.
- script di conferma nel testo del pulsante Talk.
- realizzazione del motore di lettura file di testo per il rendering text-to-speech. (./text).

v0.2
- realizzazione del sistema di movimento della bocca.
- realizzazione del motore di lettura file dei parametri di movimento della bocca (./values). 

v0.1.1
- implementazione modello 3D di volto umano con riferimenti di morph utilizzabile in three.js e caricato nell'interfaccia per il blending
- modifica e personalizzazione del modello 3D.
- configurazione parametri dell'interfaccia relativi ai morph target.
- risolti bug minori

v0.1
- creazione scheletro html.
- configurazione e messa in opera framework three.js.
- trovata e riadattata interfaccia per il blending che utilizza i morph target
- modificati i parametri di esecuzione e gli script necessari per il funzionamento sul server.
