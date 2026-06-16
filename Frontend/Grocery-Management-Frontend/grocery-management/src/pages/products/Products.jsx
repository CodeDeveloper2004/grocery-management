import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([
  AllCommunityModule
]);
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useEffect, useState } from "react";
import InputField from "../../components/form/InputField";
import SearchableSelectField from "../../components/form/SearchableSelectField";
import {
  getProductStatuses,
  getUnitTypes,
  createProduct,
  updateProduct,
  getProducts
} from "../../services/productService";
import { toast } from "react-toastify";
import { MdClose, MdEdit } from "react-icons/md";

function Products() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [products, setProducts] = useState([]);

  const formik = useFormik({

    initialValues: {
      id: null,
      productName: "",
      sku: "",
      unitType: "",
      costPrice: "",
      sellingPrice: "",
      stockQuantity: "",
      minimumStockAlert: "",
      gstPercentage: "",
      status: "",
    },


    validationSchema: Yup.object({

      productName: Yup.string()
        .required("Product Name is required"),

      sku: Yup.string()
        .required("SKU is required"),

      unitType: Yup.string()
        .required("Unit Type is required"),

      costPrice: Yup.number()
        .required("Cost Price is required")
        .positive(),

      sellingPrice: Yup.number()
        .required("Selling Price is required")
        .positive(),

      stockQuantity: Yup.number()
        .required("Stock Quantity is required")
        .min(0),

      minimumStockAlert: Yup.number()
        .required("Minimum Stock Alert is required")
        .min(0),

      gstPercentage: Yup.number()
        .min(0)
        .max(100),

      status: Yup.string()
        .required("Status is required"),
    }),

    onSubmit: async (
      values,
      { resetForm }
    ) => {

      try {

        let response;
        if (edit) {
          response = await updateProduct(values);
        }
        else {
          response = await createProduct(values);
        }

        if (response.status) {

          toast.success(
            response.message
          );

          resetForm();
          setEdit(null);
          setIsOpen(false);

        }

      } catch (error) {

        toast.error(
          error?.response?.data?.message ||
          "Failed to create product"
        );

      }

    },

  });

  useEffect(() => {

    loadEnums();

  }, []);

  const handleEdit = (product) => {

    setEdit(product);

    formik.setValues({

      id: product.id,

      productName:
        product.productName,

      sku:
        product.sku,

      unitType:
        product.unitType,

      costPrice:
        product.costPrice,

      sellingPrice:
        product.sellingPrice,

      stockQuantity:
        product.stockQuantity,

      minimumStockAlert:
        product.minimumStockAlert,

      gstPercentage:
        product.gstPercentage,

      status:
        product.status

    });

    setIsOpen(true);

  };

  const columnDefs = [

    {
      headerName: "Product Name",
      field: "productName",
    },

    {
      headerName: "SKU",
      field: "sku"
    },

    {
      headerName: "Unit",
      field: "unitType"
    },

    {
      headerName: "Stock",
      field: "stockQuantity"
    },

    {
      headerName: "Status",
      field: "status"
    },

    {
      headerName: "GST (%)",
      field: "sellingPrice"
    },
    {
      headerName: "Selling Price",
      field: "gstPercentage"
    },
    {
      headerName: "Actions",

      sortable: false,

      filter: false,

      cellRenderer: (params) => (

        <div className="flex gap-3 h-full items-center">

          <button
            onClick={() =>
              handleEdit(params.data)
            }
          >
            <MdEdit
              className="
            text-blue-600
            text-xl
          "
            />
          </button>

        </div>

      )
    }

  ];

  const loadEnums = async () => {

    try {

      const statuses =
        await getProductStatuses();

      const unitTypes =
        await getUnitTypes();

      setStatusOptions(statuses);

      setUnitOptions(unitTypes);

    } catch (error) {

      console.error(error);

    }

  };


  const loadProducts = async () => {

    try {

      const products =
        await getProducts();

      setProducts(products);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    loadProducts();

  }, []);

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1
  };

  return (

    <div className="bg-gray-50">

      <Modal
        isOpen={isOpen}
        onRequestClose={() =>
          setIsOpen(false)
        }
        className="
    bg-white
    rounded-2xl
    p-6
    max-w-6xl
    mx-auto
    mt-2
  "
        overlayClassName="
    fixed inset-0
    bg-black/50
  "
      >
        <div className="max-w-7xl mx-auto">

          <div className="bg-white rounded-2xl">

            {/* Header */}

            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-col">

                <h1 className="text-2xl font-bold text-gray-800">
                  Create Product
                </h1>

                <p className="text-gray-500 mt-1">
                  Add a new product to inventory
                </p>

              </div>
              <hr />
              <div className="flex justify-end text-2xl">
                <button onClick={() => { setIsOpen(false) }}>
                  <MdClose />
                </button>
              </div>
            </div>

            {/* Form */}

            <form
              onSubmit={formik.handleSubmit}
              className="p-3"
            >

              {/* Product Information */}

              <div className="mb-2">

                <h2 className="text-lg font-semibold mb-4">
                  Product Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <InputField
                    label="Product Name"
                    name="productName"
                    required
                    formik={formik}
                  />

                  <InputField
                    label="SKU"
                    name="sku"
                    required
                    formik={formik}
                  />

                  <SearchableSelectField
                    label="Unit Type"
                    name="unitType"
                    options={unitOptions}
                    required
                    formik={formik}
                  />

                </div>

              </div>

              {/* Pricing */}

              <div className="mb-2">

                <h2 className="text-lg font-semibold mb-4">
                  Pricing
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <InputField
                    label="Cost Price"
                    name="costPrice"
                    type="number"
                    required
                    formik={formik}
                  />

                  <InputField
                    label="Selling Price"
                    name="sellingPrice"
                    type="number"
                    required
                    formik={formik}
                  />

                  <InputField
                    label="GST (%)"
                    name="gstPercentage"
                    type="number"
                    required
                    formik={formik}
                  />

                </div>

              </div>

              {/* Inventory */}

              <div className="mb-2">

                <h2 className="text-lg font-semibold mb-4">
                  Inventory
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  <InputField
                    label="Stock Quantity"
                    name="stockQuantity"
                    type="number"
                    required
                    formik={formik}
                  />

                  <InputField
                    label="Minimum Stock Alert"
                    name="minimumStockAlert"
                    type="number"
                    required
                    formik={formik}
                  />

                  <SearchableSelectField
                    label="Status"
                    name="status"
                    options={statusOptions}
                    required
                    formik={formik}
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="flex justify-end gap-4 pt-6 border-t">

                <button
                  type="button"
                  onClick={() => formik.resetForm()}
                  className="
                  px-6 py-3
                  rounded-xl
                  border
                  border-gray-300
                  hover:bg-gray-100
                "
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="
                  px-8 py-3
                  rounded-xl
                  bg-green-600
                  text-white
                  hover:bg-green-700
                  transition
                "
                >
                  Save Product
                </button>

              </div>

            </form>

          </div>

        </div>
      </Modal>
      <div className="p-3">
        <div className="flex justify-between items-center mb-4">

          <h1 className="text-2xl font-bold">
            Products
          </h1>

          <button
            onClick={() => setIsOpen(true)}
            className="
      bg-green-600
      text-white
      px-4 py-2
      rounded-lg
      hover:bg-green-700
    "
          >
            + Add Product
          </button>

        </div>

        <div
          className="bg-white rounded-2xl shadow-lg p-4 "
        >

          <div
            className="ag-theme-quartz"
            style={{
              height: 450,
              width: "100%"
            }}
          >

            <AgGridReact
              rowData={products}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={50}
              animateRows={true}
            />

          </div>

        </div>


      </div>

    </div>
  );
}

export default Products;