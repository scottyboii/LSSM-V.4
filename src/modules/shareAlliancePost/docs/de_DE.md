Viele SpielerInnen teilen regelmäßig Einsätze mit ihrem Verband und schreiben auch eine kurze Rückmeldung dazu.

Dieses Modul ermöglicht es, mit einem einzigen Klick zu alarmieren, zu teilen und zu posten! In den Einstellungen kannst du dir eigene Templates anlegen und dabei sogar die folgenden Variablen zu nutzen:

## Variablen

### Credits

<code><span>{{</span>credits<span>}}</span></code> fügt den durchschnittlichen Verdienst des Einsatzes ein.

### Adresse

<code><span>{{</span>address<span>}}</span></code> fügt die vollständige Adresse ein.

Du kannst <code><span>{{</span>city<span>}}</span></code> nutzen, um nur Postleitzahl und Stadt/Gemeinde einzufügen.

### Zusätzlich benötigte Fahrzeuge

<code><span>{{</span>remaining<span>}}</span></code> fügt den Text der roten "Zusätzlich benötigte Fahrzeuge"-Box ein.

### Patienten

<code><span>{{</span>patients<span>}}</span></code> fügt die Zahl der aktuellen Patienten ein.

### Uhrzeiten

Du kannst auch Uhrzeiten, abhängig vom aktuellen Zeitpunkt einfügen lassen. Da das etwas komplizierter ist, empfehlen wir die konzentrierte Lektüre der folgenden Anleitung:

<code><span>{{</span>now+5<span>}}</span></code> resultiert in der Uhrzeit, genau 5 Stunden nach jetzt, <code><span>{{</span>now+5,5<span>}}</span></code> fügt 5,5 Stunden, also 5 Stunden und 30 Minuten hinzu. Du kannst jede beliebige positive Zahl nutzen.

Ebenso kannst Du Uhrzeiten auf- und abrunden. Um z.B. auf die nächste viertelstunde aufzurunden, verwende `r15`, zu abrunden einfach `r-15`. Du kannst natürlich jede Zahl zwischen `0` und `59` verwenden.

Beispiel: Wenn du "In 7 Stunden und 22,5 Minuten, aber auf eine Minutenzahl, die durch drei teilbar ist", verwende einfach <code><span>{{</span>now+7.266r-3<span>}}</span></code>. Tut uns leid, Verwirrtheitszertifikate stellen wir derzeit leider nicht aus ;)

Wenn du das ganze nicht verstehst (was wir als überaus verständlich werten), kannst du dir über den [Support](/support.md) Hilfe holen und uns fragen.