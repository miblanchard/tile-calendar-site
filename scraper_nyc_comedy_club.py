import json

from selenium import webdriver

browser = webdriver.Chrome()
base_url = u"https://www.comedycellar.com/line-up/"
browser.get(base_url)
ul = browser.find_elements_by_tag_name("ul")
datesArr = []


# fills array datesArr with querystring parameters to add to base_url,
# gathering all scheduled dates
def get_dates(ul_element):
    for child in ul_element:
        if (child.get_attribute("class") == "dk_options_inner"):
            dates = child.find_elements_by_tag_name("li")
            for li in dates:
                a = li.find_element_by_tag_name("a")
                datesArr.append((a.get_attribute(
                    "data-dk-dropdown-value").strip(), a.get_attribute(
                    "innerHTML").strip()))


get_dates(ul)
print(datesArr)

venue_key = {
    "macdougal street": 1,
    "village underground": 2,
    "fat black pussycat": 3
}


def getShows(base, urlArr):
    acts = {}
    for date in urlArr:
        print("date", date)
        browser.get(base + "?_date=" + date[0])
        divs = browser.find_elements_by_tag_name("div")
        for div in divs:
            show = {}
            if (div.get_attribute("class") == "show"):
                show = {}
                spans = div.find_elements_by_tag_name("span")
                for span in spans:
                    if "show-time" in span.get_attribute("class"):
                        show_time = span.text[0:8].strip()
                        indexOfPipe = span.text.index("|")
                        try:
                            venue = venue_key[span.text[indexOfPipe + 1:].casefold().strip()]
                        except KeyError:
                            venue = 3
                        show["venueid"] = venue
                        show["date"] = date[1] + " " + show_time
                        show["link"] = base + "?_date=" + date[0]
                show_spans = div.find_elements_by_xpath("//span[@class='comedian-block-desc-name']")
                for show_span in show_spans:
                    inner = show_span.get_attribute("innerHTML").strip().casefold()
                    if ("</strong>" in inner):
                        if (inner[34:].strip() not in acts):
                            acts[inner[34:].strip()] = {"dates": []}
                        acts[inner[34:].strip()]["dates"].append(show)
                    else:
                        if (inner.strip() not in acts):
                            acts[inner.strip()] = {"dates": []}
                        acts[inner.strip()]["dates"].append(show)
    print(acts)
    return acts


allShows = getShows(base_url, datesArr)


def write_to_file(data):
    with open("comedians.json", "w") as outfile:
        json.dump(data, outfile)


write_to_file(allShows)
