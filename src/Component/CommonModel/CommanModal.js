import React, { useContext, useEffect, useState, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import contex from '../contex/Contex';
import Loader from '../Loader';


function Commonmodel(props) {
    const ref = useRef([]);
    const ref1 = useRef([]);
    const contextSetparam = useContext(contex)
    const[loader, setLoader] = useState(false);
    const [finalitem, setfinalitem] = useState([]);
    const [finalAllitem, setfinalAllitem] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const [multicheck, setmulticheck] = useState([])
    const [multicheckName, setmulticheckName] = useState([])
    const [page, setPage] = useState(2);
    const [search, setSearch] = useState(contextSetparam.tempstate)
    const inputForAlldata = {strBranch: "",
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
    strRegionID:'',
    FromDate: "",
    ToDate: "",
    strMetalType: "",
    strDayBook: "",
    PageNo: 0,
    PageSize: 9999,
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
    strRegionValue:''};
    const [searchValue, setSearchValue] = useState("")
    const totalcount = 9999

    let updatedList = [...props.prdemo];
    let updatelistName = [...props.prdemoName]
    useEffect(() => {
        console.log("hiiiiiii", updatedList);
        setPage(2)

        setmulticheck(updatedList)
        setmulticheckName(updatelistName);
        setSearch(contextSetparam.tempstate)
        fetchItemdata()
        fetchAllData()
        
    }, [props.modelprops])



    useEffect(() => {
        fetchItemdata()
    }, [search])

    useEffect(() => {
       
     
        setSearch({ ...search, ['Search']: searchValue })
    }, [searchValue])


    const fetchAllData = () => {
        if (totalcount !== 0) {
            if (props.modelprops.api !== undefined) {
                // console.log("search", input)
                axios.post(props.modelprops.api, inputForAlldata)
                    .then((response) => {
                        // console.log(response);
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
        } else{
            value = e.target.value
        }
        let name = e.target.name;
        console.log(value);
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
        console.log(stringConvert,stringNameConvert);
        // props.setvalues({ ...props.valuesform, [props.modelprops.labelname]: stringConvert })
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
        setmulticheck([])
        setmulticheckName([])
        contextSetparam.SettempState({ ...contextSetparam.tempstate, [props.modelprops['labelname']]: "",  [props.modelprops['LabelValue']]: ""})
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
                console.log(finalitem[i][props.modelprops.name]);
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
        if (scrollRatio === 1) {
            if (multicheck.length === finalAllitem.length) {
                ref1.current.checked =true
            } else {
                ref1.current.checked =false
            }
            var input = { ...search, ['PageNo']: page, ['PageSize']: 10 }
            console.log("scroll", input);
            delete input.undefined
            axios.post(props.modelprops.api,input)
                .then(response => {
                    setfinalitem([...finalitem, ...response.data.lstResult])
                    setPage(page + 1);
                })
                .catch(error => console.error(error))
        }
    }
    }


    const fetchItemdata = () => {
        console.log("api", props)
        console.log("hii");
        var input = { ...search, ['PageSize']: 10 }
        console.log("api", props.modelprops.api)
        delete input.undefined
        if (props.modelprops.api !== undefined) {
            // console.log("search", input)
            console.log("api", props)
            console.log(input, "input");
            console.log("hii");
            axios.post(props.modelprops.api, input)
                .then((response) => {
                    console.log(response.data.lstResult)
                    setfinalitem(response.data.lstResult)
                    // console.log(response);
                })
                .catch(error => console.error(error))
        }
    }


    const handleSearch =  async (event) => {
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

    const cancelbutton = (e, name) => {
        setmulticheck((prevData) => {
            return prevData.filter((id) => {
                return id !== e
            })
        })
        setmulticheckName((prevData) => {
            return prevData.filter((id) => {
                return id !== name
            })
        })
    }
    function showLoader() {
        
        
    }

    // if (finalitem.length !== 0) {
    return (
        <>
            {
                contextSetparam.childFilterShow ?
                    <>
                        <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
                            <Modal.Header closeButton>
                                <Modal.Title>Filter</Modal.Title>
                            </Modal.Header>

                            <Modal.Body className='modal-body' style={{ padding: 0, paddingRight: 30, paddingLeft: 30 }}>
                                <Form className='comman-modal-form'>
                                <label class="container1">
                                    <input ref={ref1} type="checkbox" id='inputselectAll' onChange={handleSelectAll}/>
                                    <div class="checkmark1"></div>
                                </label>
                                    <InputGroup >
                                        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
                                        <Form.Control
                                            placeholder='Search here...'
                                            style={{ border: '1px solid' }}
                                            aria-label="Search"
                                            name='Search'
                                            aria-describedby="basic-addon1"
                                            onChange={handleSearch}
                                        />
                                    </InputGroup><br></br>
                                    {multicheck.length !== 0 ?
                                            <div className='selected-item style-3'>

                                                {finalAllitem.map((ele) => {
                                                    if (multicheck.indexOf(ele[props.modelprops.id]) !== -1) {
                                                        return <span>
                                                            <label className='selected-label'>{ele[props.modelprops.name]}<button onClick={() => cancelbutton(ele[props.modelprops.id], ele[props.modelprops.name])} className='cancel-button'>X</button></label>
                                                        </span>
                                                    }

                                                })}
                                            </div> : null}
                                      
                                    {console.log(finalitem, "hii")}
                                    {loader === true && <Loader/>}
                                    {loader === false && finalitem.length !== 0?
                                    <div id="scrollbar" className='style-2' onScroll={handleScroll}>
                                
                                        {finalitem.map((ele, i) =>
                                        (

                                            <div className="mb-3" key={i}>
                                                <div className='inner-div-check'>
                                                 
                                                    <Form.Check
                                                        ref={(element) => { ref.current[i] = element }}
                                                        type='checkbox'
                                                        id={ele[props.modelprops.id]}
                                                        value={ele[props.modelprops.id]}
                                                        name={ele[props.modelprops.name]}
                                                        label={ele[props.modelprops.name]}
                                                        onChange={handleCheck}
                                                        checked={multicheck.includes(ele[props.modelprops.id])}
                                                    />
                                                </div>
                                            </div>
                                        )
                                        )
                                        }
                                    </div>:
                                    
                                  <div>{loader === true ?null:<Form className='comman-modal-form'>

                                                               <div className="mb-3">
                                                                   <div className='selected-item'>
                                                                           No Data Found
                                                                       </div>
                                                                     </div>
                                                                 </Form> }</div>}
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <button class="btn showpreview-button" onClick={() => handlesavefilter()}>save Filter</button>
                                <button class="btn close-button geex-btn__customizer-close" onClick={() => handleResetfilter()}>Reset</button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    : null
            }
        </>)
    // )} 
    // else {
    //     return (
    //         <>
    //             {
    //                 contextSetparam.childFilterShow ?
    //                     <>
    //                     {setTimeout(() => {
    //                         <Loader/>
    //                     }, 2000)}
    //                         <Modal show={contextSetparam.childFilterShow} onHide={handleClose} >
    //                             <Modal.Header closeButton>
    //                                 <Modal.Title>Filter</Modal.Title>
    //                             </Modal.Header>
    
    //                             <Modal.Body className='modal-body' style={{ padding: 0, paddingRight: 30, paddingLeft: 30 }}>
    //                             <Modal.Body className='modal-body' modal-dialog-scrollable style={{ padding: 0, paddingRight: 30, paddingLeft: 30, marginTop:20 }}>
    //                                 <Form className='comman-modal-form'>

    //                                     <div className="mb-3">
    //                                         <div className='selected-item'>
    //                                             No Data Found
    //                                         </div>
    //                                     </div>
    //                                 </Form>
    //                             </Modal.Body>
    //                             </Modal.Body>
    
    //                             <Modal.Footer>
    //                                 <button class="btn close-button geex-btn__customizer-close" onClick={() => handleClose()}>Close</button>
            
    //                             </Modal.Footer>
    //                         </Modal>
    //                     </>
    //                     : null
    //             }
    //         </>
    //     )
    // }
}

export default Commonmodel
