# alldata.json

## Add Column
#### _labelDrugstore_
From column: _farmacie / id_
<br/>Value: `Drugstore`

#### _labelTimeschedule_
From column: _farmacie / openings / date_
<br/>Value: `TimeSchedule`

#### _labelWebsite_
From column: _siti / acceptedPayment_
<br/>Value: `Website`

#### _labelReview_
From column: _siti / websiteReviews / aggregateReviews / reviews / uuidAggregation_
<br/>Value: `Review`

#### _labelAggregaterating_
From column: _siti / websiteReviews / website_
<br/>Value: `AggregateRating`

#### _labelDrugwithoutprescription_
From column: _siti / websiteSellingProducts / farmaco / administrationRoute_
<br/>Value: `DrugWithoutPrescription`

#### _labelMedicalsignorSymptom_
From column: _siti / websiteSellingProducts / farmaco / principi_attivi / cura_sintomi / cured_by_
<br/>Value: `MedicalSignOrSymptom`

#### _labelCost_
From column: _siti / websiteSellingProducts / price / currency_
<br/>Value: `Cost`

#### _labelActiveIngredient_
From column: _siti / websiteSellingProducts / farmaco / principi_attivi / id_
<br/>Value: `ActiveIngredient`

#### _labelReview2_
From column: _siti / websiteSellingProducts / reviewsProduct / aggregateReviews / reviews / uuidAggregation_
<br/>Value: `Review`

#### _labelAggregaterating2_
From column: _siti / websiteSellingProducts / reviewsProduct / website_
<br/>Value: `AggregateRating`

#### _labelDrug_
From column: _medicine / uuid_
<br/>Value: `Drug`

#### _labelActiveIngredient4_
From column: _medicine / principi_attivi / id_
<br/>Value: `ActiveIngredient`

#### _labelMedicalsignorSymptom2_
From column: _medicine / principi_attivi / cura_sintomi / id_
<br/>Value: `MedicalSignOrSymptom`

#### _labelAggregaterating3_
From column: _medicine / reviewsProduct / aggregateReviews / reviews / uuidAggregation_
<br/>Value: `AggregateRating`

#### _labelReview4_
From column: _medicine / reviewsProduct / aggregateReviews / reviews / uuidAggregation_
<br/>Value: `Review`

#### _labelAggregaterating4_
From column: _medicine / reviewsProduct / website_
<br/>Value: `AggregateRating`

#### _labelActiveIngredientincompatiblewith_
From column: _siti / websiteSellingProducts / farmaco / principi_attivi / interactions / description_
<br/>Value: `ActiveIngredient`

#### _labelActiveIngredientincompatiblewith2_
From column: _medicine / principi_attivi / interactions / id_
<br/>Value: `ActiveIngredient`

#### _MaximumDoseScheduleLabel_
From column: _siti / websiteSellingProducts / farmaco / maximumDoseSchedule_
<br/>Value: `MaximumDoseSchedule`

#### _MaximumDoseScheduleLabel2_
From column: _medicine / maximumDoseSchedule_
<br/>Value: `MaximumDoseSchedule`


## Add Node/Literal

## PyTransforms
#### _id_drugstore_
From column: _farmacie / id_
``` python
return "drugstore/"+getValue("id")
```

#### _id_drugstore2_
From column: _farmacieselling / id_
``` python
return "drugstore/"+getValue("id")
```

#### _uuid_timeschedule_
From column: _farmacie / openings / uuid_
``` python
return "timeschedule/"+getValue("uuid")
```

#### _uuid_website_
From column: _siti / uuid_
``` python
return "website/"+getValue("uuid")
```

#### _uuid_reviewimproved_
From column: _siti / websiteReviews / aggregateReviews / reviews / uuid_
``` python
if (getValue("uuid") != ""):
    return "review/"+getValue("uuid")
```

#### _uuid_aggregateratingimproved_
From column: _siti / websiteReviews / uuid_
``` python
if (getValue("uuid") != ""):
    return "aggregaterating/"+getValue("uuid")
```

#### _uuid_reviewimproved2_
From column: _siti / websiteSellingProducts / reviewsProduct / aggregateReviews / reviews / uuid_
``` python
if (getValue("uuid") != ""):
    return "review/"+getValue("uuid")
```

#### _uuid_reviewimproved4_
From column: _medicine / reviewsProduct / aggregateReviews / reviews / uuid_
``` python
if (getValue("uuid") != ""):
    return "review/"+getValue("uuid")
```

#### _uuid_aggregateratingimproved2_
From column: _siti / websiteSellingProducts / reviewsProduct / aggregateReviews / id_
``` python
if (getValue("uuid") != ""):
    return "aggregaterating/"+getValue("uuid")
```

#### _id_aggregartingtest2_
From column: _siti / websiteSellingProducts / reviewsProduct / aggregateReviews / id_
``` python
if (getValue("id") != ""):
    return "aggregaterating/"+getValue("id")
```

#### _uuid_aggregateratingimproved4_
From column: _medicine / reviewsProduct / aggregateReviews / id_
``` python
if (getValue("id") != ""):
    return "aggregaterating/"+getValue("id")
```

#### _cured_by_improved_
From column: _siti / websiteSellingProducts / farmaco / principi_attivi / cura_sintomi / cured_by_
``` python
if (str(getValue("cured_by"))!=""):
    return "medicalsignorsymptom/"+getValue("cured_by")
```

#### _cured_by_improved2_
From column: _medicine / principi_attivi / cura_sintomi / cured_by_
``` python
if (str(getValue("cured_by"))!=""):
    return "medicalsignorsymptom/"+getValue("cured_by")
```

#### _activeingredientID_
From column: _siti / websiteSellingProducts / farmaco / principi_attivi / id_
``` python
if (str(getValue("id"))!=""):
    return "activeingredient/"+getValue("id")
```

#### _activeingredientimprovedid_
From column: _siti / websiteSellingProducts / farmaco / principi_attivi / interactions / id_
``` python
if (str(getValue("id"))!=""):
    return "activeingredient/"+getValue("id")
```

#### _activeingredientimprovedforthis_
From column: _medicine / principi_attivi / id_
``` python
if (str(getValue("id"))!=""):
    return "activeingredient/"+getValue("id")
```

#### _activeingredientfinale1_
From column: _medicine / principi_attivi / interactions / id_
``` python
if (str(getValue("id"))!=""):
    return "activeingredient/"+getValue("id")
```

#### _drugwithoutprescriptionid_
From column: _siti / websiteSellingProducts / id_
``` python
if (getValue("id")!=""):
    return "drugwithoutprescription/"+getValue("id")
```

#### _drugwithoutprescriptionidimproved_
From column: _medicine / uuidDrug_
``` python
if (getValue("uuidDrug")!=""):
    return "drugwithoutprescription/"+getValue("uuidDrug")
```

#### _costid_
From column: _siti / websiteSellingProducts / price / uuid_
``` python
if (getValue("uuid")!=""):
    return "cost/"+getValue("uuid")
```


## Selections

## Semantic Types
| Column | Property | Class |
|  ----- | -------- | ----- |
| _MaximumDoseScheduleLabel_ | `rdfs:label` | `MaximumDoseSchedule1`|
| _MaximumDoseScheduleLabel2_ | `rdfs:label` | `MaximumDoseSchedule2`|
| _activeingredientID_ | `uri` | `ActiveIngredient1`|
| _activeingredientfinale1_ | `uri` | `ActiveIngredient4`|
| _activeingredientimprovedforthis_ | `uri` | `ActiveIngredient3`|
| _activeingredientimprovedid_ | `uri` | `ActiveIngredient2`|
| _address_ | `http://www.semanticweb.org/kdi#address` | `Drugstore1`|
| _administrationRoute_ | `http://www.semanticweb.org/kdi#administrationRoute` | `DrugWithoutPrescription1`|
| _administrationRoute_ | `http://www.semanticweb.org/kdi#administrationRoute` | `Drug1`|
| _adverseReaction_ | `http://www.semanticweb.org/kdi#adverseReaction` | `DrugWithoutPrescription1`|
| _adverseReaction_ | `http://www.semanticweb.org/kdi#adverseReaction` | `Drug1`|
| _author_ | `http://www.semanticweb.org/kdi#reviewAuthor` | `Review1`|
| _author_ | `http://www.semanticweb.org/kdi#reviewAuthor` | `Review2`|
| _author_ | `http://www.semanticweb.org/kdi#reviewAuthor` | `Review3`|
| _averageRating_ | `http://www.semanticweb.org/kdi#averageRating` | `AggregateRating1`|
| _averageRating_ | `http://www.semanticweb.org/kdi#averageRating` | `AggregateRating2`|
| _averageRating_ | `http://www.semanticweb.org/kdi#averageRating` | `AggregateRating3`|
| _city_ | `http://www.semanticweb.org/kdi#city` | `Drugstore1`|
| _comment_ | `http://www.semanticweb.org/kdi#reviewBody` | `Review1`|
| _comment_ | `http://www.semanticweb.org/kdi#reviewBody` | `Review2`|
| _comment_ | `http://www.semanticweb.org/kdi#reviewBody` | `Review3`|
| _contraindication_ | `http://www.semanticweb.org/kdi#contraindication` | `DrugWithoutPrescription1`|
| _contraindication_ | `http://www.semanticweb.org/kdi#contraindication` | `Drug1`|
| _costid_ | `uri` | `Cost1`|
| _country_ | `http://www.semanticweb.org/kdi#country` | `Drugstore1`|
| _cured_by_improved_ | `uri` | `MedicalSignOrSymptom1`|
| _cured_by_improved2_ | `uri` | `MedicalSignOrSymptom2`|
| _currency_ | `http://www.semanticweb.org/kdi#currency` | `Cost1`|
| _date_ | `http://www.semanticweb.org/kdi#date` | `TimeSchedule1`|
| _descriptionDrug_ | `http://www.semanticweb.org/kdi#descriptionDrug` | `DrugWithoutPrescription1`|
| _descriptionDrug_ | `http://www.semanticweb.org/kdi#descriptionDrug` | `Drug1`|
| _descriptionDrugstore_ | `http://www.semanticweb.org/kdi#descriptionDrugstore` | `Drugstore1`|
| _dosageForm_ | `http://www.semanticweb.org/kdi#dosageForm` | `DrugWithoutPrescription1`|
| _dosageForm_ | `http://www.semanticweb.org/kdi#dosageForm` | `Drug1`|
| _drugClass_ | `http://www.semanticweb.org/kdi#drugClass` | `DrugWithoutPrescription1`|
| _drugClass_ | `http://www.semanticweb.org/kdi#drugClass` | `Drug1`|
| _drugwithoutprescriptionid_ | `uri` | `DrugWithoutPrescription1`|
| _drugwithoutprescriptionidimproved_ | `uri` | `DrugWithoutPrescription2`|
| _email_ | `http://www.semanticweb.org/kdi#email` | `Drugstore1`|
| _faxNumber_ | `http://www.semanticweb.org/kdi#faxNumber` | `Drugstore1`|
| _found_name_ | `http://www.semanticweb.org/kdi#nameDrug` | `DrugWithoutPrescription1`|
| _hasPrescription_ | `http://www.semanticweb.org/kdi#hasPrescription` | `DrugWithoutPrescription1`|
| _hasPrescription_ | `http://www.semanticweb.org/kdi#hasPrescription` | `Drug1`|
| _headline_ | `http://www.semanticweb.org/kdi#reviewTitle` | `Review1`|
| _headline_ | `http://www.semanticweb.org/kdi#reviewTitle` | `Review2`|
| _headline_ | `http://www.semanticweb.org/kdi#reviewTitle` | `Review3`|
| _howSupplied_ | `http://www.semanticweb.org/kdi#howSupplied` | `DrugWithoutPrescription1`|
| _howSupplied_ | `http://www.semanticweb.org/kdi#howSupplied` | `Drug1`|
| _id_aggregartingtest2_ | `uri` | `AggregateRating2`|
| _id_drugstore_ | `uri` | `Drugstore1`|
| _id_drugstore2_ | `uri` | `Drugstore2`|
| _image_link_ | `http://www.semanticweb.org/kdi#photo` | `Drugstore1`|
| _isAvailableGenerally_ | `http://www.semanticweb.org/kdi#isAvailableGenerically` | `DrugWithoutPrescription1`|
| _isAvailableGenerally_ | `http://www.semanticweb.org/kdi#isAvailableGenerically` | `Drug1`|
| _labelActiveIngredient_ | `rdfs:label` | `ActiveIngredient1`|
| _labelActiveIngredient4_ | `rdfs:label` | `ActiveIngredient3`|
| _labelActiveIngredientincompatiblewith_ | `rdfs:label` | `ActiveIngredient2`|
| _labelActiveIngredientincompatiblewith2_ | `rdfs:label` | `ActiveIngredient4`|
| _labelAggregaterating_ | `rdfs:label` | `AggregateRating1`|
| _labelAggregaterating2_ | `rdfs:label` | `AggregateRating2`|
| _labelAggregaterating4_ | `rdfs:label` | `AggregateRating3`|
| _labelCost_ | `rdfs:label` | `Cost1`|
| _labelDrug_ | `rdfs:label` | `Drug1`|
| _labelDrugstore_ | `rdfs:label` | `Drugstore1`|
| _labelDrugwithoutprescription_ | `rdfs:label` | `DrugWithoutPrescription1`|
| _labelMedicalsignorSymptom_ | `rdfs:label` | `MedicalSignOrSymptom1`|
| _labelMedicalsignorSymptom2_ | `rdfs:label` | `MedicalSignOrSymptom2`|
| _labelReview_ | `rdfs:label` | `Review1`|
| _labelReview2_ | `rdfs:label` | `Review2`|
| _labelReview4_ | `rdfs:label` | `Review3`|
| _labelTimeschedule_ | `rdfs:label` | `TimeSchedule1`|
| _labelWebsite_ | `rdfs:label` | `Website1`|
| _latitude_ | `http://www.semanticweb.org/kdi#latitude` | `Drugstore1`|
| _link_ | `http://www.semanticweb.org/kdi#costSource` | `Cost1`|
| _longitude_ | `http://www.semanticweb.org/kdi#longitude` | `Drugstore1`|
| _lowestRatingValue_ | `http://www.semanticweb.org/kdi#worstRating` | `AggregateRating1`|
| _lowestRatingValue_ | `http://www.semanticweb.org/kdi#worstRating` | `AggregateRating2`|
| _lowestRatingValue_ | `http://www.semanticweb.org/kdi#worstRating` | `AggregateRating3`|
| _maxRating_ | `http://www.semanticweb.org/kdi#maxRating` | `Review1`|
| _maxRating_ | `http://www.semanticweb.org/kdi#maxRating` | `Review2`|
| _maxRating_ | `http://www.semanticweb.org/kdi#maxRating` | `Review3`|
| _maximumDoseSchedule_ | `http://www.semanticweb.org/kdi#packageLeaflete` | `MaximumDoseSchedule1`|
| _maximumDoseSchedule_ | `http://www.semanticweb.org/kdi#packageLeaflete` | `MaximumDoseSchedule2`|
| _maximumDoseScheduleID_ | `uri` | `MaximumDoseSchedule1`|
| _maximumDoseScheduleID_ | `uri` | `MaximumDoseSchedule2`|
| _maximumRatingValue_ | `http://www.semanticweb.org/kdi#bestRating` | `AggregateRating1`|
| _maximumRatingValue_ | `http://www.semanticweb.org/kdi#bestRating` | `AggregateRating2`|
| _maximumRatingValue_ | `http://www.semanticweb.org/kdi#bestRating` | `AggregateRating3`|
| _minRating_ | `http://www.semanticweb.org/kdi#minRating` | `Review1`|
| _minRating_ | `http://www.semanticweb.org/kdi#minRating` | `Review2`|
| _minRating_ | `http://www.semanticweb.org/kdi#minRating` | `Review3`|
| _name_ | `http://www.semanticweb.org/kdi#nameDrugstore` | `Drugstore1`|
| _name_ | `http://www.semanticweb.org/kdi#itemReviewed` | `AggregateRating1`|
| _name_ | `http://www.semanticweb.org/kdi#signOrSymptom` | `MedicalSignOrSymptom1`|
| _name_ | `http://www.semanticweb.org/kdi#nameAI` | `ActiveIngredient1`|
| _name_ | `http://www.semanticweb.org/kdi#itemReviewed` | `AggregateRating2`|
| _name_ | `http://www.semanticweb.org/kdi#nameAI` | `ActiveIngredient3`|
| _name_ | `http://www.semanticweb.org/kdi#signOrSymptom` | `MedicalSignOrSymptom2`|
| _name_ | `http://www.semanticweb.org/kdi#itemReviewed` | `AggregateRating3`|
| _nameDrug_ | `http://www.semanticweb.org/kdi#nameDrug` | `Drug1`|
| _proprietaryName_ | `http://www.semanticweb.org/kdi#proprietaryName` | `DrugWithoutPrescription1`|
| _proprietaryName_ | `http://www.semanticweb.org/kdi#proprietaryName` | `Drug1`|
| _quantity_ | `http://www.semanticweb.org/kdi#quantity` | `ActiveIngredient1`|
| _quantity_ | `http://www.semanticweb.org/kdi#quantity` | `ActiveIngredient3`|
| _rating_ | `http://www.semanticweb.org/kdi#reviewRating` | `Review1`|
| _rating_ | `http://www.semanticweb.org/kdi#reviewRating` | `Review2`|
| _rating_ | `http://www.semanticweb.org/kdi#reviewRating` | `Review3`|
| _ratingCount_ | `http://www.semanticweb.org/kdi#ratingCount` | `AggregateRating1`|
| _ratingCount_ | `http://www.semanticweb.org/kdi#ratingCount` | `AggregateRating2`|
| _ratingCount_ | `http://www.semanticweb.org/kdi#ratingCount` | `AggregateRating3`|
| _reviewCount_ | `http://www.semanticweb.org/kdi#reviewCount` | `AggregateRating1`|
| _reviewCount_ | `http://www.semanticweb.org/kdi#reviewCount` | `AggregateRating2`|
| _reviewCount_ | `http://www.semanticweb.org/kdi#reviewCount` | `AggregateRating3`|
| _systemRating_ | `http://www.semanticweb.org/kdi#ratingSystem` | `Review1`|
| _systemRating_ | `http://www.semanticweb.org/kdi#ratingSystem` | `Review2`|
| _systemRating_ | `http://www.semanticweb.org/kdi#ratingSystem` | `Review3`|
| _telephoneNumber_ | `http://www.semanticweb.org/kdi#telephoneNumber` | `Drugstore1`|
| _unit_ | `http://www.semanticweb.org/kdi#unit` | `ActiveIngredient1`|
| _unit_ | `http://www.semanticweb.org/kdi#unit` | `ActiveIngredient3`|
| _uuid_ | `uri` | `Drug1`|
| _uuid_aggregateratingimproved_ | `uri` | `AggregateRating1`|
| _uuid_aggregateratingimproved4_ | `uri` | `AggregateRating3`|
| _uuid_reviewimproved_ | `uri` | `Review1`|
| _uuid_reviewimproved2_ | `uri` | `Review2`|
| _uuid_reviewimproved4_ | `uri` | `Review3`|
| _uuid_timeschedule_ | `uri` | `TimeSchedule1`|
| _uuid_website_ | `uri` | `Website1`|
| _value_ | `http://www.semanticweb.org/kdi#value` | `Cost1`|
| _values_ | `http://www.semanticweb.org/kdi#openingHours` | `TimeSchedule1`|
| _values_ | `http://www.semanticweb.org/kdi#currenciesAccepted` | `Drugstore1`|
| _values_ | `http://www.semanticweb.org/kdi#paymentAccepted` | `Drugstore1`|
| _values_ | `http://www.semanticweb.org/kdi#paymentAccepted` | `Website1`|
| _values_ | `http://www.semanticweb.org/kdi#currenciesAccepted` | `Website1`|
| _values_ | `uri` | `Drug2`|
| _warning_ | `http://www.semanticweb.org/kdi#warning` | `DrugWithoutPrescription1`|
| _warning_ | `http://www.semanticweb.org/kdi#warning` | `Drug1`|
| _website_ | `http://www.semanticweb.org/kdi#source` | `AggregateRating1`|
| _website_ | `http://www.semanticweb.org/kdi#source` | `AggregateRating2`|
| _website_ | `http://www.semanticweb.org/kdi#source` | `AggregateRating3`|
| _websiteName_ | `http://www.semanticweb.org/kdi#nameWebsite` | `Website1`|
| _websiteURL_ | `http://www.semanticweb.org/kdi#websiteURL` | `Drugstore1`|


## Links
| From | Property | To |
|  --- | -------- | ---|
| `ActiveIngredient1` | `http://www.semanticweb.org/kdi#isIncompatibleWith` | `ActiveIngredient2`|
| `ActiveIngredient1` | `http://www.semanticweb.org/kdi#cures` | `MedicalSignOrSymptom1`|
| `ActiveIngredient1` | `http://www.semanticweb.org/kdi#isContained` | `DrugWithoutPrescription1`|
| `ActiveIngredient3` | `http://www.semanticweb.org/kdi#isIncompatibleWith` | `ActiveIngredient4`|
| `ActiveIngredient3` | `http://www.semanticweb.org/kdi#isContained` | `Drug1`|
| `ActiveIngredient3` | `http://www.semanticweb.org/kdi#cures` | `MedicalSignOrSymptom2`|
| `AggregateRating1` | `http://www.semanticweb.org/kdi#aggregationOf` | `Review1`|
| `AggregateRating2` | `http://www.semanticweb.org/kdi#aggregationOf` | `Review2`|
| `AggregateRating3` | `http://www.semanticweb.org/kdi#aggregationOf` | `Review3`|
| `Drug1` | `http://www.semanticweb.org/kdi#hasPrescriptionValue` | `DrugWithoutPrescription2`|
| `Drug1` | `http://www.semanticweb.org/kdi#hasRating` | `AggregateRating3`|
| `Drug1` | `http://www.semanticweb.org/kdi#contains` | `ActiveIngredient3`|
| `Drug1` | `http://www.semanticweb.org/kdi#hasDose` | `MaximumDoseSchedule2`|
| `Drug2` | `http://www.semanticweb.org/kdi#isSoldBy` | `Drugstore2`|
| `DrugWithoutPrescription1` | `http://www.semanticweb.org/kdi#hasCost` | `Cost1`|
| `DrugWithoutPrescription1` | `http://www.semanticweb.org/kdi#hasRating` | `AggregateRating2`|
| `DrugWithoutPrescription1` | `http://www.semanticweb.org/kdi#contains` | `ActiveIngredient1`|
| `DrugWithoutPrescription1` | `http://www.semanticweb.org/kdi#isSoldBy` | `Website1`|
| `DrugWithoutPrescription1` | `http://www.semanticweb.org/kdi#hasDose` | `MaximumDoseSchedule1`|
| `Drugstore1` | `http://www.semanticweb.org/kdi#hasSchedule` | `TimeSchedule1`|
| `Drugstore2` | `http://www.semanticweb.org/kdi#sells` | `Drug2`|
| `MedicalSignOrSymptom1` | `http://www.semanticweb.org/kdi#isCuredBy` | `ActiveIngredient1`|
| `MedicalSignOrSymptom2` | `http://www.semanticweb.org/kdi#isCuredBy` | `ActiveIngredient3`|
| `Website1` | `http://www.semanticweb.org/kdi#hasRating` | `AggregateRating1`|
| `Website1` | `http://www.semanticweb.org/kdi#sells` | `DrugWithoutPrescription1`|
