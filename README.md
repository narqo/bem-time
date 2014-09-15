bem-time
========

_What Time Is It? BEM Time!_

A simple [BEM][beminfo] library to work with date and time.

`bem-time` provides the following pack of blocks:

- [fmtTime](#fmttime)
- [Datetime](#datetime)
- [Reltime](#reltime)

### `fmtTime`

Formats the date according to the given [format string](#formatstring).

~~~js
fmtTime('%d.%m.%Y', Date.now());
~~~

#### API

| Parameter | Type | Description |
|-----------|------|-------------|
| format | `String` | Format string (see "[format string](#formatstring)" below) |
| date | `Number` or `Date` | Date to format. May be a `Date` object or a number a of seconds since the Epoch ("UNIX time") |

Block implemented in several technologies:

- as JavaScript module:

~~~js
modules.require(['fmtTime'], function(fmtTime) {
    console.log(fmtTime('%d.%m.%Y', Date.now()));   // → "02.09.2014"
});
~~~

- as BEMHTML helper method

~~~js
block('my-block').content(function() {
    return this.fmtTime('%d.%m.%Y', Date.now());
});

// <div class="my-block">02.09.2014</div>
~~~

- as bh helper method (**TODO: not implemented yet**):

~~~js
bh.match('my-block', function(ctx, json) {
    ctx.content(bh.lib.fmtTime('%d.%m.%Y', Date.now()));
});

// <div class="my-block">02.09.2014</div>
~~~

#### Format string

Format string is a subset of format directives used in [strftime][strftime]
with addition `%v` directive to display date in "Vague time<b>*</b>" format,
e.g. "one minute ago":

~~~js
fmtTime('%v', new Date());          // "just now"
fmtTime('%v', new Date()-12000);    // "2 min. ago"
fmtTime('%v', new Date()-3600000);  // "one h. ago"
~~~

\* **Note**: "Vague time" is still under development.

### `Datetime`

Displays the given date using HTML5 `<time>` element.

~~~js
{ block : 'Datetime',
  val : '2014-10-31T00:15:01' }
~~~

#### Attributes

| Attribute | Type | Description |
|-----------|------|--------------|
| val | <nobr>[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) like date</nobr> | Indicates the time and date of the block. Must be a valid [date with optional time string](http://www.w3.org/TR/html-markup/datatypes.html#common.data.datetime)|
| title | `String` | Optional title of the block |
| content | `BEMJSON` | Optional content string of the block |

#### JavaScript API

~~~js
var datetime = $('.Datetime').bem('Datetime');

// Sets the value of block and returns instance of the block
datetime.setVal(new Date('2014-10-31T00:15:01'));

// Returns the value of the block as a Date object
datetime.getVal();

// Sets the content string of the block; returns instance of the block
datetime.setContent('It\'s Halloween');
~~~

<a id="Reltime"></a>
### `Reltime`

Displays the given time in the "relative date in words" format ("*Vague time*")
as a text content inside `Datetime` block. The content of the block is updated
every 60 seconds<b>*</b>.

\* **Note**: because of some internal optimisations update of the HTML-content
of the block is scheduled to the end of request animation frame loop.
So content shows now time with a small inaccuracy gap.

~~~js
{ block : 'Reltime',
  val : '2014-10-31T00:15:01' }
~~~

#### Attributes

| Attribute | Type | Description |
|-----------|------|--------------|
| val | <nobr>[ISO 8601](http://en.wikipedia.org/wiki/ISO_8601) like date</nobr> | Indicates the time and date of the block. Must be a valid [date with optional time string](http://www.w3.org/TR/html-markup/datatypes.html#common.data.datetime)|
| title | `String` | Optional title of the block |

#### JavaScript API

~~~js
var reltime = $('.Reltime').bem('Reltime');

// Sets the value of block and returns instance of the block
reltime.setVal(new Date('2014-10-31T00:15:01'));

// Returns the value of the block as a Date object
reltime.getVal();

// the "tick" event fires before every update of the content of the block
reltime.on('tick', fn)
~~~

## Install

First, install the library to your project. [Bower][bower] is a nice chose for
that task:

~~~
› bower install --save bem-time
~~~

Add `<libs/bem-time>/blocks` level to your the list of your levels of definition.

## See also

[time-elements](https://github.com/github/time-elements) from Guthub is another
great library with similar functionality built on top of the the upcoming
Web Component stack.

## License

WTFPL

[beminfo]: http://bem.info
[bower]: http://bower.io
[strftime]: http://man7.org/linux/man-pages/man3/strftime.3.html
