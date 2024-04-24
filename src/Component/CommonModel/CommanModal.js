import React, { useContext, useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import contex from '../contex/Contex';
import Loader from '../Loader';
import { Collapse, Table } from 'react-bootstrap';
import post from '../Utility/APIHandle';
import API from '../Utility/API';


function Commonmodel(props) {
    const ref = useRef([]);
    const ref1 = useRef([]);
    const contextSetparam = useContext(contex)
    const [loader, setLoader] = useState(true);
    const [loaderGrid, setLoaderGrid] = useState(true);
    const [loaderScroll, setLoaderScroll] = useState(false);
    const [finalitem, setfinalitem] = useState([]);
    const [finalAllitem, setfinalAllitem] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [multicheck, setmulticheck] = useState([])
    const [filterGridId, setFilterGridId] = useState()
    const [multicheckName, setmulticheckName] = useState([])
    const [column, setColumn] = useState([])
    const [page, setPage] = useState(2);
    const [header, setHeader] = useState([])
    const [searchProcess, setSearchProcess] = useState(false);
    const [search, setSearch] = useState(contextSetparam.tempstate)
    let inputForAlldata = {
        strBranch: "",
        strState: "",
        strCity: "",
        strItem: "",
        strSubItem: "",
        strItemGroup: "",
        strItemSubitem: "",
        strPurchaseParty: "",
        strSalesParty: "",
        strSaleman: "",
        strProduct: "",
        strDesignCatalogue: "",
        strSaleAging: "",
        strModeofSale: "",
        strTeamModeofSale: "",
        strRegionID: '',
        FromDate: "",
        ToDate: "",
        strMetalType: "",
        strDayBook: "",
        PageNo: 0,
        PageSize: 100,
        Search: "",
        Grouping: "",
        FilterIndex: "",
        strBranchValue: "",
        strItemValue: "",
        strSubItemValue: "",
        strItemGroupValue: "",
        strItemSubitemValue: "",
        strPurchasePartyValue: "",
        strSalesPartyValue: "",
        strSalemanValue: "",
        strProductValue: "",
        strDesignCatalogueValue: "",
        strSaleAgingValue: "",
        strModeofSaleValue: "",
        strTeamModeofSaleValue: "",
        strRegionValue: ''
    };
    const [searchValue, setSearchValue] = useState("")
    const totalcount = 9999

    let updatedList = [...props.prdemo];
    let updatelistName = [...props.prdemoName]

    useEffect(() => {

        if (finalAllitem.length !== 0) {
            console.log("effect1");
            if (ref1.current !== null) {
                // console.log("hi", updatedList.length, finalAllitem.length);
                if (updatedList.length === finalAllitem.length) {
                    ref1.current.checked = true
                } else {
                    ref1.current.checked = false
                }
            }
            if (finalAllitem.length !== 0) {

                // console.log('SET HEADER', Object.keys(finalAllitem[0]))
                setHeader(Object.keys(finalAllitem[0]));


            }
        }
    }, [finalAllitem])

    useEffect(() => {
        console.log("effect2");
        // console.log('MODEL PROPS VALUES ', props);
        setPage(2)

        setSearch(contextSetparam.tempstate)
        fetchItemdata()
        // if (multicheckName.length !== 0) {
        //     console.log(multicheckName, "name");
        //     fetchAllData()
        // }
        // console.log('HEADER', header)

    }, [props.modelprops])
    useEffect(() => {
        setmulticheck(updatedList)
        setmulticheckName(updatelistName);
    }, [])


    // useEffect(() => {

    // }, [multicheck])


    useEffect(() => {

        if (header.length !== 0) {
            console.log("effect4")
            AddDefaultColumn()
        }
    }, [header])


    useEffect(() => {
        console.log(search, "effect5_search");

        console.log((search), "search");
        console.log("effect5");
        fetchItemdata()


    }, [search])

    useEffect(() => {
        console.log("effect6");
        setSearch({ ...search, ['Search']: searchValue })
        fetchAllData()
    }, [searchValue])

    function handleDoubleClick() {
        // console.log("hiii");
        if (document.getElementById("columnChooser") !== null) {
            document.getElementById("columnChooser").style.display === "block" ? document.getElementById("columnChooser").style.display = "none" : document.getElementById("columnChooser").style.display = "block";
        }
    }

    function handleColumnChosser(e) {
        var check = e.target.checked;
        var name = e.target.value;

        if (check === true) {
            setColumn([...column, name])
        } else {
            setColumn((prevData) => {
                return prevData.filter((id) => {
                    return id !== name
                })
            })
        }
    }

    function AddDefaultColumn() {
        console.log({ "ID": props.modelprops.grid, vendorID: 1, UserID: 1 },"filter123");
        post({ "ID": props.modelprops.grid, vendorID: 1, UserID: 1 }, API.GetFilterGridByID, {}, "post").then((res) => {
            // console.log(res, " ");
            if (res.data.lstResult.length === 0) {
                if (props.modelprops.id === 'DesignCatalogID') {
                    post({ "FilterGridID": 0, "FilterGrid": header[2], "FilterID": props.modelprops.grid, vendorID: 1, UserID: 1 }, API.FilterGridAddEdit, {}, "post").then((res1) => {
                        // console.log('IF IF ', res1);
                        // setColumn([props.modelprops.name]);
                    })
                } else if (props.modelprops.id === 'CityName' && props.modelprops.id === 'Caption') {
                    post({ "FilterGridID": 0, "FilterGrid": header[0], "FilterID": props.modelprops.grid, vendorID: 1, UserID: 1 }, API.FilterGridAddEdit, {}, "post").then((res1) => {
                        // console.log('IF IF ', res1);
                        // setColumn([props.modelprops.name]);
                    })
                } else {
                    console.log("column",{ "FilterGridID": 0, "FilterGrid": header[1], "FilterID": props.modelprops.grid, vendorID: 1, UserID: 1 });
                    post({ "FilterGridID": 0, "FilterGrid": header[1], "FilterID": props.modelprops.grid, vendorID: 1, UserID: 1 }, API.FilterGridAddEdit, {}, "post").then((res1) => {
                        // console.log('IF IF ', res1);
                        // setColumn([props.modelprops.name]);
                    })
                }
                // console.log('POST OBJECT IF IIf', { "FilterGridID": 0, "FilterGrid": header[1], "FilterID": props.modelprops.grid })

                // } else {
                //     post({ "FilterGridID": 0, "FilterGrid": props.modelprops.name, "FilterID": props.modelprops.grid,vendorID:1,UserID: 1 }, API.FilterGridAddEdit, {}, "post").then((res1) => {
                //         console.log("RES 1",res1);
                //         // setColumn([props.modelprops.name]);
                //     })
                // }
            } else {
                // console.log("ELESE", res)
                setFilterGridId(res.data.lstResult[0]['FilterGridID']);
                let arr = res.data.lstResult[0]['FilterGrid'].split(',');
                // console.log(arr, "arrrr");
                setColumn(arr);
            }
            setLoaderGrid(false)
        })

    }


    function hadnleOnGridSave() {
        let str = ""
        for (let i = 0; i < column.length; i++) {
            if (i === 0) {
                str = column[i]
            } else {
                str = str + ',' + column[i];
            }
        }


        // console.log(str, "str");
        post({ "FilterGridID": filterGridId, "FilterGrid": str, "FilterID": props.modelprops.grid, vendorID: 1, UserID: 1 }, API.FilterGridAddEdit, {}, "post").then((res) => {
            // console.log(res);
        })
        document.getElementById("columnChooser").style.display = 'none';
    }

    const fetchAllData = () => {

        if (totalcount !== 0) {
            console.log(multicheckName.toString(), "fetchAllData");
            inputForAlldata = { ...inputForAlldata, ['Search']: multicheckName.toString() }
            if (props.modelprops.api !== undefined) {
                // console.log("search", input)
                axios.post(props.modelprops.api, inputForAlldata)
                    .then((response) => {
                        console.log(response.data.lstResult, "result");
                        setfinalAllitem(response.data.lstResult)
                    })
                    .catch(error => console.error(error))
            }
        }

    }

    const handleClose = () => {
        contextSetparam.setchildFilterShow(false);
    }

    function handleCheck(e) {
        let finalcheck = e.target.checked;
        let value

        if (props.modelprops.name !== 'Caption' && props.modelprops.name !== 'CityName') {
            value = parseInt(e.target.value)
        } else {
            value = e.target.value
        }
        let name = e.target.name;
        // console.log(value);
        if (finalcheck) {
            setmulticheck([...multicheck, value])
            setmulticheckName([...multicheckName, name])
        }
        else {
            setmulticheck((prevData) => {
                return prevData.filter((id) => {
                    return id !== value
                })
            })
            setmulticheckName((prevData) => {
                return prevData.filter((id) => {
                    return id !== name
                })
            })
        }
    }



    const handlesavefilter = () => {
        var stringConvert = multicheck.toString()
        var stringNameConvert = multicheckName.toString()
        // console.log(stringConvert, stringNameConvert);
        // props.setvalues({ ...props.valuesform, [props.modelprops.labelname]: stringConvert })
        console.log(props.modelprops['labelname'], "common");
        contextSetparam.SettempState({ ...contextSetparam.tempstate, [props.modelprops['labelname']]: stringConvert, [props.modelprops['LabelValue']]: stringNameConvert, ['FilterIndex']: props.modelprops.FilterIndex })
        contextSetparam.setchildFilterShow(false)
        setmulticheck([])
    }

    const handleResetfilter = () => {
        for (let i = 0; i < ref.current.length; i++) {
            if (ref.current[i] !== null) {
                ref.current[i].checked = false;
            }
        }
        ref1.current.checked = false
        setmulticheck([])
        setmulticheckName([])
        contextSetparam.SettempState({ ...contextSetparam.tempstate, [props.modelprops['labelname']]: "", [props.modelprops['LabelValue']]: "" })
    }

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            for (let i = 0; i < ref.current.length; i++) {
                if (ref.current[i] !== null) {
                    ref.current[i].checked = true;
                }
            }
            let tempvalue = [];
            let tempName = [];
            for (let i = 0; i < finalitem.length; i++) {
                // console.log(finalitem[i][props.modelprops.name]);
                tempvalue.push(finalitem[i][props.modelprops.id])
                tempName.push(finalitem[i][props.modelprops.name])
            }
            setmulticheck(tempvalue);
            setmulticheckName(tempName);
        } else {
            for (let i = 0; i < ref.current.length; i++) {
                if (ref.current[i] !== null) {
                    ref.current[i].checked = false;
                }
            }

            setmulticheck([]);
            setmulticheckName([]);
        }

        // setmulticheckName([])
        // contextSetparam.SettempState({ ...contextSetparam.tempstate, [props.modelprops['labelname']]: "",  [props.modelprops['LabelValue']]: ""})
    }




    const handleScroll = (event) => {
        if (finalitem.length > 9) {
            const { scrollTop, scrollHeight, clientHeight } = event.target;
            const scrollRatio = scrollTop / (scrollHeight - clientHeight);

            setScrollTop(scrollRatio);
            console.log(scrollRatio);

            if (scrollRatio > 0.9) {
                setLoaderScroll(true)
                if (multicheck.length === finalAllitem.length) {
                    ref1.current.checked = true
                } else {
                    ref1.current.checked = false
                }
                var input = { ...search, ['PageNo']: page, ['PageSize']: 50 }
                // console.log("scroll", input);
                delete input.undefined
                axios.post(props.modelprops.api, input)
                    .then(response => {
                        setfinalitem([...finalitem, ...response.data.lstResult])
                        setPage(page + 1);
                        setLoaderScroll(false)
                    })
                    .catch(error => console.error(error))
            }
        }
    }


    const fetchItemdata = () => {

        // console.log("api", props)
        // console.log("hii");
        var input = { ...search, ['PageSize']: 80 }
        // console.log("api", props.modelprops.api)
        delete input.undefined
        console.log(search, "input");
        if (props.modelprops.api !== undefined) {
            // console.log("search", input)
            // console.log("api", props)
            // console.log(input, "input");
            // console.log("hii");
            axios.post(props.modelprops.api, input)
                .then((response) => {
                    // console.log(response.data.lstResult)
                    if (response.data.lstResult !== undefined) {
                        setfinalitem(response.data.lstResult)
                    }
                    setLoader(false)

                    // console.log(response);
                })
                .catch(error => console.error(error))
        }
    }


    const handleSearch = async (event) => {
        // await setLoader(true)
        // await setTimeout(() => {
        //     setLoader(false)
        // }, 2000);
        if (event.target.value === '') {
            setPage(2)
        }
        await setSearchValue(event.target.value)
        // console.log(event.target.value, "search");

    }

    const cancelbutton = (index) => {
        setmulticheck((prevData) => {
            return prevData.filter((id) => {
                return id !== multicheck[index]
            })
        })
        setmulticheckName((prevData) => {
            return prevData.filter((id) => {
                return id !== multicheckName[index]
            })
        })
    }
    function showLoader() {


    }

    // if (finalitem.length !== 0) {
    if (finalitem.length !== 0) {

        return (
            <>
                {
                    contextSetparam.childFilterShow ?
                        <>
                            <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
                                <Modal.Header >
                                    <h5 class="modal-title filter-modal-title"><i class="fa-solid fa-filter"></i> Filter By</h5>
                                    <button class="geex-btn geex-btn__customizer-close" onClick={handleClose}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                                fill="#ffffff" />
                                            <path
                                                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                                fill="#ffffff" fill-opacity="0.8" />
                                        </svg>
                                    </button>

                                </Modal.Header>

                                <Modal.Body className='modal-body' modal-dialog-scrollable style={{ padding: 0, paddingRight: 30, paddingLeft: 30 }}>

                                    {searchProcess === true ? <><InputGroup >
                                        <Form.Control
                                            placeholder='Search here...'
                                            style={{ border: '1px solid' }}
                                            aria-label="Search"
                                            name='Search'
                                            value={searchValue}
                                            aria-describedby="basic-addon1"
                                            onChange={handleSearch}
                                            id='searchbar'
                                        >
                                        </Form.Control>
                                        <InputGroup.Text id="basic-addon1">
                                            <i class="fa fa-spinner fa-spin" style={{ fontSize: 20, color: '#0d4876' }}></i>
                                        </InputGroup.Text>
                                    </InputGroup><br></br></> : <><InputGroup >
                                        <Form.Control
                                            placeholder='Search here...'
                                            style={{ border: '1px solid' }}
                                            value={searchValue}
                                            aria-label="Search"
                                            name='Search'
                                            aria-describedby="basic-addon1"
                                            onChange={handleSearch}
                                        />
                                        {/* {console.log('column', column)} */}
                                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                    </InputGroup><br></br></>}
                                    {/* <InputGroup >
                                                    <Form.Control
                                                        placeholder='Search here...'
                                                        style={{ border: '1px solid' }}
                                                        aria-label="Search"
                                                        name='Search'
                                                        aria-describedby="basic-addon1"
                                                        onChange={handleSearch}
                                                    />
                                                    <InputGroup.Text id="basic-addon1"><img height={20} src={search_icon} style={{cursor:'pointer'}} onClick={handleSearchClick}/></InputGroup.Text>
                                                </InputGroup><br></br> */}

                                    {multicheck.length !== 0 ?
                                        <div className='selected-item style-3'>
                                            {console.log(finalAllitem)}
                                            {multicheckName.map((item, index) => {



                                                return <span>
                                                    <label className='selected-label'>{item}<button onClick={() => cancelbutton(index)} className='cancel-button'>X</button></label>
                                                </span>



                                            })}
                                        </div> : null}


                                    <div id="scrollbar1" className='style-2
                                                ' onScroll={handleScroll}>
                                        {props.modelprops.labelname !== 'strSaleAging' && props.modelprops.labelname !== 'strCity' ?
                                            <div id='columnChooser'>
                                                <div>
                                                    {/* {
                                                                    column.map((ele) => {
                                                                        return <Form.Check
                                                                            inline
                                                                            value={ele}
                                                                            name={ele}
                                                                            label={ele}
                                                                            id='check-column'
                                                                            className='column'
                                                                            onChange={handleColumnChosser}
                                                                            checked={column.includes(ele)}
                                                                        />
                                                                    })
                                                                } */}
                                                    <Form.Check
                                                        inline
                                                        value={props.modelprops.id}
                                                        name={props.modelprops.id}
                                                        label={props.modelprops.id}
                                                        id='check-column'
                                                        className='column'
                                                        onChange={handleColumnChosser}
                                                        checked={column.includes(props.modelprops.id)}
                                                    />
                                                    {/* <input type='checkbox' value={props.modelprops.id}
                                                                    name={props.modelprops.id} onChange={handleColumnChosser}
                                                                    checked={column.includes(props.modelprops.id)} id='check-column' /><label for='check-column'>{props.modelprops.id}</label> */}
                                                    <Form.Check
                                                        value={props.modelprops.name}
                                                        name={props.modelprops.name}
                                                        label={props.modelprops.name}
                                                        className='column'
                                                        checked={true}
                                                    />
                                                </div>
                                                <button type='button' className='column-btn' onClick={hadnleOnGridSave}>Save</button>
                                            </div> : null}
                                        <div>
                                            {loader === true || loaderGrid === true ? <div class="spinner-grow text-primary" style={{ marginLeft: '45%' }} role="status">
                                                <span class="sr-only">Loading...</span>
                                            </div> :
                                                <Table striped bordered hover>

                                                    <thead className='table-header'
                                                    >
                                                        <tr>
                                                            <th id='columnth'
                                                            ><Form.Check
                                                                    type='checkbox'
                                                                    id='inputselectAll'
                                                                    onChange={handleSelectAll}
                                                                    ref={ref1}
                                                                /></th>
                                                            {/* {console.log("COLUMN VALUE", column)} */}
                                                            {column.map((ele) => {
                                                                return <th id='columnth'
                                                                    onClick={handleDoubleClick}>{ele}</th>
                                                            })}
                                                            {/* <th id='columnth' onClick={handleDoubleClick}>{props.modelprops.name}</th> */}
                                                        </tr>
                                                    </thead>

                                                    <tbody >{
                                                        finalitem.map((ele, i) =>
                                                        (
                                                            <tr >
                                                                <td>
                                                                    <Form.Check
                                                                        ref={(element) => { ref.current[i] = element }}
                                                                        type='checkbox'
                                                                        id={ele[props.modelprops.id]}
                                                                        value={ele[props.modelprops.id]}
                                                                        name={ele[props.modelprops.name] === null ? 'null' : ele[props.modelprops.name]}
                                                                        onChange={handleCheck}
                                                                        checked={multicheck.includes(ele[props.modelprops.id])}
                                                                    />
                                                                </td>
                                                                {column.map((ele1) => {

                                                                    return <td ><label className='Table-Label' for={ele[props.modelprops.id]}>{ele
                                                                    [ele1]}</label></td>
                                                                }
                                                                )}
                                                                {/* <td><label className='Table-Label' for={ele[props.modelprops.id]}>{ele[props.modelprops.name]}</label></td> */}
                                                            </tr>

                                                        )
                                                        )}
                                                    </tbody>
                                                </Table>}{loaderScroll === true ? <div class="spinner-grow text-primary" style={{ marginLeft: '45%' }} role="status">
                                                    <span class="sr-only">Loading...</span>
                                                </div> : null}
                                        </div>

                                    </div>

                                </Modal.Body>
                                <Modal.Footer>
                                    <div className='filter__btn'>
                                        <button class="btn-danger close-button geex-btn__customizer-close showpreview-button " onClick={() => handleResetfilter()}>Reset</button>
                                        <button class="showpreview-button" onClick={() => handlesavefilter()}>Save Filter</button>
                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </>
                        : null
                }
            </>
        )


    }
    else {
        return (
            <>
                {
                    contextSetparam.childFilterShow ?
                        <>
                            <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
                                <Modal.Header >
                                    <h5 class="modal-title filter-modal-title"><i class="fa-solid fa-filter"></i> Filter By</h5>
                                    <button class="geex-btn geex-btn__customizer-close" onClick={handleClose}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                                fill="#ffffff" />
                                            <path
                                                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                                fill="#ffffff" fill-opacity="0.8" />
                                        </svg>
                                    </button>

                                </Modal.Header>

                                <Modal.Body className='modal-body' modal-dialog-scrollable style={{ padding: 0, paddingRight: 30, paddingLeft: 30 }}>

                                    {searchProcess === true ? <><InputGroup >
                                        <Form.Control
                                            placeholder='Search here...'
                                            style={{ border: '1px solid' }}
                                            aria-label="Search"
                                            name='Search'
                                            value={searchValue}
                                            aria-describedby="basic-addon1"
                                            onChange={handleSearch}
                                            id='searchbar'
                                        >
                                        </Form.Control>
                                        <InputGroup.Text id="basic-addon1">
                                            <i class="fa fa-spinner fa-spin" style={{ fontSize: 20, color: '#0d4876' }}></i>
                                        </InputGroup.Text>
                                    </InputGroup><br></br></> : <><InputGroup >
                                        <Form.Control
                                            placeholder='Search here...'
                                            style={{ border: '1px solid' }}
                                            aria-label="Search"
                                            name='Search'
                                            value={searchValue}
                                            aria-describedby="basic-addon1"
                                            onChange={handleSearch}
                                        />
                                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                    </InputGroup><br></br></>}
                                    {/* <InputGroup >
                                                <Form.Control
                                                    placeholder='Search here...'
                                                    style={{ border: '1px solid' }}
                                                    aria-label="Search"
                                                    name='Search'
                                                    aria-describedby="basic-addon1"
                                                    onChange={handleSearch}
                                                />
                                                <InputGroup.Text id="basic-addon1"><img height={20} src={search_icon} style={{cursor:'pointer'}} onClick={handleSearchClick}/></InputGroup.Text>
                                            </InputGroup><br></br> */}

                                    {multicheck.length !== 0 ?
                                        <div className='selected-item style-3'>

                                            {finalitem.map((ele) => {
                                                if (multicheck.indexOf(ele[props.modelprops.id]) !== -1) {
                                                    return <span>
                                                        <label className='selected-label'>{ele[props.modelprops.name]}<button onClick={() => cancelbutton(ele[props.modelprops.id], ele[props.modelprops.name])} className='cancel-button'>X</button></label>
                                                    </span>
                                                }

                                            })}
                                        </div> : null}


                                    <div className="">
                                        {loader === true ? <div class="spinner-grow text-primary" style={{ marginLeft: '45%' }} role="status">
                                            <span class="sr-only">Loading...</span>
                                        </div> :
                                            <div className='selected-item'>
                                                No Data Found
                                            </div>}
                                    </div>

                                </Modal.Body>

                                <Modal.Footer>
                                    <div className='filter__btn'>
                                        <button class="btn-danger close-button geex-btn__customizer-close showpreview-button " onClick={() => handleResetfilter()}>Reset</button>
                                        <button class="showpreview-button" onClick={() => handlesavefilter()}>Save Filter</button>
                                    </div>
                                </Modal.Footer>
                            </Modal>
                        </>
                        : null
                }
            </>
        )
    }
}

export default Commonmodel
