

// import {getNested} from "./extra";
const { getNested } = require("./extra");

const queryPatcher = (object, selectedMember) => {
    let MasterObj_Data_Query = object.MasterObj_Data_Query
    let MasterObj_Data_selection = object.MasterObj_Data_selection
    let MasterObj_Data_Mapping = object.MasterObj_Data_Mapping

    const x = MasterObj_Data_selection.x.toLowerCase();
    const xData = MasterObj_Data_selection.masterObjectX;
    const y = MasterObj_Data_selection.y.toLowerCase();
    const yData = MasterObj_Data_selection.masterObjectY;
    const page = MasterObj_Data_selection.page;
    const pageData = MasterObj_Data_selection.MasterObjPage;

    MasterObj_Data_Query[x] = []
    MasterObj_Data_Query[y] = []
    if (page.type != "A") {
        if (page.page.toLowerCase() == "tl") {
            MasterObj_Data_Query.tl = pageData.membersList
            MasterObj_Data_Query[x] = xData
            MasterObj_Data_Query[y] = yData
        }

        else {
            const sm = Object.keys(pageData.selectedMember)
            MasterObj_Data_Query[page.page.toLowerCase()] = sm.length ? [selectedMember] : pageData.membersList.length ? [pageData.membersList[0]] : [{}]
            // MasterObj_Data_Query[page.page.toLowerCase()] = sm.length ? [selectedMember] : [{}]

        }
    }

    MasterObj_Data_Query[x] = xData
    MasterObj_Data_Query[y] = yData
    // MasterObj_Data_Query[y] = MasterObj_Data_Query[y].filter((el) => el)
    // MasterObj_Data_Query[x] = MasterObj_Data_Query[x].filter((el) => el)
    return MasterObj_Data_Query

    for (let i = 0; i < MasterObj_Data_Mapping.Plots.length; i++) {
        const plot = MasterObj_Data_Mapping.Plots[i];

        if (!MasterObj_Data_Query[x].length)
            if (getNested(plot, "X") == "*" || getNested(plot, "X") + "" == "date")
                MasterObj_Data_Query[x] = xData
            else
                if (x != "tl" && Array.isArray(getNested(plot, "X"))) {
                    MasterObj_Data_Query[x] = MasterObj_Data_Query[x].concat(plot.X.map((p) => xData.find((x) => x.Le_Compteur == p || x.m_name == p)))
                }

        if (!MasterObj_Data_Query[y].length) {
            if (getNested(plot, "Y", "Y1") == "*" || getNested(plot, "Y", "Y2") == "*") {
                MasterObj_Data_Query[y] = yData
            }
            else {
                console.log("---------------------------")

                if (Array.isArray(getNested(plot, "Y", "Y1")))
                    MasterObj_Data_Query[y] = MasterObj_Data_Query[y].concat(plot.Y.Y1.map((p) => yData.find((y) => y.Le_Compteur == p || y.m_name == p)))
                if (Array.isArray(getNested(plot, "Y", "Y2"))) {
                    const y2members = plot.Y.Y2.map((p) => (yData.find((y) => y.Le_Compteur == p || y.m_name == p))).filter(el => el)
                    console.log("*************", y2members)
                    if (y2members.length && y2members[0]
                    )
                        MasterObj_Data_Query[y] = MasterObj_Data_Query[y].concat(y2members)
                }
                MasterObj_Data_Query[y] = MasterObj_Data_Query[y].filter((el) => el)
                MasterObj_Data_Query[x] = MasterObj_Data_Query[x].filter((el) => el)


            }

        }

    }

    return MasterObj_Data_Query;
}

const refreshQueryPatcher = (object) => {
    let MasterObj_Data_Query = object.MasterObj_Data_Query;
    let MasterObj_Data_selection = object.MasterObj_Data_selection;
    const x = MasterObj_Data_selection.x.toLowerCase();
    const xData = MasterObj_Data_selection.masterObjectX;

    MasterObj_Data_Query[x] = xData;
    // MasterObj_Data_Query[x][0].SQL="iot.date between now()::timestamp -INTERVAL '10s' and now()::timestamp"
    MasterObj_Data_Query[x][0].SQL = "iot.date between '2021-07-31'::timestamp -INTERVAL '10s' and '2021-07-31'::timestamp"
    return MasterObj_Data_Query;

}

const selectionPatcher = (object, selectedMember) => {
    let MasterObj_Data_selection = object.MasterObj_Data_selection;
    const pageData = MasterObj_Data_selection.MasterObjPage;
    const page = MasterObj_Data_selection.page;

    if (page.type != "A")
        MasterObj_Data_selection.MasterObjPage.selectedMember = selectedMember ? selectedMember : [pageData.selectedMember]

    return MasterObj_Data_selection
}



const pageHandler = (object) => {
    let output = []
    const page = object.MasterObj_Data_selection.page;
    const pageData = object.MasterObj_Data_selection.MasterObjPage;

    switch (page.type.toLowerCase()) {
        case "a":
            output.push(page.page)
            break;
        case "dim":
            output = pageData.membersList
            break;
        default:
            break;
    }
    return output
}

const dataMappingGenerator = (object, selectedMember) => {
    const QueryAPI = object.QueryAPI
    let MasterObj_Data_Mapping = object.MasterObj_Data_Mapping;
    let MasterObj_Data_selection = object.MasterObj_Data_selection
    const x = MasterObj_Data_selection.x.toLowerCase();
    const xData = MasterObj_Data_selection.masterObjectX;
    const y = MasterObj_Data_selection.y.toLowerCase();
    const yData = MasterObj_Data_selection.masterObjectY;
    const page = MasterObj_Data_selection.page.page.toLowerCase();
    const pageData = MasterObj_Data_selection.MasterObjPage;

    const selectedMemberFrom = selectedMember && selectedMember.Le_Compteur ? "cl" : selectedMember && selectedMember.m_name ? "ml" : null

    object.MasterObj_Data_Mapping.Plots.map((plot, i) => {
        const function_type = plot.function_type;
        let haveY2 = false;
        let genX = false;
        let y1HaveAll = false;
        let y2HaveAll = false;
        if (plot.Y.Y1 == "*") {
            y1HaveAll = true;
            plot.Y.Y1 = [];
        }
        if (plot.Y.Y2) {
            haveY2 = true;
            if (plot.Y.Y2 == "*") {
                plot.Y.Y2 = [];
                y2HaveAll = true;
            }

        }
        if (plot.X == "*") {
            genX = true
            plot.X = []
        }
        if (genX) {
            if (typeof plot.X == String || x.toLowerCase()=="tl" ) {
                //X == TL
                plot.X = ["date"]
            }
            else{
                object.MasterObj_Data_Query[x].map((member, i) => {
                    switch (x) {
                        case "ml":
                            //crosstabCL
                            // X == ML
                            plot.X.push(member.m_name)
                            break;
                        case "cl":
                            //crosstabML
                            // X == CL

                            plot.X.push(member.Le_Compteur)
                            break;
                        default:
                            //X == TL
                            plot.X = ["date"]
                            break;
                    }
                })}
        }

        object.MasterObj_Data_Query[y].map((member, i) => {

            switch (y) {
                case 'ml':
                    //Y == ML
                    if (y1HaveAll)
                        plot.Y.Y1.push(member.m_name)
                    if (y2HaveAll)
                        plot.Y.Y2.push(member.m_name)

                    break;
                case 'cl':
                    //Y == CL
                    if (y1HaveAll)
                        switch (QueryAPI) {
                            case "iotinner":
                                const counter = member.compteur_name || member.Le_Compteur
                                plot.Y.Y1.push(counter)
                                break;
                            case "cluster":
                                plot.Y.Y1.push(member.Le_Compteur)
                                break;
                        }
                    if (y2HaveAll)
                        switch (QueryAPI) {
                            case "iotinner":
                                const counter = member.compteur_name || member.Le_Compteur
                                plot.Y.Y2.push(counter)
                                break;
                            case "cluster":
                                plot.Y.Y2.push(member.Le_Compteur)
                                break;
                        }

                    break;
                default:
                    throw new Error();
            }
        });



        if (selectedMemberFrom == x)
            plot.X = [selectedMember.m_name || selectedMember.Le_Compteur]
        else if (selectedMemberFrom == y)
            plot.Y.Y1 = [selectedMember.m_name || selectedMember.Le_Compteur]
        MasterObj_Data_Mapping.Plots[i] = plot
    })
    return MasterObj_Data_Mapping
}

const temporaryDataFixer = (data, type) => {
    const output = {}
    let pKey
    switch (type.toLowerCase()) {
        case "ml":
            pKey = "m_name"
            break;
        case "cl":
            pKey = "Le_Compteur"
            break;
        case "tl":
            pKey = "date"
            break;
        default:
            throw new Error(`error ${type}`)
    }

    function merge(obj1, obj2) {
        let answer = {}
        for (let key in obj1) {
            if (answer[key] === undefined || answer[key] === null)
                answer[key] = obj1[key];
        }
        for (let key in obj2) {
            if (answer[key] === undefined || answer[key] === null)
                answer[key] = obj2[key];
        }
        return answer
    }

    data.map((elem, i) => {
        if (!output[elem[pKey]]) {
            output[elem[pKey]] = elem;
        }
        else {
            output[elem[pKey]] = merge(elem, output[elem[pKey]])
        }
    })
    return Object.values(output);
}

const dateReducer = (data) => {
    const repeated = {
        year: true,
        month: true,
        date: true,
        hour: true,
        rest: true
    }
    let finalOutput = { partialTitle: "" }
    data = data.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    const datesSplitted = data.map((_date) => {
        const date = new Date(_date);
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            hour: date.getHours(),
            time: `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds()}`,
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            milliSeconds: date.getMilliseconds()
        }
    });
    if (datesSplitted[0]) {
        if (datesSplitted[0].year != datesSplitted.slice(-1).pop().year)
            repeated.year = false;
        if (repeated.year == true && datesSplitted[0].month != datesSplitted.slice(-1).pop().month)
            repeated.month = false;
        if (repeated.month == true && datesSplitted[0].date != datesSplitted.slice(-1).pop().date)
            repeated.date = false;
        if (repeated.date == true && datesSplitted[0].hour != datesSplitted.slice(-1).pop().hour)
            repeated.hour = false;
        if (repeated.hour == true && datesSplitted[0].minutes != datesSplitted.slice(-1).pop().minutes)
            repeated.minutes = false;
    }
    const output = datesSplitted.map((elem) => {
        let out = elem;
        if (repeated.year) {
            finalOutput.partialTitle = `${out.year}`;
            delete out.year;
            if (repeated.month) {
                finalOutput.partialTitle = `${finalOutput.partialTitle}-${out.month}`;
                delete out.month;
                if (repeated.date) {
                    finalOutput.partialTitle = `${finalOutput.partialTitle}-${out.date}`;
                    delete out.date;
                    // if (repeated.hour) {
                    //     finalOutput.partialTitle = `${finalOutput.partialTitle}:${out.hour}`;
                    //     delete out.hour;
                    // }
                }
            }
        }
        out = `${out.year ? out.year + "-" : ""}${out.month ? out.month + "-" : ""}${out.date ? out.date + " " : ""}${out.hour ? out.hour + ":" : ""}${out.minutes ? out.minutes + ":" : ""}${out.seconds ? out.seconds + "s" : ""}`
        return out
    })
    finalOutput.dates = output
    return finalOutput
}

module.exports = {
    queryPatcher,
    selectionPatcher,
    dataMappingGenerator,
    refreshQueryPatcher,
    temporaryDataFixer,
    dateReducer,
    pageHandler
}
