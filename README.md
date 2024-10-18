# NASA API Pictures (NASA APOD)

Exercise Project of `ZTM` Cours on Udemy ([JavaScript Web Projects: 20 Projects to Build Your Portfolio](https://www.udemy.com/course/javascript-web-projects-to-build-your-portfolio-resume)).

## Description

NASA API Pictures programmed in vanilla-js.

## Useful references

- [Loaf - Animated SVG Icons](https://getloaf.io/)
- [NASA API DEMO](https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY)
- [NASA API Documentation](https://api.nasa.gov/)
- [W3Schools - includes()](https://www.w3schools.com/jsref/jsref_includes.asp)
- [W3Schools - JSON Stringify](https://www.w3schools.com/js/js_json_stringify.asp)
- [W3Schools - JSON Parse](https://www.w3schools.com/js/js_json_parse.asp)
- [Mozilla - Object.Values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
- [Placeholder](https://placehold.co/)
- [Mozilla - Delete Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete)
- [Mozilla - Window: scrollTo() method](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo)
- [Dataops Article - Declarative vs Imperative Programming](https://www.dataops.live/the-data-engineers-guide-to-declarative-vs-imperative-for-data#:~:text=The%20key%20difference%20between%20imperative,working%20with%20a%20blank%20slate.)
- [Hacker News](https://news.ycombinator.com/)

## Remarks

### API Schema

Sometimes a video link appears in the url instead of an image

`media_type` "image" || "video"

```json
{
  date: "2016-11-05"
  explanation: "TEXT"
  media_type: "video"
  service_version: "v1"
  title: "ISS Fisheye Fly-Through"
  url: "https://www.youtube.com/embed/DhmdyQdu96M?rel=0"
}
```

### Limit of requests reached

REST Call: `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=10`

```text
OVER_RATE_LIMIT
You have exceeded your rate limit. Try again later or contact us at https://api.nasa.gov:443/contact/ for assistance
```

`getNasaPictures()` function get ERROR:

```
TypeError: currentArray.forEach is not a function
    at createDOMNodes (script.js:29:16)
    at updateDOM (script.js:103:3)
    at getNasaPictures (script.js:114:5)
```